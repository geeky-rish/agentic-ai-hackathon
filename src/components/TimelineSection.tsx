"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, BookOpen, Users, Code2, Presentation, Trophy, Rocket, Coffee } from "lucide-react";

const neonColors = [
  { bg: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-400", glow: "rgba(16,185,129,0.5)", shadow: "shadow-emerald-500/30" },
  { bg: "bg-cyan-400",    border: "border-cyan-400",    text: "text-cyan-400",    glow: "rgba(34,211,238,0.5)", shadow: "shadow-cyan-400/30" },
  { bg: "bg-purple-500",  border: "border-purple-500",  text: "text-purple-400",  glow: "rgba(168,85,247,0.5)", shadow: "shadow-purple-500/30" },
  { bg: "bg-red-500",     border: "border-red-500",     text: "text-red-400",     glow: "rgba(239,68,68,0.5)",  shadow: "shadow-red-500/30" },
  { bg: "bg-amber-500",   border: "border-amber-500",   text: "text-amber-400",   glow: "rgba(245,158,11,0.5)", shadow: "shadow-amber-500/30" },
];

const timelineData = [
  {
    day: "DAY 1",
    date: "25 APR 2026",
    label: "Learn and Prepare",
    color: neonColors[2],
    events: [
      { time: "Phase 1", title: "Opening Ceremony", desc: "Welcome and kickoff briefing.", icon: <Rocket size={18} />, highlight: false },
      { time: "Phase 2", title: "4 Workshop Sessions", desc: "Deep dive learning sessions on Agentic AI.", icon: <BookOpen size={18} />, highlight: false },
      { time: "Phase 3", title: "Problem Statements Freezed", desc: "Themes locked for teams to begin brainstorming.", icon: <Zap size={18} />, highlight: true },
    ],
  },
  {
    day: "DAY 2",
    date: "26 APR 2026",
    label: "Build and Compete",
    color: neonColors[0],
    events: [
      { time: "Phase 1", title: "8-Hour Hackathon Sprint", desc: "Intense coding and building. Ship your AI agent!", icon: <Code2 size={18} />, highlight: true },
      { time: "Phase 2", title: "Evaluation by Industry Experts", desc: "Pitch and demonstrate your agents to the judges.", icon: <Presentation size={18} />, highlight: false },
      { time: "Phase 3", title: "Prize and Closing Ceremony", desc: "Winners announced, prizes distributed & celebration.", icon: <Trophy size={18} />, highlight: true },
    ],
  },
];

export default function TimelineSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 px-6 md:px-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-white mb-6 inline-block relative hover:text-cyan-400 transition-colors cursor-default tracking-tighter"
        >
          MISSION TIMELINE
        </motion.h2>
        <div className="w-24 h-2 bg-cyan-400 mx-auto transform -skew-x-12" />
        <p className="text-gray-400 max-w-2xl mx-auto mt-6 font-mono text-sm tracking-widest">
          {"// INITIALIZING LAUNCH SEQUENCE"}
        </p>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="flex flex-col max-w-7xl mx-auto relative z-10">
        {/* Animated progress line (responsive) */}
        <motion.div
          className="absolute left-6 md:left-1/2 -translate-x-px top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-red-500 origin-top"
          style={{ height: lineHeight }}
        />

        {timelineData.map((day, dayIdx) => (
          <div key={day.day} className={dayIdx > 0 ? "mt-8" : ""}>
            {/* Day Header */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-start md:justify-center w-full mb-12 pl-16 md:pl-0"
            >
              {/* Center diamond node */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                <div
                  className={`relative z-10 w-5 h-5 md:w-7 md:h-7 transform rotate-45 border-2 ${day.color.border} bg-black flex items-center justify-center transition-transform duration-500`}
                  style={{ boxShadow: `0 0 15px ${day.color.glow}` }}
                >
                  <div className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 ${day.color.bg}`} />
                </div>
              </div>
              {/* Day badge */}
              <div className={`inline-block px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-mono font-bold tracking-[0.2em] ${day.color.bg} text-black transform -skew-x-12`}>
                <span className="block skew-x-12">{day.day} — {day.date}</span>
              </div>
            </motion.div>

            {/* Events */}
            {day.events.map((event, eventIdx) => {
              const isLeft = eventIdx % 2 === 0;
              const colorIdx = (dayIdx * 3 + eventIdx) % neonColors.length;
              const color = neonColors[colorIdx];

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: eventIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center justify-center w-full mb-10"
                >
                  <div className={`flex w-full items-center justify-start md:justify-between px-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}>
                    
                    {/* Center node (responsive) */}
                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-start justify-center h-full pt-6 z-20">
                      <div
                        className={`relative z-10 w-4 h-4 md:w-5 md:h-5 transform rotate-45 border-2 ${color.border} bg-black flex items-center justify-center group-hover:scale-125 transition-transform duration-500`}
                        style={{ boxShadow: `0 0 12px ${color.glow}` }}
                      >
                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 ${color.bg}`} />
                      </div>
                    </div>

                    {/* Card side */}
                    <div className={`w-full md:w-5/12 group relative pl-16 md:pl-0 text-left ${isLeft ? "md:text-right" : "md:text-left"} mb-6 md:mb-0`}>
                      {/* Connector arm (desktop) */}
                      <div
                        className={`hidden md:block absolute top-8 ${isLeft ? "right-[-60px]" : "left-[-60px]"} w-[60px] h-[2px] ${color.bg} opacity-50 group-hover:opacity-100 transition-all duration-500`}
                        style={{ boxShadow: `0 0 10px ${color.glow}` }}
                      />

                      {/* The card */}
                      <div className={`
                        relative bg-gray-900/90 backdrop-blur-xl border border-white/10 p-5 md:p-7
                        transform transition-all duration-500 hover:-translate-y-2
                        ${isLeft 
                          ? "border-l-4 rounded-xl md:border-l-[1px] md:border-r-4 md:rounded-l-xl md:rounded-r-none md:rounded-bl-none md:rounded-br-xl" 
                          : "border-l-4 rounded-xl md:rounded-r-xl md:rounded-l-none md:rounded-br-none md:rounded-bl-xl"}
                        ${color.border} hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]
                        group cursor-pointer overflow-hidden
                      `}>
                        {/* Hover gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${isLeft ? "md:bg-gradient-to-l" : ""} from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        {/* Corner glow */}
                        <div className={`absolute top-0 left-0 ${isLeft ? "md:right-0 md:left-auto" : ""} w-20 h-20 ${color.bg} opacity-5 blur-[40px]`} />

                        {/* Time badge */}
                        <div className={`inline-block px-3 py-1 mb-3 text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] ${color.bg} text-black transform -skew-x-12`}>
                          <span className="block skew-x-12">{event.time}</span>
                        </div>

                        {/* Title with icon */}
                        <h3 className={`text-lg md:text-2xl font-black text-white mb-2 uppercase leading-snug group-hover:${color.text} transition-colors flex items-center gap-3 justify-start ${isLeft ? "md:justify-end" : "md:justify-start"} `}>
                          <span className={`${color.text} opacity-60 group-hover:opacity-100 transition-opacity`}>{event.icon}</span>
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-mono">{event.desc}</p>

                        {/* Highlight badge */}
                        {event.highlight && (
                          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-bold tracking-widest uppercase animate-pulse">
                            <Zap size={10} /> KEY EVENT
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Empty side */}
                    <div className="w-full md:w-5/12 hidden md:block" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}

        {/* Final node */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-start md:justify-center mt-4 mb-4 pl-6 md:pl-0 relative z-20"
        >
          <div className="relative transform -translate-x-1/2 md:translate-x-0">
            <div className="absolute inset-0 bg-red-500 blur-[20px] opacity-40 animate-pulse rounded-full" />
            <div className="relative w-8 h-8 md:w-10 md:h-10 bg-black border-2 border-red-500 rounded-full flex items-center justify-center" style={{ boxShadow: "0 0 20px rgba(239,68,68,0.5)" }}>
              <Trophy size={14} className="text-red-400" />
            </div>
          </div>
        </motion.div>
        
        {/* Accommodation Note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="inline-block px-6 py-4 bg-purple-500/10 border border-purple-500/30 rounded-lg backdrop-blur-md">
            <p className="text-purple-300 font-mono text-sm tracking-wide">
              <span className="font-bold text-white mr-2">NOTE:</span>
              Accommodation will be provided in the Boys and Girls Hostel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
