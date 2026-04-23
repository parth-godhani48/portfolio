"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const socials = [
  { label: "Email",    value: "godhaniparth055@example.com",  href: "mailto:parth@example.com", icon: "✉️" },
  { label: "GitHub",   value: "https://github.com/parth-godhani48",     href: "https://github.com",       icon: "🐙" },
  { label: "LinkedIn", value: "https://www.linkedin.com/in/parth-godhani-355187394/", href: "https://linkedin.com",     icon: "💼" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputCls = "w-full glass px-4 py-3 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gray-500/60 transition-all duration-200 bg-transparent";

  return (
    <section id="contact" className="py-24 relative bg-[#020817]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-gray-500 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3 text-gray-100">Let&apos;s Work Together</h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s build something great.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
            <h3 className="text-xl font-bold mb-6 text-gray-100">Contact Info</h3>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 glass p-4 rounded-xl hover:border-gray-500/40 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 group">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wider">{s.label}</p>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-gray-100 transition-colors">{s.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Your Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required className={inputCls} />
            <input type="email" placeholder="Your Email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required className={inputCls} />
            <textarea rows={5} placeholder="Your Message" value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })} required
              className={`${inputCls} resize-none`} />
            <button type="submit" disabled={status === "sending"}
              className="w-full bg-[#1f2937] hover:bg-[#374151] text-gray-100 font-semibold py-3 rounded-xl border border-gray-700/60 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
              {status === "sending" && "⏳ Sending..."}
              {status === "sent"    && "✅ Message Sent!"}
              {status === "error"   && "❌ Failed — Try Again"}
              {status === "idle"    && "Send Message →"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
