export type RoleType = 'Manager' | 'Supervisor' | 'Team Lead' | 'HR/TA' | 'Agent';

export interface OrgNode {
  id: string;
  name: string;
  role: RoleType;
  department: string;
  parentId: string | null;
  jobDescription: string;
  dateAdded: string;
}

export interface TreeNode extends OrgNode {
  children: TreeNode[];
  depth: number;
  x: number;
  y: number;
}

export interface RoleStyle {
  color: string;
  border: string;
  badge: string;
  badgeText: string;
  glow: string;
}

export const ROLE_STYLES: Record<RoleType, RoleStyle> = {
  Manager: {
    color: '#f59e0b',
    border: 'border-l-amber-400',
    badge: 'bg-amber-400/20 text-amber-300 border border-amber-400/40',
    badgeText: 'Manager',
    glow: 'shadow-amber-500/20',
  },
  Supervisor: {
    color: '#8b5cf6',
    border: 'border-l-violet-500',
    badge: 'bg-violet-500/20 text-violet-300 border border-violet-500/40',
    badgeText: 'Supervisor',
    glow: 'shadow-violet-500/20',
  },
  'Team Lead': {
    color: '#10b981',
    border: 'border-l-emerald-500',
    badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
    badgeText: 'Team Lead',
    glow: 'shadow-emerald-500/20',
  },
  'HR/TA': {
    color: '#f43f5e',
    border: 'border-l-rose-500',
    badge: 'bg-rose-500/20 text-rose-300 border border-rose-500/40',
    badgeText: 'HR / TA',
    glow: 'shadow-rose-500/20',
  },
  Agent: {
    color: '#0ea5e9',
    border: 'border-l-sky-500',
    badge: 'bg-sky-500/20 text-sky-300 border border-sky-500/40',
    badgeText: 'Agent',
    glow: 'shadow-sky-500/20',
  },
};

export const ROLE_OPTIONS: RoleType[] = ['Manager', 'Supervisor', 'Team Lead', 'HR/TA', 'Agent'];
