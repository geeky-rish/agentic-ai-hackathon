"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const workshops = [
  {
    number: "01",
    title: "Agentic AI Overview",
    items: [
      "Agents, architecture, workflows, lifecycle",
      "Real-world use cases + demo",
    ],
  },
  {
    number: "02",
    title: "RAG, LangChain & MCP",
    items: [
      "RAG basics, pipelines, frameworks",
      "MCP systems + demo",
    ],
  },
  {
    number: "03",
    title: "Multi-Agent Systems (MAS)",
    items: [
      "LangGraph & AutoGen",
      "Distributed agent systems",
    ],
  },
  {
    number: "04",
    title: "Learning Agents (RL)",
    items: [
      "RL intuition",
      "Adaptive intelligent agents",
    ],
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
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[600px] rounded-full bg-red-500/4 blur-[180px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/3 blur-[150px]" />

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
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-white/10" />
          <motion.div
            className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-accent via-purple-500 to-indigo-500 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Mobile connecting line */}
          <div className="lg:hidden absolute top-6 bottom-6 left-6 w-px bg-white/10" />
          <motion.div
            className="lg:hidden absolute top-6 bottom-6 left-6 w-[2px] bg-gradient-to-b from-accent via-purple-500 to-indigo-500 origin-top"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {workshops.map((ws, i) => (
              <motion.div
                key={ws.number}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={stagger}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                className="relative flex flex-col lg:items-center group"
              >
                {/* Timeline node */}
                <div className="absolute left-0 lg:static lg:mx-auto w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/10 bg-[#0A0A0D] flex items-center justify-center text-base md:text-lg font-black text-white/40 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] transition-all duration-300 z-10 shrink-0">
                  {ws.number}
                </div>

                {/* Card Content */}
                <div className="ml-16 lg:ml-0 lg:mt-8 card-vibrant p-6 flex-1 w-full flex flex-col text-left">
                  <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                    {ws.title}
                  </h3>
                  <div className="space-y-4 flex-1">
                    {ws.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-accent/60 mt-[3px] text-[10px] flex-shrink-0">✦</span>
                        <span className="text-sm text-muted leading-relaxed font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Progressive fade bottom line */}
                  <div className="mt-8 h-[2px] w-full bg-white/[0.03] overflow-hidden rounded-full">
                    <div className="h-full w-4 group-hover:w-full bg-gradient-to-r from-accent to-purple-500 transition-all duration-500 ease-out" />
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
