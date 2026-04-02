'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrg } from '@/context/OrgContext';
import { ROLE_STYLES } from '@/types';

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

interface DetailPanelProps {
  onEdit: () => void;
}

export function DetailPanel({ onEdit }: DetailPanelProps) {
  const { selectedNodeId, setSelectedNodeId, getNodeById, getChildren, getParent, deleteNode, updateNode, nodes } = useOrg();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [reassignTo, setReassignTo] = useState('');
  const [editingDesc, setEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState('');

  const node = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const parent = node ? getParent(node.id) : undefined;
  const children = node ? getChildren(node.id) : [];

  useEffect(() => {
    if (node) {
      setDescDraft(node.jobDescription);
      setEditingDesc(false);
      setConfirmDelete(false);
    }
  }, [node?.id]);

  if (!node) return null;

  const style = ROLE_STYLES[node.role];
  const reassignOptions = nodes.filter((n) => n.id !== node.id);

  return (
    <AnimatePresence>
      <motion.div
        key="detail-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40"
        onClick={() => setSelectedNodeId(null)}
      />

      <motion.aside
        key="detail-panel"
        initial={{ x: 360, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 360, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="fixed right-0 top-0 h-full w-[340px] z-50 flex flex-col overflow-hidden"
        style={{ background: '#0f0f13', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Role color strip */}
        <div className="h-[3px] w-full" style={{ background: style.color }} />

        {/* Profile header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-bold"
              style={{ background: `${style.color}18`, color: style.color, border: `1px solid ${style.color}30` }}
            >
              {getInitials(node.name)}
            </div>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <h2 className="text-white font-bold text-lg leading-tight">{node.name}</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className="rounded-lg px-2 py-0.5 text-[11px] font-semibold"
              style={{ background: `${style.color}18`, color: style.color }}
            >
              {style.badgeText}
            </span>
            <span className="text-white/30 text-xs">{node.department}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Meta */}
        <div className="px-5 py-4 space-y-2.5">
          <Row label="Reports to" value={parent?.name ?? '— Top level'} />
          <Row label="Direct reports" value={String(children.length)} mono />
          <Row label="Department" value={node.department} />
          <Row
            label="Added"
            value={new Date(node.dateAdded).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            mono
          />
        </div>

        <div className="mx-5 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Job description */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/30 text-[11px] font-semibold uppercase tracking-wider">Role Description</span>
            {!editingDesc && (
              <button
                className="text-[11px] transition-colors"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
                onClick={() => { setDescDraft(node.jobDescription); setEditingDesc(true); }}
              >
                Edit
              </button>
            )}
          </div>

          {editingDesc ? (
            <div className="space-y-2">
              <textarea
                value={descDraft}
                onChange={(e) => setDescDraft(e.target.value)}
                rows={7}
                className="w-full rounded-xl text-sm px-3 py-2.5 resize-none focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.75)',
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => { updateNode(node.id, { jobDescription: descDraft }); setEditingDesc(false); }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingDesc(false)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: node.jobDescription ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)' }}>
              {node.jobDescription || 'No description added yet.'}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {!confirmDelete ? (
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.75)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.11)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
              >
                Edit
              </button>
              <button
                onClick={() => { setReassignTo(''); setConfirmDelete(true); }}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{ background: 'rgba(239,68,68,0.08)', color: 'rgba(239,68,68,0.6)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.08)')}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M1.5 3h10m-7 0V2h3v1M3.5 3v8h6V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="rounded-xl p-3 space-y-3" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="text-sm font-medium" style={{ color: 'rgba(252,165,165,0.9)' }}>
                Remove {node.name.split(' ')[0]}?
              </p>
              {children.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Move {children.length} report{children.length !== 1 ? 's' : ''} to:
                  </label>
                  <select
                    value={reassignTo}
                    onChange={(e) => setReassignTo(e.target.value)}
                    className="w-full rounded-lg px-2.5 py-2 text-xs focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                  >
                    <option value="">No manager</option>
                    {reassignOptions.map((n) => (
                      <option key={n.id} value={n.id}>{n.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => { deleteNode(node.id, reassignTo || null); setConfirmDelete(false); }}
                  className="flex-1 py-2 rounded-lg text-xs font-semibold transition-colors"
                  style={{ background: 'rgba(239,68,68,0.2)', color: 'rgb(252,165,165)' }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{label}</span>
      <span className={`text-xs text-right truncate ${mono ? 'font-mono' : ''}`} style={{ color: 'rgba(255,255,255,0.6)' }}>{value}</span>
    </div>
  );
}
