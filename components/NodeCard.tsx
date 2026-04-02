'use client';

import React from 'react';
import { OrgNode, ROLE_STYLES } from '@/types';

interface NodeCardProps {
  node: OrgNode;
  isSelected: boolean;
  onClick: () => void;
  directReportsCount: number;
}

export function NodeCard({ node, isSelected, onClick, directReportsCount }: NodeCardProps) {
  const style = ROLE_STYLES[node.role];

  return (
    <div
      onClick={onClick}
      className={`
        relative w-[220px] cursor-pointer select-none
        rounded-xl border-l-[3px] border border-white/8
        bg-white/[0.04] backdrop-blur-sm
        px-4 py-3 transition-all duration-200
        hover:bg-white/[0.08] hover:scale-[1.03]
        ${isSelected ? 'ring-2 ring-white/30 bg-white/[0.09] scale-[1.03]' : ''}
        shadow-lg ${style.glow}
      `}
      style={{ borderLeftColor: style.color }}
    >
      {/* Role badge */}
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase mb-2 ${style.badge}`}
      >
        {style.badgeText}
      </span>

      {/* Name */}
      <p className="text-white font-semibold text-sm leading-tight truncate">{node.name}</p>

      {/* Department */}
      <p className="text-white/50 text-xs mt-0.5 truncate">{node.department}</p>

      {/* Direct reports indicator */}
      {directReportsCount > 0 && (
        <div className="mt-2 flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-white/30 text-[10px] font-mono">
            {directReportsCount} report{directReportsCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Selected indicator dot */}
      {isSelected && (
        <span
          className="absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: style.color }}
        />
      )}
    </div>
  );
}
