"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const prizes = [
  { rank: "1st", label: "First Prize", amount: "₹15,000", icon: "🏆", glow: "shadow-amber-500/10", border: "border-amber-500/20 hover:border-amber-500/40", gradient: "from-amber-300 to-yellow-500" },
  { rank: "2nd", label: "Second Prize", amount: "₹10,000", icon: "🥈", glow: "shadow-slate-400/10", border: "border-slate-400/20 hover:border-slate-400/40", gradient: "from-slate-300 to-gray-400" },
  { rank: "3rd", label: "Third Prize", amount: "₹5,000", icon: "🥉", glow: "shadow-orange-500/10", border: "border-orange-500/20 hover:border-orange-500/40", gradient: "from-orange-400 to-amber-600" },
];

const themes = [
  { name: "Finance & Business", icon: "💰" },
  { name: "Recruitment & Hiring", icon: "🤝" },
  { name: "Education Intelligence", icon: "🎓" },
  { name: "Coding & Debugging", icon: "💻" },
  { name: "Industry 4.0", icon: "🏭" },
  { name: "Healthcare & Wellbeing", icon: "🏥" },
  { name: "Cybersecurity", icon: "🔒" },
  { name: "Assistive AI", icon: "♿" },
];

const evaluationCriteria = [
  { name: "Innovation", percentage: 25, color: "#EF4444" },
  { name: "Functionality", percentage: 30, color: "#A855F7" },
  { name: "Agent Behavior", percentage: 25, color: "#6366F1" },
  { name: "Presentation", percentage: 20, color: "#F87171" },
];

const whyParticipate = [
  { title: "Build with AI", description: "Hands-on experience building autonomous AI agents with cutting-edge frameworks." },
  { title: "Industry Skills", description: "Learn techniques in high demand across the AI industry." },
  { title: "Build Portfolio", description: "Create a showcase-worthy project demonstrating AI engineering capabilities." },
  { title: "Network & Connect", description: "Meet innovators, industry experts, and potential collaborators." },
];

const stagger: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function CircularProgress({ percentage, color, size = 90, strokeWidth = 5, isInView, delay = 0 }: { percentage: number; color: string; size?: number; strokeWidth?: number; isInView: boolean; delay?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="circular-progress-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <motion.circle className="circular-progress-fill" cx={size / 2} cy={size / 2} r={radius}
          strokeWidth={strokeWidth} stroke={color} strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-base font-bold text-foreground">{percentage}%</span>
      </div>
    </div>
  );
}

export default function HackathonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const themesRef = useRef(null);
  const themesInView = useInView(themesRef, { once: true, margin: "-50px" });
  const evalRef = useRef(null);
  const evalInView = useInView(evalRef, { once: true, margin: "-50px" });
  const whyRef = useRef(null);
  const whyInView = useInView(whyRef, { once: true, margin: "-50px" });

  return (
    <section id="hackathon" className="relative py-28 md:py-36 bg-vibrant-3 overflow-hidden">
      <div className="grid-bg" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-purple-500/3 blur-[200px]" />

      <div ref={ref} className="container-main relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-14">
          <span className="label-tag mb-6 inline-flex">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            Day 2 — April 26
          </span>
          <h2 className="section-heading text-foreground mb-4">
            Build. Compete. <span className="text-accent">Win.</span>
          </h2>
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-2xl">
            Problem statements released at the end of Day 1. Teams build innovative AI solutions, present to judges, and compete for prizes.
          </p>
        </motion.div>

        {/* Prize Pool */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }} className="mb-10">
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-sm text-muted uppercase tracking-widest font-bold">Prize Pool</span>
            <span className="text-5xl md:text-7xl font-black gradient-text-vibrant">₹30,000+</span>
          </div>
        </motion.div>

        {/* Prize Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-28">
          {prizes.map((prize, i) => (
            <motion.div key={prize.rank} custom={i} initial="hidden"
              animate={isInView ? "visible" : "hidden"} variants={stagger}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className={`card-vibrant p-8 text-center border ${prize.border} ${prize.glow} shadow-lg`}>
              <span className="text-5xl mb-3 block">{prize.icon}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted">{prize.label}</span>
              <div className={`text-3xl md:text-4xl font-black mt-2 bg-gradient-to-r ${prize.gradient} bg-clip-text text-transparent`}>{prize.amount}</div>
            </motion.div>
          ))}
        </div>

        {/* Themes */}
        <div ref={themesRef} className="mb-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={themesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-10">
            <div className="accent-line" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Hackathon <span className="gradient-text-vibrant">Themes</span></h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((theme, i) => (
              <motion.div key={theme.name} custom={i} initial="hidden"
                animate={themesInView ? "visible" : "hidden"} variants={stagger}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                className="card-vibrant p-5 text-center group cursor-default">
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{theme.icon}</div>
                <h4 className="text-xs font-bold text-foreground/80 group-hover:text-accent transition-colors duration-300 uppercase tracking-wide">{theme.name}</h4>
                <div className="mt-3 mx-auto h-[2px] w-0 group-hover:w-10 bg-gradient-to-r from-accent to-purple-500 transition-all duration-400" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Evaluation */}
        <div ref={evalRef} className="mb-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={evalInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-10">
            <div className="accent-line" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Evaluation <span className="text-accent">Criteria</span></h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {evaluationCriteria.map((c, i) => (
              <motion.div key={c.name} custom={i} initial="hidden" animate={evalInView ? "visible" : "hidden"} variants={stagger}
                className="flex flex-col items-center gap-3">
                <CircularProgress percentage={c.percentage} color={c.color} isInView={evalInView} delay={i * 0.12} />
                <span className="text-xs font-bold text-muted text-center uppercase tracking-wider">{c.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Participate */}
        <div ref={whyRef}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-10">
            <div className="accent-line" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">Why <span className="gradient-text-vibrant">Participate?</span></h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyParticipate.map((item, i) => (
              <motion.div key={item.title} custom={i} initial="hidden"
                animate={whyInView ? "visible" : "hidden"} variants={stagger}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="card-vibrant p-6 group relative">
                <div className="text-5xl font-black text-white/[0.03] group-hover:text-accent/10 transition-colors duration-300 mb-3 select-none">{String(i + 1).padStart(2, "0")}</div>
                <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }} className="mt-12">
            <Link href="/register" className="btn-primary"><span>Register Your Team →</span></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
