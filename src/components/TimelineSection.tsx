"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    day: "Day 1", date: "April 25, 2026", label: "Learning & Preparation",
    events: [
      { time: "09:00 – 11:00", title: "Introduction to Agentic AI", desc: "Foundations & core concepts" },
      { time: "11:30 – 13:30", title: "Multi-Agent Systems", desc: "Collaboration & communication" },
      { time: "14:30 – 16:30", title: "Agent Architecture Patterns", desc: "Design patterns & best practices" },
      { time: "17:00 – 19:00", title: "LangChain & LangGraph", desc: "Hands-on framework workshop" },
      { time: "19:30", title: "Hackathon kickoff briefing", desc: "", highlight: true },
    ],
  },
  {
    day: "Day 2", date: "April 26, 2026", label: "Hackathon Execution",
    events: [
      { time: "08:00 – 09:00", title: "Team Setup & Planning", desc: "Finalize approach & architecture" },
      { time: "09:00 – 17:00", title: "Hack Session", desc: "Build your agentic AI solution", highlight: true },
      { time: "17:00 – 18:30", title: "Project Presentations", desc: "Demo to judges & peers" },
      { time: "19:00", title: "Results & Awards Ceremony", desc: "Winners announced & prizes", highlight: true },
    ],
  },
];

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative py-28 md:py-36 bg-vibrant-1 overflow-hidden">
      <div className="grid-bg" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-500/4 blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/3 blur-[150px]" />

      <div ref={ref} className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <span className="label-tag mb-6 inline-flex">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            Schedule
          </span>
          <h2 className="section-heading text-foreground">
            Event <span className="gradient-text-vibrant">Timeline</span>
          </h2>
          <p className="text-muted text-sm md:text-base mt-4 max-w-lg">Two packed days of learning, building, and competing.</p>
        </motion.div>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />
          <motion.div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 w-px bg-gradient-to-b from-accent via-purple-500 to-indigo-500" style={{ height: lineHeight }} />

          {timelineData.map((day, dayIdx) => (
            <div key={day.day} className={dayIdx > 0 ? "mt-16" : ""}>
              <motion.div initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: dayIdx * 0.2 }}
                className="relative flex items-center mb-10">
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-accent z-10 shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
                <div className="ml-14 md:ml-0 md:absolute md:left-1/2 md:translate-x-6 card-vibrant px-5 py-2 rounded-full inline-flex items-center gap-3">
                  <span className="text-sm font-bold text-accent">{day.day}</span>
                  <span className="text-xs text-muted">{day.date}</span>
                  <span className="hidden sm:inline text-xs text-muted/60">— {day.label}</span>
                </div>
              </motion.div>

              {day.events.map((event, eventIdx) => {
                const isLeft = eventIdx % 2 === 0;
                return (
                  <motion.div key={event.title}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30, filter: "blur(4px)" }}
                    animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.4, delay: dayIdx * 0.2 + eventIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-6 flex items-start">
                    <div className={`absolute left-5 md:left-1/2 -translate-x-1/2 top-3 w-2.5 h-2.5 rounded-full border-2 z-10 ${event.highlight ? "bg-accent border-transparent shadow-[0_0_8px_rgba(239,68,68,0.3)]" : "bg-background border-white/20"}`} />
                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-28px)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                      <div className={`card-vibrant p-5 group transition-all duration-300 ${event.highlight ? "border-accent/15" : ""}`}>
                        <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{event.time}</span>
                        <h4 className="text-sm font-bold text-foreground mt-1 group-hover:text-accent transition-colors duration-200">{event.title}</h4>
                        {event.desc && <p className="text-xs text-muted mt-0.5">{event.desc}</p>}
                        {event.highlight && (
                          <span className="inline-block mt-2 text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/15">★ Highlight</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
