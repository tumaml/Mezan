'use client';

import { useEffect, useRef, useState } from 'react';

/** A trailing brutalist ring cursor. Desktop / fine-pointer only. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('cursor-host');

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (dot.current) dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const t = e.target as HTMLElement;
      setHot(!!t.closest('a, button, [data-cursor="hot"]'));
    };
    const loop = () => {
      const target = dot.current;
      if (target && ring.current) {
        const m = target.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/);
        if (m) {
          const tx = parseFloat(m[1]);
          const ty = parseFloat(m[2]);
          rx += (tx - rx) * 0.18;
          ry += (ty - ry) * 0.18;
          ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-host');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ marginLeft: -4, marginTop: -4 }}
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,background-color] duration-200"
        style={{
          width: hot ? 56 : 30,
          height: hot ? 56 : 30,
          marginLeft: hot ? -28 : -15,
          marginTop: hot ? -28 : -15,
          border: '2.5px solid #111110',
          background: hot ? 'rgba(200,240,60,0.5)' : 'transparent',
          mixBlendMode: hot ? 'normal' : 'multiply',
        }}
      />
    </>
  );
}
