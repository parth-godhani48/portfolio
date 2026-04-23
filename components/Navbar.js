"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["Home", "About", "Projects", "Services", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#020817]/90 backdrop-blur-md border-b border-gray-800/60 shadow-lg shadow-black/20" : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <motion.a href="#home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold text-gradient">
          PG<span className="text-gray-500">.</span>
        </motion.a>

        <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`}
                className="text-gray-400 hover:text-gray-100 transition-colors duration-200 text-sm font-medium">
                {link}
              </a>
            </li>
          ))}
        </motion.ul>

        <motion.a href="#contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="hidden md:inline-flex items-center gap-2 bg-[#1f2937] hover:bg-[#374151] text-gray-100 text-sm font-semibold px-5 py-2 rounded-lg border border-gray-700/60 transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-black/30">
          Hire Me
        </motion.a>

        <button className="md:hidden text-gray-400 hover:text-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-6 h-0.5 bg-current mb-1.5" />
          <span className="block w-4 h-0.5 bg-current" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111827] border-t border-gray-800/60">
            <ul className="flex flex-col px-6 py-4 gap-4">
              {links.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                    className="text-gray-400 hover:text-gray-100 transition-colors text-sm font-medium">
                    {link}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  className="inline-block bg-[#1f2937] border border-gray-700/60 text-gray-100 text-sm font-semibold px-5 py-2 rounded-lg">
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
