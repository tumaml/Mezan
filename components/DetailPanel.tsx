'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrg } from '@/context/OrgContext';
import { ROLE_STYLES } from '@/types';

interface DetailPanelProps {
  onEdit: () => void;
}

export function DetailPanel({ onEdit }: DetailPanelProps) {
  const { selectedNodeId, setSelectedNodeId, getNodeById, getChildren, getParent, deleteNode, updateNode, nodes } =
    useOrg();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [reassignTo, setReassignTo] = useState<string>('');
  const [editingDesc, setEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  const node = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const parent = node ? getParent(node.id) : undefined;
  const children = node ? getChildren(node.id) : [];

  useEffect(() => {
    if (node) {
      setDescDraft(node.jobDescription);
      setEditingDesc(false);
      setShowDeleteConfirm(false);
    }
  }, [node]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      setSelectedNodeId(null);
    }
  };

  const handleDelete = () => {
    if (!node) return;
    deleteNode(node.id, reassignTo || null);
    setShowDeleteConfirm(false);
  };

  const handleSaveDesc = () => {
    if (!node) return;
    updateNode(node.id, { jobDescription: descDraft });
    setEditingDesc(false);
  };

  const reassignOptions = nodes.filter((n) => n.id !== node?.id);

  if (!node) return null;

  const style = ROLE_STYLES[node.role];

  return (
    <AnimatePresence>
      {node && (
        <>
          {/* Invisible overlay to detect outside click */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-40"
            onClick={handleOverlayClick}
          />

          <motion.aside
            key="detail-panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[380px] z-50 flex flex-col"
            style={{
              background: 'rgba(15, 17, 23, 0.97)',
              borderLeft: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header accent bar */}
            <div
              className="h-1 w-full flex-shrink-0"
              style={{ background: `linear-gradient(90deg, ${style.color}88, transparent)` }}
            />

            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
              <div className="flex-1 min-w-0">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase mb-2 ${style.badge}`}>
                  {style.badgeText}
                </span>
                <h2 className="text-white font-bold text-lg leading-tight truncate">{node.name}</h2>
                <p className="text-white/40 text-xs mt-0.5">{node.department}</p>
              </div>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="ml-4 mt-1 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Metadata */}
            <div className="px-6 py-4 space-y-3 border-b border-white/[0.06]">
              <MetaRow label="Reports to" value={parent?.name ?? '— (Top level)'} mono={false} />
              <MetaRow label="Direct reports" value={String(children.length)} mono />
              <MetaRow
                label="Date added"
                value={new Date(node.dateAdded).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
                mono
              />
              <MetaRow label="ID" value={node.id} mono />
            </div>

            {/* Job description */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                  Job Description
                </span>
                {!editingDesc && (
                  <button
                    onClick={() => { setDescDraft(node.jobDescription); setEditingDesc(true); }}
                    className="text-xs text-white/30 hover:text-white/70 transition-colors"
                  >
                    Edit
                  </button>
                )}
              </div>

              {editingDesc ? (
                <div className="space-y-3">
                  <textarea
                    value={descDraft}
                    onChange={(e) => setDescDraft(e.target.value)}
                    rows={8}
                    className="w-full rounded-lg bg-white/[0.05] border border-white/10 text-white/80 text-sm px-3 py-2 resize-none focus:outline-none focus:border-white/25 placeholder:text-white/20"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDesc}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingDesc(false)}
                      className="px-3 py-1.5 rounded-lg text-white/40 hover:text-white/60 text-xs transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-sm leading-relaxed whitespace-pre-wrap">
                  {node.jobDescription || <span className="text-white/20 italic">No description yet.</span>}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 border-t border-white/[0.06] space-y-2">
              {!showDeleteConfirm ? (
                <div className="flex gap-2">
                  <button
                    onClick={onEdit}
                    className="flex-1 py-2 rounded-lg bg-white/[0.07] hover:bg-white/[0.12] text-white text-sm font-medium transition-colors"
                  >
                    Edit Person
                  </button>
                  <button
                    onClick={() => { setReassignTo(''); setShowDeleteConfirm(true); }}
                    className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-sm transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 3.5h10M5.5 3.5V2h3v1.5M4.5 3.5V12h5V3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 space-y-3">
                  <p className="text-rose-300 text-xs font-medium">
                    Delete {node.name}?
                  </p>
                  {children.length > 0 && (
                    <div>
                      <label className="text-white/40 text-xs block mb-1">
                        Reassign {children.length} direct report{children.length !== 1 ? 's' : ''} to:
                      </label>
                      <select
                        value={reassignTo}
                        onChange={(e) => setReassignTo(e.target.value)}
                        className="w-full rounded bg-white/[0.05] border border-white/10 text-white text-xs px-2 py-1.5 focus:outline-none"
                      >
                        <option value="">Remove (no manager)</option>
                        {reassignOptions.map((n) => (
                          <option key={n.id} value={n.id}>
                            {n.name} — {n.role}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleDelete}
                      className="flex-1 py-1.5 rounded bg-rose-500/30 hover:bg-rose-500/50 text-rose-300 text-xs font-medium transition-colors"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-3 py-1.5 rounded text-white/40 hover:text-white/60 text-xs transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MetaRow({ label, value, mono }: { label: string; value: string; mono: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-white/30 text-xs flex-shrink-0">{label}</span>
      <span
        className={`text-white/70 text-xs text-right truncate ${mono ? 'font-mono' : ''}`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}
