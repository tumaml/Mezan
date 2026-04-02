'use client';

import React, { useRef, useState, useCallback } from 'react';
import { OrgProvider, useOrg } from '@/context/OrgContext';
import { OrgTree, OrgTreeHandle } from '@/components/OrgTree';
import { DetailPanel } from '@/components/DetailPanel';
import { AddEditModal } from '@/components/AddEditModal';

function App() {
  const treeRef = useRef<OrgTreeHandle>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { selectedNodeId, nodes } = useOrg();

  const openAdd = useCallback(() => { setEditingId(null); setModalOpen(true); }, []);
  const openEdit = useCallback(() => { if (selectedNodeId) { setEditingId(selectedNodeId); setModalOpen(true); } }, [selectedNodeId]);
  const closeModal = useCallback(() => { setModalOpen(false); setEditingId(null); }, []);

  return (
    <div className="h-full w-full flex flex-col" style={{ background: '#09090d' }}>

      {/* Top bar */}
      <header
        className="flex-shrink-0 h-12 flex items-center justify-between px-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(9,9,13,0.98)' }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="4.5" y="0.5" width="3" height="2.5" rx="0.75" fill="#f59e0b" />
              <rect x="0.5" y="6" width="3" height="2.5" rx="0.75" fill="#8b5cf6" />
              <rect x="8.5" y="6" width="3" height="2.5" rx="0.75" fill="#10b981" />
              <line x1="6" y1="3" x2="6" y2="5.5" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
              <line x1="6" y1="5.5" x2="2" y2="6" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
              <line x1="6" y1="5.5" x2="10" y2="6" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">Mezan</span>
          <span className="text-white/20 text-xs hidden sm:inline">Org Chart</span>
        </div>

        {/* Center stats */}
        <div className="hidden sm:flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <span><span className="text-white/60 font-semibold">{nodes.length}</span> people</span>
          <span><span className="text-white/60 font-semibold">{new Set(nodes.map((n) => n.department)).size}</span> depts</span>
        </div>

        {/* Add button */}
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add Person
        </button>
      </header>

      {/* Canvas */}
      <main className="flex-1 relative overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <OrgTree ref={treeRef} onAddClick={openAdd} />
      </main>

      {/* Zoom controls — bottom left, unobtrusive */}
      <div
        className="absolute bottom-5 left-5 flex flex-col gap-1 z-30"
        style={{ opacity: 0.7 }}
      >
        <ZoomBtn title="Zoom in" onClick={() => {
          const el = document.querySelector<HTMLElement>('[data-org-canvas]');
          el?.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true }));
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </ZoomBtn>
        <ZoomBtn title="Zoom out" onClick={() => {
          const el = document.querySelector<HTMLElement>('[data-org-canvas]');
          el?.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true }));
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </ZoomBtn>
        <ZoomBtn title="Reset view" onClick={() => treeRef.current?.centerView()}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 1.5v1M6 9.5v1M1.5 6h1M9.5 6h1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </ZoomBtn>
      </div>

      <DetailPanel onEdit={openEdit} />
      <AddEditModal open={modalOpen} editingId={editingId} onClose={closeModal} />
    </div>
  );
}

function ZoomBtn({ onClick, title, children }: { onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:opacity-100"
      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
    >
      {children}
    </button>
  );
}

export default function Page() {
  return (
    <OrgProvider>
      <App />
    </OrgProvider>
  );
}
