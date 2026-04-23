"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  { icon: "", title: "Web Design",     desc: "Clean, modern website UI built with best UX practices and pixel-perfect attention to detail.", tags: ["Next.js", "React", "Tailwind"] },
  { icon: "", title: "Backend APIs",   desc: "High-performance REST APIs built with Python FastAPI, PostgreSQL, and modern async patterns.",  tags: ["FastAPI", "Python", "PostgreSQL"] },
  { icon: "", title: "Landing Pages",  desc: "High-converting landing pages designed to capture leads and drive product growth.",              tags: ["SEO", "Performance", "CRO"] },
  { icon: "", title: "AI Integration", desc: "Integrate AI models and APIs into your product — from OpenAI to custom ML pipelines.",           tags: ["OpenAI", "LangChain", "Python"] },
];

/* Inline border beam — CSS animation approach, no extra file needed */
function BeamCard({ children, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative glass rounded-2xl p-8 group cursor-default hover:border-gray-600/40 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 overflow-hidden"
    >
      {/* Border beam — travels around on hover */}
      {hovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{ inset: -1, borderRadius: "1rem", zIndex: 10 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "conic-gradient(from 0deg, transparent 0%, rgba(156,163,175,0.6) 20%, transparent 40%)",
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
        </motion.div>
      )}
      {children}
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24 relative bg-[#111827]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gray-700/60" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-gray-500 text-sm font-semibold tracking-widest uppercase">What I Do</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-gray-100">Services I Offer</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <BeamCard key={s.title} delay={i * 0.12}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-800/80 text-gray-400 px-3 py-1 rounded-full border border-gray-700/60">
                    {tag}
                  </span>
                ))}
              </div>
            </BeamCard>
          ))}
        </div>
      </div>
    </section>
  );
}
