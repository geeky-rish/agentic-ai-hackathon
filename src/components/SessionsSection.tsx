"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Database, Network, Brain, ArrowRight } from "lucide-react";

const workshops = [
  {
    number: "S1",
    title: "Agentic AI Overview",
    icon: <BookOpen className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]",
    items: [
      "Agents, architecture, workflows, and lifecycle.",
      "Real-world use cases + hands-on demo.",
    ],
    outcome: "Agent Fundamentals"
  },
  {
    number: "S2",
    title: "RAG, Langchain and MCP",
    icon: <Database className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    items: [
      "RAG basics, agent frameworks, and pipelines.",
      "MCPs in agent systems + hands-on demo.",
    ],
    outcome: "Data-Driven Intelligence"
  },
  {
    number: "S3",
    title: "Multi-Agent Systems (MAS)",
    icon: <Network className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    items: [
      "Designing MAS with LangGraph & AutoGen.",
      "Distributed agents + hands-on demo.",
    ],
    outcome: "Collaborative Swarms"
  },
  {
    number: "S4",
    title: "Learning Agents (RL)",
    icon: <Brain className="w-6 h-6" />,
    color: "from-emerald-400 to-cyan-500",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.2)]",
    items: [
      "RL intuition and adaptive agents.",
      "Hands-on demo.",
    ],
    outcome: "Evolving Intelligence"
  },
];

const stagger: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SessionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sessions" className="relative py-28 md:py-36 bg-vibrant-2 overflow-hidden">
      {/* Background decorations */}
      <div className="grid-bg" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full bg-red-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-purple-500/[0.02] blur-[200px] pointer-events-none" />

      <div ref={ref} className="container-main relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-6"
          >
            <span className="label-tag mb-6 inline-flex">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse-dot" />
              Pre-Hackathon Journey
            </span>
            <h2 className="section-heading text-foreground tracking-tight">
              Day 1:<br />
              <span className="gradient-text-vibrant">Workshop Experience</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-6 flex items-end"
          >
            <p className="text-muted text-sm md:text-lg leading-relaxed max-w-lg mb-2">
              A guided learning journey taking you from foundational concepts to advanced intelligent systems. By the end of these sessions, you will be well-equipped to build highly capable agents for the hackathon.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16 mt-4"
        >
          <div className="accent-line" />
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative mt-8 md:mt-20">
          {/* Desktop connecting line with flow dot */}
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-white/10" />
          <motion.div
            className="hidden lg:block absolute top-[27px] left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          >
            {/* Pulsing data packet (Desktop) */}
            <motion.div 
              className="absolute top-[-4px] left-0 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_#fff]"
              animate={{ left: "100%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
 
          {/* Mobile connecting line with flow dot */}
          <div className="lg:hidden absolute top-6 bottom-6 left-6 w-px bg-white/10" />
          <motion.div
            className="lg:hidden absolute top-6 bottom-6 left-6 w-[2px] bg-gradient-to-b from-red-500 via-purple-500 to-indigo-500 origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          >
            {/* Pulsing data packet (Mobile) */}
            <motion.div 
              className="absolute left-[-4px] top-0 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_#fff]"
              animate={{ top: "100%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {workshops.map((ws, i) => (
              <motion.div
                key={ws.number}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={stagger}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative flex flex-col lg:items-center group"
              >
                {/* Timeline node */}
                <div className={`relative mb-8 lg:mb-12 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-xl font-black text-white/20 group-hover:border-white group-hover:text-white group-hover:rotate-6 transition-all duration-500 z-10 shrink-0 ${ws.glow}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  {ws.number}
                </div>
 
                {/* Card Content */}
                <div className="ml-16 lg:ml-0 card-vibrant p-1 p-[1px] bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all rounded-3xl w-full flex-1">
                  <div className="bg-[#09090b]/90 backdrop-blur-2xl rounded-[23px] p-7 md:p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ws.color} p-[1px]`}>
                        <div className="w-full h-full bg-black/40 backdrop-blur-md rounded-[11px] flex items-center justify-center text-white">
                          {ws.icon}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-white transition-colors duration-300">
                      {ws.title}
                    </h3>

                    <div className="space-y-4 flex-1">
                      {ws.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 group/item">
                          <div className={`mt-[6px] w-1.5 h-1.5 rounded-full bg-gradient-to-r ${ws.color} group-hover/item:scale-125 transition-transform`} />
                          <span className="text-sm text-gray-400 group-hover/item:text-gray-200 transition-colors leading-relaxed font-mono">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Badge */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Key Outcome</span>
                        <span className="text-xs text-white font-bold">{ws.outcome}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-white/10 transition-all">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
