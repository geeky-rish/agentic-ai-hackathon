"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const teamCategories = [
  {
    title: "Patrons",
    members: [
      { name: "Dr. Ashok Shettar", role: "Pro Chancellor" },
      { name: "Dr. Narayan D G", role: "Head, Computer Science and Engineering (AI)" },
    ],
  },
  {
    title: "Faculty Coordinators",
    members: [
      { name: "Amit Kachavimath", role: "Assistant Professor, CSE(AI)" }],
  },
  {
    title: "Student Organizers",
    members: [
      { name: "Rishi Kulkarni", role: "Coordinator" },
      { name: "Sparsh Naik", role: "Coordinator" },
      { name: "Akshat Dodwad", role: "Coordinator" },
    ],
  },
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="relative py-32 overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent-secondary/3 blur-[200px]" />

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
            The People
          </div>
          <h2 className="section-title mb-6">
            <span className="text-foreground">Organizing </span>
            <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg text-foreground/60">
            Meet the dedicated team making this event possible.
          </p>
        </motion.div>

        {/* Team Groups */}
        <div className="space-y-16">
          {teamCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            >
              <h3 className="text-xl font-bold text-foreground/80 mb-8 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {category.members.map((member, memIdx) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: catIdx * 0.15 + memIdx * 0.1,
                    }}
                    className="glass-card p-6 w-full sm:w-64 text-center group"
                  >
                    {/* Avatar */}
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/10 to-accent-secondary/10 border-2 border-white/6 flex items-center justify-center group-hover:border-accent/20 transition-colors">
                      <svg
                        className="w-10 h-10 text-foreground/30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>

                    {/* Info */}
                    <h4 className="font-bold text-foreground text-base">
                      {member.name}
                    </h4>
                    <p className="text-sm text-foreground/50 mt-1">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
