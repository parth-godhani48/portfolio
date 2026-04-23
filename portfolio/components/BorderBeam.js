"use client";
import { useEffect, useRef } from "react";

export default function BorderBeam({ size = 60, duration = 4, delay = 0, color = "rgba(156,163,175,0.7)" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = null;
    let raf;

    const animate = (ts) => {
      if (!start) start = ts - delay * 1000;
      const elapsed = (ts - start) / 1000;
      const progress = (elapsed % duration) / duration; // 0→1 loop

      const rect = el.getBoundingClientRect();
      const W = el.offsetWidth;
      const H = el.offsetHeight;
      const perimeter = 2 * (W + H);
      const dist = progress * perimeter;

      let x, y;
      if (dist < W) {
        x = dist; y = 0;
      } else if (dist < W + H) {
        x = W; y = dist - W;
      } else if (dist < 2 * W + H) {
        x = W - (dist - W - H); y = H;
      } else {
        x = 0; y = H - (dist - 2 * W - H);
      }

      el.style.setProperty("--bx", `${x}px`);
      el.style.setProperty("--by", `${y}px`);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [duration, delay]);

  return (
    <>
      <style>{`
        .beam-dot::after {
          content: '';
          position: absolute;
          left: var(--bx, 0);
          top: var(--by, 0);
          width: ${size}px;
          height: 2px;
          transform: translate(-50%, -50%);
          background: linear-gradient(90deg, transparent, ${color}, transparent);
          border-radius: 9999px;
          pointer-events: none;
          filter: blur(1px);
        }
      `}</style>
      <div ref={ref} className="beam-dot absolute inset-0 rounded-2xl overflow-hidden pointer-events-none" />
    </>
  );
}
