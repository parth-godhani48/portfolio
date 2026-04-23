"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const BADGE_LABELS = ["React", "Next.js", "FastAPI", "Python", "AI / ML", "Tailwind"];
const floatingBadges = [ 
  { label: "FastAPI",  angle:  30,  radius: 175, delay: 0.1 }, // bottom right
  { label: "Python",   angle:  90,  radius: 175, delay: 2 }, // bottom center
  { label: "AI / ML",  angle: 150,  radius: 175, delay: 3 }, // bottom left
  { label: "Python",   angle:  90,  radius: 175, delay: 4 },
];

const ROLES = ["Python Developer", "AI Engineer", "FastAPI Expert", "Full Stack Dev", "Problem Solver"];
const TICKER_ITEMS = ["Available for Work", "Open to Projects", "Let's Build Together", "Python & FastAPI", "AI Integration", "Full Stack Dev", "React & Next.js"];
const NAME_LETTERS = "Parth Godhani".split("");

/* ── Constellation canvas ── */
function ConstellationCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, nodes, raf;
    const CONNECT_DIST = 120;

    const init = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: 55 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.25 + 0.06,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // draw lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(156,163,175,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      // draw dots
      nodes.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(156,163,175,${p.alpha})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
      raf = requestAnimationFrame(draw);
    };

    init(); draw();
    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ── Typewriter role text ── */
function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="text-gray-300 font-semibold">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-6 bg-gray-400 ml-0.5 align-middle"
      />
    </span>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const duration = 1400;
        const steps = 40;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          setCount(Math.round((num * step) / steps));
          if (step >= steps) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Scrolling ticker ── */
