'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Node = {
  id: string;
  name: string;
  role: string;
  initials: string;
  variant: 'lime' | 'blue' | 'white';
};

type Pt = { x: number; y: number };

const NODES: Node[] = [
  { id: 'ceo', name: 'Dana Reyes', role: 'CEO', initials: 'DR', variant: 'lime' },
  { id: 'eng', name: 'Sam Okafor', role: 'Engineering', initials: 'SO', variant: 'blue' },
  { id: 'prod', name: 'Lina Park', role: 'Product', initials: 'LP', variant: 'white' },
  { id: 'rev', name: 'Ravi Mehta', role: 'Revenue', initials: 'RM', variant: 'white' },
  { id: 'e1', name: 'Jo Kim', role: 'Backend', initials: 'JK', variant: 'white' },
  { id: 'e2', name: 'Mara Vale', role: 'Frontend', initials: 'MV', variant: 'white' },
  { id: 'p1', name: 'Ada Osei', role: 'Design', initials: 'AO', variant: 'white' },
  { id: 'r1', name: 'Theo Ruiz', role: 'Sales', initials: 'TR', variant: 'white' },
];

const EDGES: [string, string][] = [
  ['ceo', 'eng'], ['ceo', 'prod'], ['ceo', 'rev'],
  ['eng', 'e1'], ['eng', 'e2'], ['prod', 'p1'], ['rev', 'r1'],
];

const INITIAL: Record<string, Pt> = {
  ceo: { x: 0.5, y: 0.15 },
  eng: { x: 0.2, y: 0.46 }, prod: { x: 0.5, y: 0.46 }, rev: { x: 0.8, y: 0.46 },
  e1: { x: 0.12, y: 0.82 }, e2: { x: 0.31, y: 0.82 }, p1: { x: 0.5, y: 0.82 }, r1: { x: 0.8, y: 0.82 },
};

const VARIANT: Record<Node['variant'], string> = {
  lime: 'bg-lime',
  blue: 'bg-blue text-bone',
  white: 'bg-paper',
};

export function OrgCanvas() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [pos, setPos] = useState<Record<string, Pt>>(INITIAL);
  const [drag, setDrag] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const offset = useRef<Pt>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onDown = useCallback(
    (id: string) => (e: React.PointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const rect = ref.current!.getBoundingClientRect();
      const cx = pos[id].x * rect.width;
      const cy = pos[id].y * rect.height;
      offset.current = { x: e.clientX - rect.left - cx, y: e.clientY - rect.top - cy };
      setDrag(id);
      setTouched(true);
    },
    [pos]
  );

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (!drag) return;
      const rect = ref.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left - offset.current.x) / rect.width;
      const y = (e.clientY - rect.top - offset.current.y) / rect.height;
      setPos((p) => ({
        ...p,
        [drag]: { x: Math.min(0.95, Math.max(0.05, x)), y: Math.min(0.93, Math.max(0.07, y)) },
      }));
    },
    [drag]
  );

  const onUp = useCallback(() => setDrag(null), []);
  const px = (id: string): Pt => ({ x: pos[id].x * size.w, y: pos[id].y * size.h });

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      className="relative h-[400px] w-full select-none overflow-hidden bd shadowed bg-bone-2 sm:h-[460px]"
      style={{
        backgroundImage:
          'linear-gradient(#11111012 1px, transparent 1px), linear-gradient(90deg, #11111012 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
      data-cursor="hot"
    >
      {/* header strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between bd-b bg-bone px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest">mezan.app / canvas</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
          <span className="h-2 w-2 bg-coral animate-blink" /> live
        </span>
      </div>

      {/* connectors */}
      {size.w > 0 && (
        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 5 }} aria-hidden="true">
          {EDGES.map(([a, b]) => {
            const p1 = px(a);
            const p2 = px(b);
            const my = (p1.y + p2.y) / 2;
            return (
              <path
                key={`${a}-${b}`}
                d={`M ${p1.x} ${p1.y} C ${p1.x} ${my}, ${p2.x} ${my}, ${p2.x} ${p2.y}`}
                fill="none"
                stroke="#111110"
                strokeWidth={2.5}
                strokeDasharray="1 9"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      )}

      {/* nodes */}
      {NODES.map((n) => {
        const isDrag = drag === n.id;
        return (
          <div
            key={n.id}
            onPointerDown={onDown(n.id)}
            className={`absolute z-10 flex items-center gap-2 bd px-2.5 py-2 ${VARIANT[n.variant]} ${
              isDrag ? 'shadowed z-30' : 'shadowed'
            }`}
            style={{
              left: `${pos[n.id].x * 100}%`,
              top: `${pos[n.id].y * 100}%`,
              transform: `translate(-50%, -50%) rotate(${isDrag ? -3 : 0}deg) scale(${isDrag ? 1.06 : 1})`,
              transition: isDrag ? 'none' : 'transform .25s cubic-bezier(.2,.7,.2,1), box-shadow .2s',
              touchAction: 'none',
              boxShadow: isDrag ? '9px 9px 0 0 #111110' : undefined,
            }}
          >
            <span className={`flex h-7 w-7 items-center justify-center bd font-mono text-[11px] font-bold ${n.variant === 'blue' ? 'bg-bone text-ink' : 'bg-ink text-bone'}`}>
              {n.initials}
            </span>
            <span className="pr-1">
              <span className="block text-[12px] font-bold leading-tight">{n.name}</span>
              <span className="block font-mono text-[10px] uppercase leading-tight opacity-70">{n.role}</span>
            </span>
          </div>
        );
      })}

      {/* drag hint */}
      <div
        className={`pointer-events-none absolute bottom-3 left-1/2 z-30 -translate-x-1/2 bd bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest transition-opacity duration-500 ${
          touched ? 'opacity-0' : 'opacity-100'
        }`}
      >
        ↯ grab a card & drag it
      </div>
    </div>
  );
}
