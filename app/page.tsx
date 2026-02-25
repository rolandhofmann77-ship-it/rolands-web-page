"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const mouse = { x: 0, y: 0 };

    // Canvas füllen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 60 Nodes erstellen
    for (let i = 0; i < 60; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    const animate = () => {
      // HINTERGRUND DUNKLER (für bessere Sichtbarkeit der Nodes)
      ctx.fillStyle = "rgba(2, 6, 23, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nodes bewegen
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce an Rändern
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Zurück in Bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Mouse repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          node.vx += (dx / dist) * 0.25;
          node.vy += (dy / dist) * 0.25;
        }

        // HELLE, PULSIERENDE NODES (erhöhte Opazität)
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.95 + Math.sin(Date.now() * 0.008 + node.x * 0.01) * 0.05})`;
        ctx.fill();

        // Node Glow (zusätzlicher Helligkeitseffekt)
        ctx.shadowColor = "rgba(34, 211, 238, 0.8)";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.6 + Math.sin(Date.now() * 0.01 + node.y * 0.01) * 0.3})`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // HELLERE VERBINDUNGEN
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.5 * (1 - dist / 200)})`;
            ctx.lineWidth = 1.5 + (1 - dist / 200) * 0.8;
            ctx.stroke();

            // Glow für Verbindungen
            ctx.shadowColor = "rgba(56, 189, 248, 0.4)";
            ctx.shadowBlur = 4;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* NEURONALES NETZ - JETZT HELLER UND SICHTBARER */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "#020617" }}
      />
      
      <div className="relative min-h-screen bg-gradient-to-b from-slate-950/85 via-black/90 to-slate-950/85 text-white">
        {/* Glow Overlay (etwas reduziert für Netz-Sichtbarkeit) */}
        <div className="pointer-events-none fixed inset-0 z-10 mix-blend-soft-light opacity-[0.15]">
          <div className="h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.3),_transparent_70%)]" />
        </div>

        <main className="relative z-20 mx-auto max-w-5xl px-6 py-24 space-y-32">
          {/* HERO */}
          <section className="mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-semibold tracking-tight"
            >
              Hi, ich bin{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500 bg-clip-text text-transparent">
                Roland
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg text-slate-300 leading-relaxed"
            >
              Informatiker mit Fokus auf saubere Architektur, performante
              Webanwendungen und durchdachtes UI Design. Ich verbinde Technik
              mit Ästhetik.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: "0 20px 40px rgba(34, 211, 238, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="group rounded-xl bg-transparent border border-cyan-400/80 px-8 py-4 font-medium text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/90 hover:to-blue-500/90 hover:text-slate-950 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">Projekte ansehen</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 transform -skew-x-12 -translate-x-20 group-hover:translate-x-0 transition-transform duration-700" />
              </motion.a>

              <motion.a
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  rotateX: 5,
                  rotateY: 2
                }}
                whileTap={{ scale: 0.98 }}
                href="mailto:roland@example.com"
                className="group rounded-xl border border-slate-700/80 px-8 py-4 text-slate-100 hover:bg-slate-800/50 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden"
              >
                <span className="relative z-10">Kontakt</span>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-300/10 to-transparent transform translate-x-0 group-hover:translate-x-full transition-transform duration-500" />
              </motion.a>
            </motion.div>
          </section>

          {/* TECH STACK */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-semibold mb-8">Tech Stack</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "TypeScript",
                "Next.js",
                "React",
                "Node.js",
                "Tailwind CSS",
                "PostgreSQL",
                "Docker",
                "Linux",
              ].map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    scale: 1.05,
                    rotateX: 5,
                    boxShadow: "0 25px 50px rgba(34, 211, 238, 0.25)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17,
                    delay: i * 0.05 
                  }}
                  className="group rounded-2xl bg-slate-900/60 backdrop-blur-xl p-6 text-center border border-slate-800/70 hover:border-cyan-400/80 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative">
                    <span className="relative z-10 font-medium group-hover:text-cyan-300 transition-colors duration-300">
                      {tech}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-blue-400/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PROJECTS */}
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-semibold mb-8">Projekte</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Fullstack Web App",
                  desc: "Next.js App mit Auth, API, PostgreSQL & sauberer Architektur.",
                },
                {
                  title: "DevOps Setup",
                  desc: "Docker, CI/CD Pipeline & Cloud Deployment Setup.",
                },
              ].map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.02,
                    rotateX: 3,
                    boxShadow: "0 35px 70px rgba(34, 211, 238, 0.4)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17,
                    delay: i * 0.15 
                  }}
                  className="group/card rounded-2xl bg-slate-900/60 backdrop-blur-xl p-8 border border-slate-800/70 hover:border-cyan-400/80 transition-all duration-500 cursor-pointer overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 transform -rotate-6 scale-x-110 group-hover/card:scale-100 transition-transform duration-1000" />
                  <h3 className="text-xl font-semibold mb-3 relative z-10 group-hover/card:text-cyan-300 transition-all duration-500">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 relative z-10 leading-relaxed">{project.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FOOTER */}
          <footer className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500">
              © {new Date().getFullYear()} Roland — Informatiker
            </p>

            <div className="flex gap-6">
              <motion.a
                whileHover={{ 
                  scale: 1.3, 
                  rotate: 180,
                  y: -4,
                  boxShadow: "0 10px 25px rgba(34, 211, 238, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="group p-2 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:bg-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300"
              >
                <Github size={20} className="group-hover:text-cyan-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                whileHover={{ 
                  scale: 1.3, 
                  rotate: -180,
                  y: -4,
                  boxShadow: "0 10px 25px rgba(34, 211, 238, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="group p-2 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:bg-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300"
              >
                <Linkedin size={20} className="group-hover:text-cyan-400 transition-colors duration-300" />
              </motion.a>
              <motion.a
                whileHover={{ 
                  scale: 1.3, 
                  rotate: 360,
                  y: -4,
                  boxShadow: "0 10px 25px rgba(34, 211, 238, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                href="mailto:roland@example.com"
                className="group p-2 rounded-lg bg-slate-900/50 border border-slate-700/50 hover:bg-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300"
              >
                <Mail size={20} className="group-hover:text-cyan-400 transition-colors duration-300" />
              </motion.a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