function Ticker() {
  return (
    <div className="overflow-hidden border-y border-gray-800/60 py-3 my-8 select-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 whitespace-nowrap w-max"
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-xs font-semibold text-gray-600 uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-gray-700 inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Letter-by-letter name ── */
function AnimatedName() {
  return (
    <span className="text-gradient inline-block">
      {NAME_LETTERS.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── 3D Image Card ── */
function Image3D() {
  const cardRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 22 });
  const rotateY  = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const rotateX  = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const glareX   = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY   = useTransform(springY, [-0.5, 0.5], [0, 100]);
  const shadowX  = useTransform(springX, [-0.5, 0.5], ["-16px", "16px"]);
  const shadowY  = useTransform(springY, [-0.5, 0.5], ["-16px", "16px"]);
  const layer1X  = useTransform(springX, [-0.5, 0.5], [-6,  6]);
  const layer1Y  = useTransform(springY, [-0.5, 0.5], [-6,  6]);
  const layer2X  = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const layer2Y  = useTransform(springY, [-0.5, 0.5], [-14, 14]);
  const layer3X  = useTransform(springX, [-0.5, 0.5], [-22, 22]);
  const layer3Y  = useTransform(springY, [-0.5, 0.5], [-22, 22]);

  const onMouseMove  = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [rawX, rawY]);
  const onMouseLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-shrink-0 flex items-center justify-center"
      style={{ width: 500, height: 520, perspective: "1000px", perspectiveOrigin: "center center" }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}>

        <motion.div style={{ x: shadowX, y: shadowY, translateZ: "-60px", transformStyle: "preserve-3d" }}
          className="absolute inset-8 rounded-full"
          animate={{ opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-full h-full rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(17,24,39,0.9) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </motion.div>

        <motion.div style={{ x: layer1X, y: layer1Y, translateZ: "0px" }}
          className="absolute inset-0 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full"
            style={{ width: 460, height: 460, border: "1px solid rgba(156,163,175,0.12)" }} />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full"
            style={{ width: 390, height: 390, border: "1px dashed rgba(156,163,175,0.15)" }} />
          <motion.div animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full"
            style={{ width: 310, height: 310, border: "1px solid rgba(156,163,175,0.2)" }} />
          <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(ellipse at center, rgba(17,24,39,0.6) 0%, transparent 70%)" }} />
        </motion.div>

        <motion.div style={{ x: layer2X, y: layer2Y, translateZ: "10px" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-36 pointer-events-none"
          animate={{ opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          <div className="w-full h-full rounded-full bg-[#111827] blur-[60px]" />
        </motion.div>

        <motion.div style={{ x: layer3X, y: layer3Y, translateZ: "40px" }}
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <img src="/profile11.png" alt="Parth Godhani"
            className="w-full h-full object-contain object-bottom"
            style={{ filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.6)) drop-shadow(0 30px 80px rgba(0,0,0,0.4))" }} />
        </motion.div>

        <motion.div
          style={{
            translateZ: "60px",
            background: useTransform([glareX, glareY], ([gx, gy]) =>
              `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.04) 0%, transparent 60%)`),
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
        />

        <div className="absolute inset-0" style={{ transform: "translateZ(70px)", transformStyle: "preserve-3d" }}>
          {floatingBadges.map((badge, i) => {
            const rad = (badge.angle * Math.PI) / 180;
            const x   = Math.cos(rad) * badge.radius;
            const y   = Math.sin(rad) * badge.radius;
            return (
              <motion.div key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0], rotate: [-0.5, 0.5, -0.5] }}
                transition={{
                  opacity: { delay: badge.delay + 0.9, duration: 0.5 },
                  scale:   { delay: badge.delay + 0.9, duration: 0.5, type: "spring", stiffness: 200 },
                  y:       { delay: badge.delay + 1.4, duration: 3.2 + i * 0.25, repeat: Infinity, ease: "easeInOut" },
                  rotate:  { delay: badge.delay + 1.4, duration: 4 + i * 0.2,    repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute whitespace-nowrap"
                style={{ top: "50%", left: "50%", transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-gray-300"
                  style={{
                    background: "rgba(17,24,39,0.85)", backdropFilter: "blur(12px)",
                    border: "1px solid rgba(156,163,175,0.2)", boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                  {badge.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div style={{ transform: "translateZ(80px)", position: "absolute", inset: 0 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
            transition={{ opacity: { delay: 1.6, duration: 0.6 }, x: { delay: 1.6, duration: 0.6 }, y: { delay: 2.2, duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute top-10 -left-4 rounded-2xl px-4 py-3"
            style={{ background: "rgba(17,24,39,0.88)", backdropFilter: "blur(16px)", border: "1px solid rgba(156,163,175,0.18)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
            <p className="text-gray-100 font-bold text-sm">Code. Build. Innovate.</p>
            <p className="text-gray-500 text-xs mt-0.5">Turning Ideas into Reality</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
            transition={{ opacity: { delay: 1.8, duration: 0.5 }, x: { delay: 1.8, duration: 0.5 }, y: { delay: 2.4, duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute bottom-10 -right-2 flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-gray-300"
            style={{ background: "rgba(17,24,39,0.88)", backdropFilter: "blur(16px)", border: "1px solid rgba(156,163,175,0.18)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Open to Work
          </motion.div>
        </div>

      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#020817]">
      <ConstellationCanvas />

      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Big background text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden select-none z-[1]">
        <motion.div animate={{ x: ["-5%", "-15%", "-5%"], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="whitespace-nowrap font-black uppercase leading-none"
          style={{ fontSize: "clamp(3rem,10vw,9rem)", letterSpacing: "0.15em", color: "transparent", WebkitTextStroke: "1px rgba(156,163,175,0.18)" }}>
          PARTH GODHANI &nbsp;&nbsp; PARTH GODHANI &nbsp;&nbsp; PARTH GODHANI
        </motion.div>
        <motion.div animate={{ x: ["-10%", "0%", "-10%"], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="whitespace-nowrap font-black uppercase leading-none mt-4"
          style={{ fontSize: "clamp(2rem,7vw,7rem)", letterSpacing: "0.35em", color: "transparent", WebkitTextStroke: "1px rgba(156,163,175,0.12)" }}>
          DEVELOPER &nbsp; AI &nbsp; FULLSTACK &nbsp; DEVELOPER &nbsp; AI &nbsp; FULLSTACK
        </motion.div>
        <motion.div animate={{ x: ["0%", "-12%", "0%"], opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="whitespace-nowrap font-black uppercase leading-none mt-4"
          style={{ fontSize: "clamp(1.5rem,5vw,5rem)", letterSpacing: "0.5em", color: "transparent", WebkitTextStroke: "1px rgba(156,163,175,0.08)" }}>
          PYTHON &nbsp; FASTAPI &nbsp; REACT &nbsp; NEXTJS &nbsp; PYTHON &nbsp; FASTAPI &nbsp; REACT
        </motion.div>
      </div>

      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(31,41,55,0.8) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[-10%] right-[-8%] w-[450px] h-[450px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(17,24,39,0.9) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          <div className="flex-1 max-w-xl text-center lg:text-left">
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 justify-center lg:justify-start mb-4">
              <span className="w-8 h-px bg-gray-600" />
              <span className="text-gray-500 text-sm font-semibold tracking-widest uppercase">Welcome to my portfolio</span>
            </motion.div>

            {/* Letter-by-letter name */}
            <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.1, delay: 0.2 }}
              className="text-5xl md:text-[4.5rem] font-black leading-[1.05] mb-3">
              Hi, I&apos;m
              <br />
              <AnimatedName />
            </motion.h1>

            {/* Typewriter role */}
            <motion.p {...fadeUp(0.3)} className="text-xl md:text-2xl font-medium text-gray-500 mb-2">
              AI &amp; <Typewriter />
            </motion.p>

            {/* Ticker */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Ticker />
            </motion.div>

            <motion.div {...fadeUp(0.38)}
              className="glass rounded-2xl p-5 mb-8 hover:border-gray-600/40 hover:shadow-xl hover:shadow-black/30 transition-all duration-300">
              <p className="text-gray-100 font-bold text-lg mb-1">Building Websites, Apps &amp; Intelligent Systems</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                I craft modern, high-performing digital products — from sleek landing pages to full-stack AI-powered applications using Python, FastAPI &amp; React.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.46)} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#projects"
                className="bg-[#1f2937] hover:bg-[#374151] text-gray-100 font-bold px-8 py-3.5 rounded-xl border border-gray-700/60 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/40">
                View Projects →
              </a>
              <a href="/resume.pdf" download="Parth_Godhani_Resume.pdf"
                className="glass text-gray-300 font-bold px-8 py-3.5 rounded-xl hover:border-gray-500/50 hover:text-gray-100 hover:scale-105 transition-all duration-300">
                Download Resume ↓
              </a>
            </motion.div>

            {/* Animated counters */}
            <motion.div {...fadeUp(0.54)} className="flex gap-8 mt-10 pt-8 border-t border-gray-800/60 justify-center lg:justify-start">
              {[
                { target: "10", suffix: "+", label: "Projects Built" },
                { target: "3",  suffix: "+", label: "Years Learning" },
                { target: "5",  suffix: "+", label: "Tech Stacks" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="text-3xl font-black text-gray-100">
                    <Counter target={s.target} suffix={s.suffix} />
                  </p>
                  <p className="text-gray-600 text-sm mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <Image3D />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />
    </section>
  );
}
