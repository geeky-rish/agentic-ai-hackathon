"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sessions = [
  {
    number: "01",
    title: "Introduction to Agentic AI",
    description:
      "Dive into the foundational concepts behind agentic AI — understand what makes an AI system truly autonomous, how agents perceive and act upon their environment, and the key differences from traditional AI approaches.",
    duration: "2 Hours",
    color: "from-accent to-accent-muted",
  },
  {
    number: "02",
    title: "Multi-Agent Systems",
    description:
      "Explore how multiple AI agents communicate, coordinate, and collaborate. Learn about agent communication protocols, role assignment, conflict resolution, and emergent collective intelligence.",
    duration: "2 Hours",
    color: "from-accent-muted to-accent-secondary",
  },
  {
    number: "03",
    title: "Agent Architecture Patterns",
    description:
      "Master the design patterns behind robust agentic systems — from ReAct and Plan-and-Execute to tool-use architectures. Understand when and how to apply each pattern for maximum effectiveness.",
    duration: "2 Hours",
    color: "from-accent-secondary to-neon-pink",
  },
  {
    number: "04",
    title: "LangChain & LangGraph",
    description:
      "Get hands-on with the industry's leading agentic frameworks. Build your first agent pipeline using LangChain and orchestrate complex multi-step workflows with LangGraph's stateful graph architecture.",
    duration: "2 Hours",
    color: "from-neon-pink to-accent",
  },
];

export default function SessionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sessions" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[200px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-accent-secondary/3 blur-[150px]" />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium text-accent-secondary mb-6 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse-glow" />
            Day 1 — April 25, 2026
          </div>
          <h2 className="section-title mb-6">
            <span className="text-foreground"> engaging </span>
            <span className="gradient-text">Sessions</span>
          </h2>
          <p className="text-lg text-foreground/60 leading-relaxed">
            Four intensive sessions designed to take you from fundamentals to building
            production-ready agentic systems. Each session is hands-on and project-oriented.
          </p>
        </motion.div>

        {/* Session Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session, i) => (
            <motion.div
              key={session.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="glass-card p-8 group relative overflow-hidden"
            >
              {/* Session number watermark */}
              <span className="absolute -top-4 -right-2 text-[120px] font-black text-white/[0.02] leading-none select-none pointer-events-none group-hover:text-white/[0.04] transition-colors">
                {session.number}
              </span>

              <div className="relative z-10 flex flex-col gap-4">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${session.color} bg-clip-text text-transparent`}>
                    Session {session.number}
                  </span>
                  <span className="text-xs font-medium text-foreground/40 glass px-3 py-1 rounded-full">
                    ⏱ {session.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {session.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {session.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-2 h-0.5 w-full rounded-full overflow-hidden bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
                    className={`h-full bg-gradient-to-r ${session.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total hours badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 text-center"
        >
          <span className="glass px-6 py-3 rounded-full text-sm font-medium text-foreground/60 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500/60 animate-pulse" />
            Total: 8 Hours of Intensive Learning
          </span>
        </motion.div>
      </div>
    </section>
  );
}
