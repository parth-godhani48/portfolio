"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  { title: "LuxWheel",   desc: "LuxWheel is a backend API project built using FastAPI that manages users, cars, and payment details. It provides structured REST APIs for handling car-related services with database integration using SQLAlchemy.", tech: ["Python", "OpenAI API", "FastAPI", "MongoDB"],  github: "https://github.com/parth-godhani48/LuxWheel.git", live: "#", image: "https://imgs.search.brave.com/4GTeGL1qK0mTzB-TaUHhzNdL2ksPMpkpxCFW8Afbm88/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9oaWdo/d2F5LWxvdHMtY2Fy/cy0yNzE2MzMzLmpw/Zw" },
  { title: "SeeBlank", desc: "This project is a backend application developed using FastAPI that provides APIs to manage users, cars, and payment information. It uses a structured architecture with database integration to handle core functionalities of a car service platform.",                       tech: ["Python", "OpenAI API", "Stripe", "PostgreSQL"],      github: "https://github.com/parth-godhani48/SeeBlank.git", live: "#", image: "https://imgs.search.brave.com/qcbdmiEY6h_Dd925dTdUFnfvSvfj6x0JFl-EjAo_khU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk56STRZamt5/T0RjdE1HSm1OQzAw/WWpCakxUbGxOakF0/TkRreE5USm1aamc0/TUdaa1hrRXlYa0Zx/Y0djQC5qcGc" },
  { title: "Portfolio Website",   desc: "This very portfolio — built with Next.js, Tailwind CSS, and Framer Motion for smooth animations.",                   tech: ["Next.js", "Tailwind CSS", "Framer Motion"],  live: "", image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?auto=format&fit=crop&w=800&q=80" },
  { title: "Task Management App", desc: "Kanban-style task manager with drag-and-drop, team collaboration, and real-time updates.",                           tech: ["React", "Firebase", "Tailwind", "DnD Kit"],      github: "#", live: "#", image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80" },
];

function ProjectCard({ p, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative glass rounded-3xl overflow-hidden group hover:border-gray-600/40 hover:shadow-2xl hover:shadow-black/40 transition-all duration-500 flex flex-col"
    >
      {/* Border beam on hover */}
      {hovered && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute pointer-events-none"
          style={{
            inset: -1, borderRadius: "1.5rem", zIndex: 10,
            background: "conic-gradient(from 0deg, transparent 0%, rgba(156,163,175,0.5) 20%, transparent 40%)",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />
      )}

      <div className="relative h-56 w-full overflow-hidden bg-[#0d1117] border-b border-gray-800/60">
        <motion.img
          src={p.image} alt={p.title}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-75"
          animate={hovered ? { scale: 1.08 } : { scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
        <motion.div
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-[#111827]/60 backdrop-blur-sm">
          <motion.div
            animate={hovered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center">
            <span className="text-gray-400 font-semibold tracking-widest uppercase text-xs mb-2 block">Explore Project</span>
            <h3 className="text-xl font-black text-gray-100 px-4">{p.title}</h3>
          </motion.div>
        </motion.div>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-white transition-colors">{p.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>

        {/* Staggered tech badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {p.tech.map((t, ti) => (
            <motion.span key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.1 + ti * 0.06, type: "spring", stiffness: 220 }}
              className="text-xs font-medium bg-gray-800/80 text-gray-400 px-3 py-1 rounded-full border border-gray-700/60">
              {t}
            </motion.span>
          ))}
        </div>

        <div className="flex gap-3">
          <a href={p.github}
            className="flex-1 text-center text-sm font-semibold glass py-2.5 rounded-xl hover:border-gray-500/50 hover:text-gray-100 text-gray-400 transition-all duration-200 flex items-center justify-center gap-1.5 group/btn">
            <span>GitHub</span><span className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">↗</span>
          </a>
          <a href={p.live}
            className="flex-1 text-center text-sm font-semibold bg-[#1f2937] hover:bg-[#374151] text-gray-100 py-2.5 rounded-xl border border-gray-700/60 transition-all duration-200 hover:shadow-md hover:shadow-black/30 flex items-center justify-center gap-1.5 group/btn">
            <span>Live Demo</span><span className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform">↗</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-[#020817]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-gray-500 text-sm font-semibold tracking-widest uppercase">My Work</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-gray-100">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
