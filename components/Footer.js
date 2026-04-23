"use client";
import { motion } from "framer-motion";

const links   = ["Home", "About", "Projects", "Services", "Contact"];
const socials = [
  { label: "GitHub",   href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter",  href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/60 bg-[#111827] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xl font-bold text-gradient">
            PG<span className="text-gray-600">.</span>
          </motion.span>

          <ul className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`}
                  className="text-gray-500 hover:text-gray-200 text-sm transition-colors duration-200">
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-200 text-sm transition-colors duration-200">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800/40 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Parth Godhani. Built with Next.js &amp; Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
