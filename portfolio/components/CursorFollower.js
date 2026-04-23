"use client";
import { useEffect, useRef } from "react";

const LERP = 0.12;

export default function CursorFollower() {
  const canvasRef = useRef(null);
  const rings  = useRef([]);
  const mouse  = useRef({ x: -999, y: -999 });
  const dot    = useRef({ x: -999, y: -999 });
  const raf    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const spawnRing = (x, y, maxR = 40, speed = 0.8, color = "156,163,175") => {
      rings.current.push({ x, y, r: 2, maxR, speed, alpha: 0.45, color });
    };

    let lastSpawn = { x: -999, y: -999 };

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      const dx = e.clientX - lastSpawn.x;
      const dy = e.clientY - lastSpawn.y;
      if (Math.hypot(dx, dy) > 18) {
        spawnRing(e.clientX, e.clientY, 28, 0.7, "156,163,175");
        lastSpawn = { x: e.clientX, y: e.clientY };
      }
    };

    const onClick = (e) => {
      spawnRing(e.clientX, e.clientY, 50,  1.1, "209,213,219");
      spawnRing(e.clientX, e.clientY, 80,  0.9, "156,163,175");
      spawnRing(e.clientX, e.clientY, 110, 0.7, "107,114,128");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dot.current.x += (mouse.current.x - dot.current.x) * LERP;
      dot.current.y += (mouse.current.y - dot.current.y) * LERP;

      rings.current = rings.current.filter((r) => r.alpha > 0.01);
      rings.current.forEach((ring) => {
        const progress = ring.r / ring.maxR;
        ring.alpha = 0.45 * (1 - progress);
        ring.r += ring.speed;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha})`;
        ctx.lineWidth = 1.2 * (1 - progress * 0.6);
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(dot.current.x, dot.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(229,231,235,0.9)";
      ctx.fill();

      raf.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999]" />;
}
