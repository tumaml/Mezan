'use client';

import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { TreeNode, ROLE_STYLES } from '@/types';
import { NodeCard } from './NodeCard';
import { useOrg } from '@/context/OrgContext';

const NODE_W = 260;
const NODE_H = 72;
const H_GAP = 48;
const V_GAP = 88;

interface LayoutNode {
  node: TreeNode;
  x: number;
  y: number;
  children: LayoutNode[];
}

function subtreeWidth(node: TreeNode): number {
  if (node.children.length === 0) return NODE_W;
  const childrenTotalW = node.children.reduce(
    (sum, c) => sum + subtreeWidth(c) + H_GAP,
    -H_GAP
  );
  return Math.max(NODE_W, childrenTotalW);
}

function layoutTree(node: TreeNode, x: number, y: number): LayoutNode {
  const ln: LayoutNode = { node, x, y, children: [] };
  if (node.children.length === 0) return ln;

  const total = node.children.reduce((s, c) => s + subtreeWidth(c) + H_GAP, -H_GAP);
  let cx = x - total / 2;
  const cy = y + NODE_H + V_GAP;

  for (const child of node.children) {
    const cw = subtreeWidth(child);
    ln.children.push(layoutTree(child, cx + cw / 2, cy));
    cx += cw + H_GAP;
  }
  return ln;
}

function flatten(ln: LayoutNode): LayoutNode[] {
  return [ln, ...ln.children.flatMap(flatten)];
}

interface Edge {
  x1: number; y1: number;
  x2: number; y2: number;
  color: string;
}

function collectEdges(ln: LayoutNode): Edge[] {
  const edges: Edge[] = [];
  const pc = ROLE_STYLES[ln.node.role].color;
  for (const child of ln.children) {
    edges.push({ x1: ln.x, y1: ln.y + NODE_H, x2: child.x, y2: child.y, color: pc });
    edges.push(...collectEdges(child));
  }
  return edges;
}

function bounds(nodes: LayoutNode[]) {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (const { x, y } of nodes) {
    x0 = Math.min(x0, x - NODE_W / 2);
    x1 = Math.max(x1, x + NODE_W / 2);
    y0 = Math.min(y0, y);
    y1 = Math.max(y1, y + NODE_H);
  }
  return { x0, x1, y0, y1, w: x1 - x0, h: y1 - y0 };
}

export interface OrgTreeHandle {
  centerView: () => void;
}

export const OrgTree = forwardRef<OrgTreeHandle, { onAddClick: () => void }>(
  function OrgTree({ onAddClick }, ref) {
    const { buildTree, selectedNodeId, setSelectedNodeId, getChildren } = useOrg();

    const wrapRef = useRef<HTMLDivElement>(null);
    const transform = useRef({ x: 0, y: 0, scale: 1 });
    const innerRef = useRef<HTMLDivElement>(null);
    const isPanning = useRef(false);
    const lastMouse = useRef({ x: 0, y: 0 });

    const applyTransform = useCallback(() => {
      if (!innerRef.current) return;
      const { x, y, scale } = transform.current;
      innerRef.current.style.transform = `translate(${x}px,${y}px) scale(${scale})`;
    }, []);

    const roots = buildTree();
    const rootLayouts: LayoutNode[] = [];
    let rx = 0;
    for (const root of roots) {
      const w = subtreeWidth(root);
      rootLayouts.push(layoutTree(root, rx + w / 2, 0));
      rx += w + H_GAP * 2;
    }
    const allNodes = rootLayouts.flatMap(flatten);
    const allEdges = rootLayouts.flatMap(collectEdges);
    const b = allNodes.length > 0 ? bounds(allNodes) : null;

    const centerView = useCallback(() => {
      if (!b || !wrapRef.current) return;
      const rect = wrapRef.current.getBoundingClientRect();
      const sx = (rect.width * 0.88) / b.w;
      const sy = (rect.height * 0.88) / b.h;
      const scale = Math.min(Math.max(Math.min(sx, sy), 0.25), 1.1);
      transform.current = {
        scale,
        x: rect.width / 2 - (b.x0 + b.w / 2) * scale,
        y: Math.max(40, rect.height / 2 - (b.y0 + b.h / 2) * scale),
      };
      applyTransform();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [b?.x0, b?.y0, b?.w, b?.h, applyTransform]);

    useImperativeHandle(ref, () => ({ centerView }), [centerView]);

    useEffect(() => {
      centerView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const el = wrapRef.current;
      if (!el) return;
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.1 : 0.91;
        const rect = el.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const prev = transform.current;
        const newScale = Math.min(Math.max(prev.scale * factor, 0.2), 2.5);
        const wx = (mx - prev.x) / prev.scale;
        const wy = (my - prev.y) / prev.scale;
        transform.current = { scale: newScale, x: mx - wx * newScale, y: my - wy * newScale };
        applyTransform();
      };
      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }, [applyTransform]);

    const onMouseDown = (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-node]')) return;
      isPanning.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: React.MouseEvent) => {
      if (!isPanning.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      transform.current.x += dx;
      transform.current.y += dy;
      applyTransform();
    };

    const stopPan = () => { isPanning.current = false; };

    return (
      <div
        ref={wrapRef}
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopPan}
        onMouseLeave={stopPan}
      >
        <div
          ref={innerRef}
          style={{ position: 'absolute', top: 0, left: 0, transformOrigin: '0 0', willChange: 'transform' }}
        >
          {/* Connectors */}
          <svg style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible', pointerEvents: 'none' }} width="1" height="1">
            {allEdges.map((e, i) => {
              const midY = (e.y1 + e.y2) / 2;
              const d = `M${e.x1},${e.y1} C${e.x1},${midY} ${e.x2},${midY} ${e.x2},${e.y2}`;
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={e.color}
                  strokeOpacity={0.2}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {allNodes.map(({ node, x, y }) => (
            <div
              key={node.id}
              style={{ position: 'absolute', left: x - NODE_W / 2, top: y, width: NODE_W }}
            >
              <NodeCard
                node={node}
                isSelected={selectedNodeId === node.id}
                onClick={() => setSelectedNodeId(selectedNodeId === node.id ? null : node.id)}
                directReportsCount={getChildren(node.id).length}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {allNodes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <p className="text-white/20 text-sm">No team members yet</p>
            <button
              onClick={onAddClick}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
            >
              + Add first person
            </button>
          </div>
        )}
      </div>
    );
  }
);
