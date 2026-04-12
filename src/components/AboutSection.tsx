"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Bot, Cpu, Zap, UserPlus, Star, Trophy, Sparkles } from "lucide-react";
import AgentDemo from "./AgentDemo";

const highlights = [
  { 
    number: "01", 
    title: "Autonomous Agents", 
    description: "Self-governing AI that perceives, decides, and acts independently — beyond simple chatbots.", 
    color: "text-red-400",
    icon: <Bot className="w-8 h-8" />
  },
  { 
    number: "02", 
    title: "Multi-Agent Systems", 
    description: "Multiple AI agents collaborating, negotiating, and orchestrating complex real-world tasks.", 
    color: "text-purple-400",
    icon: <Cpu className="w-8 h-8" />
  },
  { 
    number: "03", 
    title: "Real-World Impact", 
    description: "Solutions across healthcare, finance, logistics — where agentic AI is transforming industries.", 
    color: "text-indigo-400",
    icon: <Zap className="w-8 h-8" />
  },
];

const steps = [
  { 
    number: "01", 
    title: "Register & Choose Theme", 
    description: "Form your team, pick a theme, and sign up via the portal.",
    icon: <UserPlus className="w-6 h-6" />,
    glow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
  },
  { 
    number: "02", 
    title: "Get Shortlisted", 
    description: "Our team reviews and selects the most innovative agent concepts.",
    icon: <Star className="w-6 h-6" />,
    glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
  },
  { 
    number: "03", 
    title: "Attend & Compete", 
    description: "Two days of high-intensity building. Build, present, win.",
    icon: <Trophy className="w-6 h-6" />,
    glow: "group-hover:shadow-[0_0_20px_rgba(79,70,229,0.3)]"
  },
];

const stagger: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-28 md:py-36 bg-vibrant-1 overflow-hidden">
      <div className="grid-bg" />
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-red-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div ref={ref} className="container-main relative z-10">
        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5">
            <span className="label-tag mb-8 inline-flex">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
              About the Event
            </span>
            <h2 className="section-heading text-foreground mb-4">
              What is<br/><span className="gradient-text-vibrant">Agentic AI</span>?
            </h2>
            <div className="accent-line mb-8" />
            <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Agentic AI represents a paradigm shift — AI systems that don&apos;t just respond to
              prompts, but autonomously plan, reason, and execute multi-step tasks.
            </p>
            <div className="card-vibrant p-5">
              <p className="text-sm text-muted leading-relaxed">
                <span className="text-accent font-bold text-base">Beyond chatbots</span>{" "}
                → Real autonomous systems that perceive, decide, and act in the real world.
              </p>
            </div>
          </motion.div>

          {/* Right — animated AI visual */}
          <motion.div initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
              {/* Central Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-red-500/10 via-purple-500/10 to-indigo-500/10 border border-white/10 flex items-center justify-center animate-glow-pulse relative">
                  <div className="absolute inset-0 bg-red-500/5 blur-2xl rounded-full" />
                  <Bot className="w-16 h-16 md:w-20 md:h-20 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                  {/* Scanning rings */}
                  <div className="absolute inset-2 rounded-full border border-white/5 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-4 rounded-full border border-white/5 animate-ping" style={{ animationDuration: '4s' }} />
                </div>
              </div>

              {/* Orbiting Agent Nodes */}
              {[
                { label: "Perceive", delay: "0s", color: "from-red-500 to-pink-500", icon: <Sparkles size={12} /> },
                { label: "Decide", delay: "-3s", color: "from-purple-500 to-indigo-500", icon: <Cpu size={12} /> },
                { label: "Act", delay: "-6s", color: "from-indigo-500 to-cyan-500", icon: <Zap size={12} /> },
              ].map((node, i) => (
                <div key={node.label} className="absolute inset-0"
                  style={{ animation: `orbit ${9 + i}s linear infinite`, animationDelay: node.delay }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${node.color} p-[1px] shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-black rounded-[11px] flex items-center justify-center text-white">
                        {node.icon}
                      </div>
                    </div>
                    <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 bg-black/60 backdrop-blur-md text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity`}>
                      {node.label}
                    </div>
                  </div>
                </div>
              ))}

              {/* Connecting Lines / Decorative Paths */}
              <div className="absolute inset-0 rounded-full border border-white/[0.03] animate-spin-slow pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-white/[0.02] animate-reverse-spin pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/[0.01]" />
            </div>
          </motion.div>
        </div>

        {/* Feature cards — staggered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {highlights.map((item, i) => (
            <motion.div key={item.number} custom={i} initial="hidden"
              whileInView="visible" viewport={{ once: true }} variants={stagger}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="card-vibrant p-8 group cursor-default relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                {item.icon}
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.color} group-hover:bg-white/10 transition-colors`}>
                  {item.icon}
                </div>
                <span className="text-sm font-mono text-gray-500 tracking-tighter">{item.number}</span>
              </div>
              <h3 className={`text-xl font-bold text-foreground mb-3 group-hover:${item.color} transition-colors duration-300`}>{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Agent Demo */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }} className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
              LIVE <span className="text-red-500">PROTOCOL</span> DEMO
            </h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <AgentDemo />
        </motion.div>

        {/* Steps */}
        <div className="mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-4 mb-2">
            <span className="w-12 h-1 bg-red-500" />
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase font-mono">
              HOW TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500">PARTICIPATE</span>
            </h3>
          </motion.div>
          <p className="text-gray-500 font-mono text-xs md:text-sm ml-16 tracking-widest uppercase">Follow the deployment sequence to join the mission.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-red-500/20 via-purple-500/20 to-indigo-500/20 -z-0" />
          
          {steps.map((step, i) => (
            <motion.div key={step.number} custom={i} initial="hidden"
              whileInView="visible" viewport={{ once: true }} variants={stagger}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="card-vibrant p-8 group relative z-10 transition-all duration-300 hover:border-white/30">
              <div className={`absolute -inset-0.5 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10`} />
              
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-all duration-500 ${step.glow}`}>
                  {step.icon}
                </div>
                <div className="text-5xl font-black text-white/[0.04] group-hover:text-white/[0.08] transition-colors select-none">
                  {step.number}
                </div>
              </div>
              
              <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {step.title}
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed font-mono">{step.description}</p>
              
              <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-px w-8 bg-white/20" />
                <span className="text-[10px] text-gray-500 tracking-[0.3em] font-black uppercase">Phase Active</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
