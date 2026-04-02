'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrg } from '@/context/OrgContext';
import { OrgNode, ROLE_OPTIONS, ROLE_STYLES, RoleType } from '@/types';

interface AddEditModalProps {
  open: boolean;
  editingId: string | null;
  onClose: () => void;
}

const EMPTY = { name: '', role: 'Agent' as RoleType, department: '', parentId: '', jobDescription: '' };

export function AddEditModal({ open, editingId, onClose }: AddEditModalProps) {
  const { nodes, addNode, updateNode, getNodeById } = useOrg();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<{ name?: string; department?: string }>({});
  const isEdit = !!editingId;

  useEffect(() => {
    if (!open) return;
    if (editingId) {
      const n = getNodeById(editingId);
      if (n) setForm({ name: n.name, role: n.role, department: n.department, parentId: n.parentId ?? '', jobDescription: n.jobDescription });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [open, editingId]);

  const set = (k: keyof typeof EMPTY, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.department.trim()) errs.department = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const data: Omit<OrgNode, 'id' | 'dateAdded'> = {
      name: form.name.trim(),
      role: form.role,
      department: form.department.trim(),
      parentId: form.parentId || null,
      jobDescription: form.jobDescription.trim(),
    };
    isEdit && editingId ? updateNode(editingId, data) : addNode(data);
    onClose();
  };

  // Exclude editing node + its descendants from parent options
  const excluded = new Set<string>();
  if (editingId) {
    excluded.add(editingId);
    let changed = true;
    while (changed) {
      changed = false;
      nodes.forEach((n) => { if (n.parentId && excluded.has(n.parentId) && !excluded.has(n.id)) { excluded.add(n.id); changed = true; } });
    }
  }
  const parentOptions = nodes.filter((n) => !excluded.has(n.id));

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="relative w-full max-w-[440px] max-h-[92vh] overflow-y-auto rounded-2xl"
            style={{ background: '#111116', border: '1px solid rgba(255,255,255,0.08)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="text-white font-semibold text-base">{isEdit ? 'Edit Person' : 'Add Person'}</h2>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M10.5 2.5l-8 8M2.5 2.5l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={submit} className="px-5 py-4 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Sara Al-Hassan"
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: 'rgb(252,165,165)' }}>{errors.name}</p>}
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Role</label>
                <div className="flex flex-wrap gap-1.5">
                  {ROLE_OPTIONS.map((role) => {
                    const rs = ROLE_STYLES[role];
                    const active = form.role === role;
                    return (
                      <button
                        key={role}
                        type="button"
                        onClick={() => set('role', role)}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all"
                        style={{
                          background: active ? `${rs.color}20` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${active ? rs.color + '50' : 'rgba(255,255,255,0.06)'}`,
                          color: active ? rs.color : 'rgba(255,255,255,0.35)',
                        }}
                      >
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Department</label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => set('department', e.target.value)}
                  placeholder="e.g. Customer Success"
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${errors.department ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                />
                {errors.department && <p className="text-xs mt-1" style={{ color: 'rgb(252,165,165)' }}>{errors.department}</p>}
              </div>

              {/* Reports to */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Reports To</label>
                <select
                  value={form.parentId}
                  onChange={(e) => set('parentId', e.target.value)}
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: form.parentId ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.3)' }}
                >
                  <option value="">— No manager (top level)</option>
                  {parentOptions.map((n) => (
                    <option key={n.id} value={n.id}>{n.name} · {n.role}</option>
                  ))}
                </select>
              </div>

              {/* Job description */}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Job Description <span style={{ color: 'rgba(255,255,255,0.2)' }}>(optional)</span></label>
                <textarea
                  value={form.jobDescription}
                  onChange={(e) => set('jobDescription', e.target.value)}
                  rows={3}
                  placeholder="Responsibilities, scope, goals..."
                  className="w-full rounded-xl px-3.5 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none resize-none"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                  style={{ background: 'rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.85)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.13)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
                >
                  {isEdit ? 'Save Changes' : 'Add to Chart'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
