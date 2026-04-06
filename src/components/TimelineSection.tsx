"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  {
    day: "Day 1",
    date: "April 25, 2026",
    label: "Learning & Preparation",
    events: [
      { time: "09:00 – 11:00", title: "Introduction to Agentic AI", desc: "Foundations & core concepts" },
      { time: "11:30 – 13:30", title: "Multi-Agent Systems", desc: "Collaboration & communication" },
      { time: "14:30 – 16:30", title: "Agent Architecture Patterns", desc: "Design patterns & best practices" },
      { time: "17:00 – 19:00", title: "LangChain & LangGraph", desc: "Hands-on framework workshop" },
      { time: "19:30", title: "Problem Statements Released", desc: "Hackathon kickoff briefing", highlight: true },
    ],
  },
  {
    day: "Day 2",
    date: "April 26, 2026",
    label: "Hackathon Execution",
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[200px]" />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium text-accent mb-6 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            Schedule
          </div>
          <h2 className="section-title mb-6">
            <span className="text-foreground">Event </span>
            <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-lg text-foreground/60">
            Two packed days of learning, building, and competing.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent-secondary/20 to-accent/20" />

          {timelineData.map((day, dayIdx) => (
            <div key={day.day} className={dayIdx > 0 ? "mt-16" : ""}>
              {/* Day header */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: dayIdx * 0.3 }}
                className="relative flex items-center mb-10"
              >
                {/* Dot */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-accent-muted to-accent-secondary glow-cyan z-10" />
                {/* Label */}
                <div className="ml-14 md:ml-0 md:absolute md:left-1/2 md:translate-x-6 glass px-5 py-2 rounded-full">
                  <span className="text-sm font-bold gradient-text">{day.day}</span>
                  <span className="text-xs text-foreground/50 ml-2">{day.date}</span>
                  <span className="text-xs text-foreground/40 ml-2">— {day.label}</span>
                </div>
              </motion.div>

              {/* Events */}
              {day.events.map((event, eventIdx) => {
                const isLeft = eventIdx % 2 === 0;
                return (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: dayIdx * 0.3 + eventIdx * 0.1,
                    }}
                    className="relative mb-8 flex items-start"
                  >
                    {/* Dot */}
                    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-white/10 border-2 border-accent/30 z-10" />

                    {/* Card - mobile always right, desktop alternates */}
                    <div
                      className={`ml-14 md:ml-0 md:w-[calc(50%-32px)] ${
                        isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                      }`}
                    >
                      <div
                        className={`glass-card p-5 ${
                          event.highlight
                            ? "border-accent/15 shadow-lg shadow-accent/5"
                            : ""
                        }`}
                      >
                        <span className="text-xs font-mono text-accent/70">
                          {event.time}
                        </span>
                        <h4 className="text-base font-bold text-foreground mt-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-foreground/50 mt-1">
                          {event.desc}
                        </p>
                        {event.highlight && (
                          <span className="inline-block mt-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-accent/8 text-accent border border-accent/15">
                            Highlight
                          </span>
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
