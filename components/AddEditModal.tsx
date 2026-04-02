'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrg } from '@/context/OrgContext';
import { OrgNode, ROLE_OPTIONS, RoleType } from '@/types';

interface AddEditModalProps {
  open: boolean;
  editingId: string | null;
  onClose: () => void;
}

interface FormState {
  name: string;
  role: RoleType;
  department: string;
  parentId: string;
  jobDescription: string;
}

const EMPTY: FormState = {
  name: '',
  role: 'Agent',
  department: '',
  parentId: '',
  jobDescription: '',
};

export function AddEditModal({ open, editingId, onClose }: AddEditModalProps) {
  const { nodes, addNode, updateNode, getNodeById, selectedNodeId } = useOrg();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [parentSearch, setParentSearch] = useState('');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const isEdit = !!editingId;

  useEffect(() => {
    if (!open) return;

    if (editingId) {
      const node = getNodeById(editingId);
      if (node) {
        setForm({
          name: node.name,
          role: node.role,
          department: node.department,
          parentId: node.parentId ?? '',
          jobDescription: node.jobDescription,
        });
        setParentSearch('');
      }
    } else {
      setForm(EMPTY);
      setParentSearch('');
    }
    setErrors({});
  }, [open, editingId, getNodeById]);

  const set = (k: keyof FormState, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.department.trim()) e.department = 'Department is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data: Omit<OrgNode, 'id' | 'dateAdded'> = {
      name: form.name.trim(),
      role: form.role,
      department: form.department.trim(),
      parentId: form.parentId || null,
      jobDescription: form.jobDescription.trim(),
    };

    if (isEdit && editingId) {
      updateNode(editingId, data);
    } else {
      addNode(data);
    }

    onClose();
  };

  // Available parent options — exclude the node being edited and its descendants
  const getDescendantIds = (id: string): Set<string> => {
    const result = new Set<string>([id]);
    nodes.forEach((n) => {
      if (n.parentId && result.has(n.parentId)) result.add(n.id);
    });
    // Repeat until stable
    let changed = true;
    while (changed) {
      changed = false;
      nodes.forEach((n) => {
        if (n.parentId && result.has(n.parentId) && !result.has(n.id)) {
          result.add(n.id);
          changed = true;
        }
      });
    }
    return result;
  };

  const excludeIds = editingId ? getDescendantIds(editingId) : new Set<string>();
  const parentOptions = nodes.filter(
    (n) => !excludeIds.has(n.id) && n.id !== editingId
  );

  const filteredParents = parentSearch
    ? parentOptions.filter(
        (n) =>
          n.name.toLowerCase().includes(parentSearch.toLowerCase()) ||
          n.department.toLowerCase().includes(parentSearch.toLowerCase())
      )
    : parentOptions;

  const selectedParent = nodes.find((n) => n.id === form.parentId);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: 'rgba(17, 20, 29, 0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <h2 className="text-white font-bold text-base">
                {isEdit ? 'Edit Person' : 'Add Person'}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              {/* Name */}
              <Field label="Full Name" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Sarah Al-Hassan"
                  className={inputCls(!!errors.name)}
                />
              </Field>

              {/* Role */}
              <Field label="Role">
                <div className="grid grid-cols-3 gap-1.5">
                  {ROLE_OPTIONS.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => set('role', role)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                        form.role === role
                          ? 'bg-white/15 text-white ring-1 ring-white/30'
                          : 'bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/70'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Department */}
              <Field label="Department" error={errors.department}>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => set('department', e.target.value)}
                  placeholder="e.g. Customer Success"
                  className={inputCls(!!errors.department)}
                />
              </Field>

              {/* Reports To */}
              <Field label="Reports To">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={parentSearch}
                    onChange={(e) => setParentSearch(e.target.value)}
                    placeholder="Search by name or department..."
                    className={inputCls(false)}
                  />
                  <div className="max-h-[150px] overflow-y-auto rounded-lg border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04]">
                    <button
                      type="button"
                      onClick={() => { set('parentId', ''); setParentSearch(''); }}
                      className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                        !form.parentId
                          ? 'bg-white/10 text-white'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/[0.05]'
                      }`}
                    >
                      — None (top level)
                    </button>
                    {filteredParents.map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => { set('parentId', n.id); setParentSearch(''); }}
                        className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                          form.parentId === n.id
                            ? 'bg-white/10 text-white'
                            : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
                        }`}
                      >
                        <span className="font-medium">{n.name}</span>
                        <span className="text-white/25 text-[10px]">{n.role}</span>
                      </button>
                    ))}
                    {filteredParents.length === 0 && parentSearch && (
                      <p className="px-3 py-2 text-white/20 text-xs">No matches</p>
                    )}
                  </div>
                  {selectedParent && (
                    <p className="text-white/30 text-[11px]">
                      Selected: <span className="text-white/60">{selectedParent.name}</span> — {selectedParent.role}
                    </p>
                  )}
                </div>
              </Field>

              {/* Job Description */}
              <Field label="Job Description">
                <textarea
                  value={form.jobDescription}
                  onChange={(e) => set('jobDescription', e.target.value)}
                  rows={4}
                  placeholder="Describe responsibilities, expectations, and scope..."
                  className={`${inputCls(false)} resize-none`}
                />
              </Field>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/[0.16] text-white font-semibold text-sm transition-colors"
                >
                  {isEdit ? 'Save Changes' : 'Add to Chart'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-white/40 hover:text-white/70 text-sm transition-colors"
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-white/50 text-xs font-semibold uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-rose-400 text-xs">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/20 bg-white/[0.05] border ${
    hasError ? 'border-rose-500/50' : 'border-white/[0.08]'
  } focus:outline-none focus:border-white/25 transition-colors`;
}
