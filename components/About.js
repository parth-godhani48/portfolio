"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "Python",    level: 90 },
  { name: "FastAPI",   level: 85 },
  { name: "RestAPI",   level: 92 },
  { name: "AI / APIs", level: 87 },
  { name: "AI Coding", level: 85 },
];

const techBadges = ["Python", "FastAPI", "PostgreSQL", "MongoDB", "OpenAI API", "Pydantic", "SQLAlchemy", "Docker", "Git"];

const STATS = [
  { target: 10, suffix: "+", label: "Projects" },
  { target: 3,  suffix: "+", label: "Years" },
  { target: 9,  suffix: "",  label: "Technologies" },
];

/* Animated counter */
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let step = 0, steps = 40;
        const timer = setInterval(() => {
          step++;
          setCount(Math.round((target * step) / steps));
          if (step >= steps) clearInterval(timer);
        }, 1200 / steps);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* Skill bar with fill + pulse loop */
function SkillBar({ name, level, index }) {
  const [filled, setFilled] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-gray-500 font-semibold">{level}%</span>
      </div>
      <div className="h-2 bg-gray-800/80 rounded-full overflow-hidden border border-gray-700/40">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.12, ease: "easeOut" }}
          onAnimationComplete={() => setFilled(true)}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: "linear-gradient(to right, #374151, #9ca3af)" }}
        >
          {/* Shimmer sweep after fill */}
          {filled && (
            <motion.div
              className="absolute inset-0"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 relative bg-[#111827]">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-gray-500 text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-gray-100">Who I Am</h2>
        </motion.div>

        {/* Mini stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-12 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-gray-100"><Counter target={s.target} suffix={s.suffix} /></p>
              <p className="text-gray-600 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I&apos;m <span className="text-gray-100 font-semibold">Parth Godhani</span>, a Nanoscience student
              with a deep passion for technology. I self-taught myself full-stack development and AI integration,
              building real-world projects that blend science and software.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              I specialize in building modern web applications using React, Next.js, and Python FastAPI backends
              with AI integrations. I love turning complex ideas into clean, intuitive digital experiences.
            </p>

            {/* Staggered badge reveal */}
            <div className="flex flex-wrap gap-2">
              {techBadges.map((t, i) => (
                <motion.span key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="text-sm glass px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:border-gray-500/50 transition-colors duration-200 cursor-default">
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Skill bars with pulse */}
          <div className="space-y-5">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
