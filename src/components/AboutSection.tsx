"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const highlights = [
  { number: "01", title: "Autonomous Agents", description: "Self-governing AI that perceives, decides, and acts independently — beyond simple chatbots.", color: "text-red-400" },
  { number: "02", title: "Multi-Agent Systems", description: "Multiple AI agents collaborating, negotiating, and orchestrating complex real-world tasks.", color: "text-purple-400" },
  { number: "03", title: "Real-World Impact", description: "Solutions across healthcare, finance, logistics — where agentic AI is transforming industries.", color: "text-indigo-400" },
];

const steps = [
  { number: "01", title: "Register & Choose Theme", description: "Form your team, pick a theme, sign up." },
  { number: "02", title: "Get Shortlisted", description: "Our team reviews and selects the top teams." },
  { number: "03", title: "Attend & Compete", description: "Two days of sessions and hackathon. Build, present, win." },
];

const stagger = {
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
      {/* Glow */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-purple-500/5 blur-[150px] rounded-full" />

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
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-red-500/15 via-purple-500/10 to-indigo-500/15 border border-red-500/15 flex items-center justify-center animate-glow-pulse">
                  <svg className="w-14 h-14 md:w-18 md:h-18 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
              </div>
              {[
                { label: "Perceive", delay: "0s", color: "bg-red-500/20 border-red-500/20 text-red-300" },
                { label: "Decide", delay: "-2.5s", color: "bg-purple-500/20 border-purple-500/20 text-purple-300" },
                { label: "Act", delay: "-5s", color: "bg-indigo-500/20 border-indigo-500/20 text-indigo-300" },
              ].map((node, i) => (
                <div key={node.label} className="absolute inset-0"
                  style={{ animation: `orbit ${7 + i}s linear infinite`, animationDelay: node.delay }}>
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${node.color} backdrop-blur-sm`}>
                    {node.label}
                  </div>
                </div>
              ))}
              <div className="absolute inset-4 rounded-full border border-red-500/6 animate-glow-pulse" />
              <div className="absolute inset-10 rounded-full border border-purple-500/5" />
              <div className="absolute -inset-4 rounded-full border border-indigo-500/4" />
            </div>
          </motion.div>
        </div>

        {/* Feature cards — staggered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {highlights.map((item, i) => (
            <motion.div key={item.number} custom={i} initial="hidden"
              animate={isInView ? "visible" : "hidden"} variants={stagger}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              className="card-vibrant p-7 group cursor-default">
              <span className="text-4xl font-black text-white/[0.04] group-hover:text-accent/10 transition-colors duration-300 block mb-3 select-none">{item.number}</span>
              <h3 className={`text-lg font-bold text-foreground mb-2 group-hover:${item.color} transition-colors duration-300`}>{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }} className="flex items-center gap-4 mb-10">
          <div className="accent-line" />
          <h3 className="text-xl md:text-2xl font-bold text-foreground">How to <span className="text-accent">Participate</span></h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div key={step.number} custom={i} initial="hidden"
              animate={isInView ? "visible" : "hidden"} variants={stagger}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="card-vibrant p-6 group relative">
              <div className="text-5xl font-black text-white/[0.03] group-hover:text-accent/10 transition-colors duration-300 mb-3 select-none">{step.number}</div>
              <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">{step.title}</h4>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
