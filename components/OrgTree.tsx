'use client';

import React, { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { TreeNode, ROLE_STYLES } from '@/types';
import { NodeCard } from './NodeCard';
import { useOrg } from '@/context/OrgContext';

const NODE_W = 220;
const NODE_H = 100;
const H_GAP = 40;
const V_GAP = 80;

interface LayoutNode {
  node: TreeNode;
  x: number;
  y: number;
  children: LayoutNode[];
}

function computeSubtreeWidth(node: TreeNode): number {
  if (node.children.length === 0) return NODE_W;
  const childrenWidth = node.children.reduce(
    (sum, child) => sum + computeSubtreeWidth(child) + H_GAP,
    -H_GAP
  );
  return Math.max(NODE_W, childrenWidth);
}

function layoutTree(node: TreeNode, x: number, y: number): LayoutNode {
  const layoutNode: LayoutNode = { node, x, y, children: [] };

  if (node.children.length === 0) return layoutNode;

  const totalChildWidth = node.children.reduce(
    (sum, child) => sum + computeSubtreeWidth(child) + H_GAP,
    -H_GAP
  );
  let childX = x - totalChildWidth / 2;
  const childY = y + NODE_H + V_GAP;

  for (const child of node.children) {
    const subtreeWidth = computeSubtreeWidth(child);
    const centerX = childX + subtreeWidth / 2;
    layoutNode.children.push(layoutTree(child, centerX, childY));
    childX += subtreeWidth + H_GAP;
  }

  return layoutNode;
}

function flattenLayout(layout: LayoutNode): LayoutNode[] {
  const result: LayoutNode[] = [layout];
  for (const child of layout.children) {
    result.push(...flattenLayout(child));
  }
  return result;
}

function collectEdges(
  layout: LayoutNode
): Array<{ x1: number; y1: number; x2: number; y2: number; color: string }> {
  const edges: Array<{ x1: number; y1: number; x2: number; y2: number; color: string }> = [];
  const parentColor = ROLE_STYLES[layout.node.role].color;
  for (const child of layout.children) {
    edges.push({
      x1: layout.x,
      y1: layout.y + NODE_H,
      x2: child.x,
      y2: child.y,
      color: parentColor,
    });
    edges.push(...collectEdges(child));
  }
  return edges;
}

function getBounds(flatNodes: LayoutNode[]) {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (const { x, y } of flatNodes) {
    minX = Math.min(minX, x - NODE_W / 2);
    maxX = Math.max(maxX, x + NODE_W / 2);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y + NODE_H);
  }
  return { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY };
}

export interface OrgTreeHandle {
  centerView: () => void;
}

interface OrgTreeProps {
  onAddClick: () => void;
}

export const OrgTree = forwardRef<OrgTreeHandle, OrgTreeProps>(function OrgTree(
  { onAddClick },
  ref
) {
  const { buildTree, selectedNodeId, setSelectedNodeId, getChildren } = useOrg();

  const canvasRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const isPanning = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  const roots = buildTree();
  const allLayouts: LayoutNode[] = [];
  const rootLayouts: LayoutNode[] = [];

  let rootOffset = 0;
  for (const root of roots) {
    const w = computeSubtreeWidth(root);
    const layout = layoutTree(root, rootOffset + w / 2, 0);
    rootLayouts.push(layout);
    allLayouts.push(...flattenLayout(layout));
    rootOffset += w + H_GAP * 2;
  }

  const bounds = allLayouts.length > 0 ? getBounds(allLayouts) : null;

  const centerView = useCallback(() => {
    if (!bounds || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = (rect.width * 0.85) / bounds.w;
    const scaleY = (rect.height * 0.85) / bounds.h;
    const scale = Math.min(Math.max(Math.min(scaleX, scaleY), 0.3), 1.2);
    const x = rect.width / 2 - (bounds.minX + bounds.w / 2) * scale;
    const y = rect.height / 2 - (bounds.minY + bounds.h / 2) * scale + 20;
    setTransform({ x, y, scale });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds?.minX, bounds?.minY, bounds?.w, bounds?.h]);

  useImperativeHandle(ref, () => ({ centerView }), [centerView]);

  useEffect(() => {
    centerView();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    setTransform((prev) => {
      const newScale = Math.min(Math.max(prev.scale * factor, 0.2), 2.5);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return prev;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const wx = (mx - prev.x) / prev.scale;
      const wy = (my - prev.y) / prev.scale;
      return {
        scale: newScale,
        x: mx - wx * newScale,
        y: my - wy * newScale,
      };
    });
  }, []);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-node]')) return;
    isPanning.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    lastMouse.current = { x: e.clientX, y: e.clientY };
    setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };

  const stopPan = () => {
    isPanning.current = false;
  };

  const allEdges = rootLayouts.flatMap(collectEdges);

  return (
    <div
      ref={canvasRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopPan}
      onMouseLeave={stopPan}
    >
      <div
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
      >
        {/* SVG connector lines */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }}
          width="1"
          height="1"
        >
          <defs>
            {Object.entries(ROLE_STYLES).map(([role, s]) => (
              <filter key={role} id={`glow-${role.replace(/\//g, '-').replace(/\s/g, '-')}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>
          {allEdges.map((edge, i) => {
            const mx = edge.x1;
            const my = (edge.y1 + edge.y2) / 2;
            const d = `M ${edge.x1} ${edge.y1} C ${mx} ${my}, ${edge.x2} ${my}, ${edge.x2} ${edge.y2}`;
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={edge.color}
                strokeOpacity={0.25}
                strokeWidth={1.5}
              />
            );
          })}
        </svg>

        {/* Node cards */}
        {allLayouts.map(({ node, x, y }) => {
          const directReports = getChildren(node.id).length;
          return (
            <div
              key={node.id}
              data-node="true"
              style={{
                position: 'absolute',
                left: x - NODE_W / 2,
                top: y,
                width: NODE_W,
              }}
            >
              <NodeCard
                node={node}
                isSelected={selectedNodeId === node.id}
                onClick={() => setSelectedNodeId(node.id === selectedNodeId ? null : node.id)}
                directReportsCount={directReports}
              />
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {allLayouts.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <p className="text-white/30 text-sm">No team members yet.</p>
          <button
            onClick={onAddClick}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm transition-colors"
          >
            Add first person
          </button>
        </div>
      )}
    </div>
  );
});
