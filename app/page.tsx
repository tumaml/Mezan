'use client';

import React, { useRef, useState, useCallback } from 'react';
import { OrgProvider, useOrg } from '@/context/OrgContext';
import { OrgTree, OrgTreeHandle } from '@/components/OrgTree';
import { DetailPanel } from '@/components/DetailPanel';
import { AddEditModal } from '@/components/AddEditModal';

function OrgChartApp() {
  const treeRef = useRef<OrgTreeHandle>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { selectedNodeId, nodes } = useOrg();

  const handleAddClick = useCallback(() => {
    setEditingId(null);
    setModalOpen(true);
  }, []);

  const handleEditClick = useCallback(() => {
    if (selectedNodeId) {
      setEditingId(selectedNodeId);
      setModalOpen(true);
    }
  }, [selectedNodeId]);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setEditingId(null);
  }, []);

  const handleCenter = () => {
    treeRef.current?.centerView();
  };

  const handleZoomOut = () => {
    // Dispatch a synthetic wheel event for zoom out
    const canvas = document.querySelector('[data-canvas]');
    if (canvas) {
      canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: 100, bubbles: true, cancelable: true }));
    }
  };

  const handleZoomIn = () => {
    const canvas = document.querySelector('[data-canvas]');
    if (canvas) {
      canvas.dispatchEvent(new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true }));
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden" style={{ background: '#0f1117' }}>
      {/* Top bar */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b z-20"
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
          background: 'rgba(15,17,23,0.97)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.3)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="5.5" y="1" width="3" height="3" rx="1" fill="#f59e0b" />
              <rect x="1" y="7.5" width="3" height="3" rx="1" fill="#8b5cf6" />
              <rect x="10" y="7.5" width="3" height="3" rx="1" fill="#10b981" />
              <line x1="7" y1="4" x2="7" y2="6.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <line x1="7" y1="6.5" x2="2.5" y2="7.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <line x1="7" y1="6.5" x2="11.5" y2="7.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-none tracking-tight">Mezan</h1>
            <p className="text-white/30 text-[10px] leading-none mt-0.5">Organization Chart</p>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-5">
          <Stat label="Members" value={nodes.length} />
          <div className="w-px h-4 bg-white/10" />
          <Stat label="Departments" value={new Set(nodes.map((n) => n.department)).size} />
        </div>

        {/* Actions */}
        <button
          onClick={handleAddClick}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'rgba(245,158,11,0.12)',
            border: '1px solid rgba(245,158,11,0.25)',
            color: '#f59e0b',
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Add Person</span>
        </button>
      </header>

      {/* Main canvas area */}
      <main className="flex-1 relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Edge vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(15,17,23,0.55) 100%)',
          }}
        />

        <div data-canvas className="absolute inset-0">
          <OrgTree ref={treeRef} onAddClick={handleAddClick} />
        </div>
      </main>

      {/* Floating toolbar */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-2xl px-2 py-2 z-30"
        style={{
          background: 'rgba(18, 21, 31, 0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
        }}
      >
        <ToolbarButton onClick={handleZoomOut} title="Zoom out">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M4 6h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </ToolbarButton>

        <ToolbarButton onClick={handleZoomIn} title="Zoom in">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </ToolbarButton>

        <div className="w-px h-5 bg-white/10 mx-0.5" />

        <ToolbarButton onClick={handleCenter} title="Center view">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5v2M7 10.5v2M1.5 7h2M10.5 7h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </ToolbarButton>

        <div className="w-px h-5 bg-white/10 mx-0.5" />

        <ToolbarButton onClick={handleAddClick} title="Add person" accent>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </ToolbarButton>

        <ToolbarButton onClick={handleFullscreen} title="Fullscreen">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 5V2.5h2.5M9.5 2.5H12V5M12 9v2.5H9.5M4.5 11.5H2V9"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ToolbarButton>
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-6 right-5 z-30 flex flex-col gap-1.5 px-3.5 py-3 rounded-xl"
        style={{
          background: 'rgba(18, 21, 31, 0.88)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-white/20 text-[9px] font-semibold uppercase tracking-widest mb-0.5">
          Roles
        </p>
        {(
          [
            { label: 'Manager', color: '#f59e0b' },
            { label: 'Supervisor', color: '#8b5cf6' },
            { label: 'Team Lead', color: '#10b981' },
            { label: 'HR / TA', color: '#f43f5e' },
            { label: 'Agent', color: '#0ea5e9' },
          ] as const
        ).map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-white/35 text-[10px]">{label}</span>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <DetailPanel onEdit={handleEditClick} />

      {/* Add/Edit modal */}
      <AddEditModal open={modalOpen} editingId={editingId} onClose={handleCloseModal} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="text-white font-bold text-sm leading-none font-mono">{value}</p>
      <p className="text-white/30 text-[10px] leading-none mt-0.5">{label}</p>
    </div>
  );
}

function ToolbarButton({
  onClick,
  title,
  accent,
  children,
}: {
  onClick: () => void;
  title: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
        accent
          ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
          : 'text-white/45 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

export default function Page() {
  return (
    <OrgProvider>
      <OrgChartApp />
    </OrgProvider>
  );
}
