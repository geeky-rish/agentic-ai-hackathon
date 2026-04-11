"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const teamCategories = [
  {
    title: "Student Organizers",
    members: [
      { name: "Rishi Kulkarni", role: "Coordinator" },
      { name: "Sparsh Naik", role: "Coordinator" },
      { name: "Akshat Dodwad", role: "Coordinator" },
    ],
  },
];

const stagger = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="team" className="relative py-28 md:py-36 bg-vibrant-3 overflow-hidden">
      <div className="grid-bg" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/3 blur-[180px]" />

      <div ref={ref} className="container-main relative z-10 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-16 text-center flex flex-col items-center">
          <span className="label-tag mb-6 inline-flex">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse-dot" />
            The People
          </span>
          <h2 className="section-heading text-foreground">
            Organizing <span className="gradient-text-vibrant">Team</span>
          </h2>
          <p className="text-muted text-sm md:text-base mt-4 max-w-lg">Meet the dedicated team making this event possible.</p>
        </motion.div>

        {teamCategories.map((category) => (
          <div key={category.title} className="w-full flex flex-col items-center">
            <h3 className="text-sm font-bold text-muted uppercase tracking-widest mb-8 text-center">{category.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl w-full">
              {category.members.map((member, i) => (
                <motion.div key={member.name} custom={i} initial="hidden"
                  animate={isInView ? "visible" : "hidden"} variants={stagger}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
                  className="card-vibrant p-6 text-center group relative">
                  <div className="w-18 h-18 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500/10 via-purple-500/10 to-indigo-500/10 border-2 border-white/6 flex items-center justify-center group-hover:border-accent/25 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.1)] transition-all duration-300">
                    <svg className="w-8 h-8 text-white/15 group-hover:text-accent/40 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-foreground text-sm group-hover:text-accent transition-colors duration-300">{member.name}</h4>
                  <p className="text-xs text-muted mt-1">{member.role}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
