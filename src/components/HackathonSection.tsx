"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const prizes = [
  {
    rank: "1st",
    label: "First Prize",
    amount: "₹15,000",
    icon: "🏆",
    gradient: "from-amber-300/90 via-yellow-200/80 to-amber-400/90",
    glow: "shadow-amber-400/10",
    border: "border-amber-400/15",
    bg: "from-amber-400/5 to-amber-600/3",
  },
  {
    rank: "2nd",
    label: "Second Prize",
    amount: "₹10,000",
    icon: "🥈",
    gradient: "from-slate-300/80 via-gray-200/70 to-slate-400/80",
    glow: "shadow-slate-300/10",
    border: "border-slate-300/15",
    bg: "from-slate-300/5 to-slate-500/3",
  },
  {
    rank: "3rd",
    label: "Third Prize",
    amount: "₹5,000",
    icon: "🥉",
    gradient: "from-amber-600/80 via-orange-400/70 to-amber-700/80",
    glow: "shadow-orange-400/10",
    border: "border-orange-400/15",
    bg: "from-orange-400/5 to-orange-600/3",
  },
];

export default function HackathonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="hackathon" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-accent-secondary/3 blur-[200px]" />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium text-accent mb-6 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            Day 2 — April 26, 2026
          </div>
          <h2 className="section-title mb-6">
            <span className="gradient-text">Build.</span>{" "}
            <span className="text-foreground">Compete.</span>{" "}
            <span className="gradient-text">Win.</span>
          </h2>
          <p className="text-lg text-foreground/60 leading-relaxed">
            Problem statements are released at the end of Day 1. On Day 2, teams dive deep into
            building innovative solutions using agentic AI frameworks. Present your project, impress
            the judges, and win exciting prizes.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {[
            { step: "01", text: "Problem statements revealed" },
            { step: "02", text: "Teams brainstorm & plan" },
            { step: "03", text: "Build your AI solution" },
            { step: "04", text: "Present & compete" },
          ].map((item, i) => (
            <div
              key={item.step}
              className="glass-card px-5 py-3 flex items-center gap-3"
            >
              <span className="text-xs font-bold text-accent">{item.step}</span>
              <span className="text-sm text-foreground/70">{item.text}</span>
              {i < 3 && (
                <span className="text-foreground/20 hidden sm:inline">→</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Prize Pool Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Prize Pool
          </h3>
          <p className="text-4xl md:text-5xl font-black gradient-text">
            ₹30,000+
          </p>
        </motion.div>

        {/* Prize Cards — Podium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
          {prizes.map((prize, i) => {
            // Podium order: 2nd (left) → 1st (center) → 3rd (right)
            const podiumOrder = i === 0 ? 'md:order-2' : i === 1 ? 'md:order-1' : 'md:order-3';

            return (
              <motion.div
                key={prize.rank}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className={`glass-card p-8 text-center relative overflow-hidden border ${prize.border} shadow-lg ${prize.glow} ${podiumOrder}`}
              >
                {/* Glow background */}
                <div className={`absolute inset-0 bg-gradient-to-b ${prize.bg} opacity-50`} />

                <div className="relative z-10">
                  <span className="text-5xl mb-4 block">{prize.icon}</span>
                  <span className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${prize.gradient} bg-clip-text text-transparent`}>
                    {prize.label}
                  </span>
                  <div className={`text-4xl md:text-5xl font-black mt-3 bg-gradient-to-r ${prize.gradient} bg-clip-text text-transparent`}>
                    {prize.amount}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
