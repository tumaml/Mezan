'use client';

import React from 'react';
import { OrgNode, ROLE_STYLES } from '@/types';

interface NodeCardProps {
  node: OrgNode;
  isSelected: boolean;
  onClick: () => void;
  directReportsCount: number;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function NodeCard({ node, isSelected, onClick, directReportsCount }: NodeCardProps) {
  const style = ROLE_STYLES[node.role];

  return (
    <div
      onClick={onClick}
      data-node="true"
      className="relative w-[260px] cursor-pointer select-none rounded-2xl transition-all duration-150"
      style={{
        background: isSelected ? '#1c1c22' : '#141418',
        border: `1px solid ${isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.07)'}`,
        borderLeft: `3px solid ${style.color}`,
        boxShadow: isSelected
          ? `0 0 0 1px ${style.color}30, 0 8px 32px rgba(0,0,0,0.4)`
          : '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{
            background: `${style.color}18`,
            color: style.color,
            border: `1px solid ${style.color}30`,
          }}
        >
          {getInitials(node.name)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold leading-tight truncate">{node.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
              style={{
                background: `${style.color}20`,
                color: style.color,
              }}
            >
              {style.badgeText}
            </span>
            <span className="text-white/30 text-[11px] truncate">{node.department}</span>
          </div>
        </div>
      </div>

      {/* Reports count chip */}
      {directReportsCount > 0 && (
        <div
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[9px] font-semibold"
          style={{
            background: '#1a1a20',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          {directReportsCount}
        </div>
      )}
    </div>
  );
}
