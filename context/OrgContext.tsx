'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { OrgNode, TreeNode } from '@/types';
import { SEED_DATA } from '@/data/seed';

const STORAGE_KEY = 'mezan-org-chart';

interface OrgContextValue {
  nodes: OrgNode[];
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  addNode: (node: Omit<OrgNode, 'id' | 'dateAdded'>) => void;
  updateNode: (id: string, updates: Partial<OrgNode>) => void;
  deleteNode: (id: string, reassignTo: string | null) => void;
  getNodeById: (id: string) => OrgNode | undefined;
  getChildren: (id: string) => OrgNode[];
  getParent: (id: string) => OrgNode | undefined;
  buildTree: () => TreeNode[];
}

const OrgContext = createContext<OrgContextValue | null>(null);

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<OrgNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNodes(JSON.parse(stored));
      } else {
        setNodes(SEED_DATA);
      }
    } catch {
      setNodes(SEED_DATA);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
    }
  }, [nodes, hydrated]);

  const addNode = useCallback((data: Omit<OrgNode, 'id' | 'dateAdded'>) => {
    const newNode: OrgNode = {
      ...data,
      id: `node-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setNodes((prev) => [...prev, newNode]);
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<OrgNode>) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  }, []);

  const deleteNode = useCallback((id: string, reassignTo: string | null) => {
    setNodes((prev) => {
      const children = prev.filter((n) => n.parentId === id);
      return prev
        .filter((n) => n.id !== id)
        .map((n) => {
          if (children.some((c) => c.id === n.id)) {
            return { ...n, parentId: reassignTo };
          }
          return n;
        });
    });
    setSelectedNodeId(null);
  }, []);

  const getNodeById = useCallback((id: string) => nodes.find((n) => n.id === id), [nodes]);

  const getChildren = useCallback((id: string) => nodes.filter((n) => n.parentId === id), [nodes]);

  const getParent = useCallback(
    (id: string) => {
      const node = nodes.find((n) => n.id === id);
      if (!node || !node.parentId) return undefined;
      return nodes.find((n) => n.id === node.parentId);
    },
    [nodes]
  );

  const buildTree = useCallback((): TreeNode[] => {
    const nodeMap = new Map<string, TreeNode>();

    nodes.forEach((n) => {
      nodeMap.set(n.id, { ...n, children: [], depth: 0, x: 0, y: 0 });
    });

    const roots: TreeNode[] = [];
    nodeMap.forEach((treeNode) => {
      if (!treeNode.parentId) {
        roots.push(treeNode);
      } else {
        const parent = nodeMap.get(treeNode.parentId);
        if (parent) {
          parent.children.push(treeNode);
        } else {
          roots.push(treeNode);
        }
      }
    });

    // Assign depths
    const assignDepth = (node: TreeNode, depth: number) => {
      node.depth = depth;
      node.children.forEach((child) => assignDepth(child, depth + 1));
    };
    roots.forEach((r) => assignDepth(r, 0));

    return roots;
  }, [nodes]);

  if (!hydrated) return null;

  return (
    <OrgContext.Provider
      value={{
        nodes,
        selectedNodeId,
        setSelectedNodeId,
        addNode,
        updateNode,
        deleteNode,
        getNodeById,
        getChildren,
        getParent,
        buildTree,
      }}
    >
      {children}
    </OrgContext.Provider>
  );
}

export function useOrg() {
  const ctx = useContext(OrgContext);
  if (!ctx) throw new Error('useOrg must be used within OrgProvider');
  return ctx;
}
