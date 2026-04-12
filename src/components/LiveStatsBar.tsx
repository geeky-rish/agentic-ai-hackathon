"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ClipboardList, Users, Landmark, Trophy } from "lucide-react";

const stats = [
  { label: "Registrations", target: 100, suffix: "+", icon: <ClipboardList size={32} className="text-accent" /> },
  { label: "Teams Active", target: 15, suffix: "+", icon: <Users size={32} className="text-accent" /> },
  { label: "Colleges", target: 10, suffix: "+", icon: <Landmark size={32} className="text-accent" /> },
  { label: "Prize Pool", target: 30, suffix: "K+", prefix: "₹", icon: <Trophy size={32} className="text-accent" /> },
];

function AnimatedCounter({ target, prefix = "", suffix = "", isInView }: { target: number; prefix?: string; suffix?: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!isInView) return;
    let startTime = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDone(true);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return <span className="font-black text-3xl md:text-5xl gradient-text-vibrant tabular-nums">{prefix}{count}{done ? suffix : ""}</span>;
}

const stagger: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function LiveStatsBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 bg-vibrant-2 overflow-hidden">
      <div className="grid-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/4 blur-[150px] rounded-full" />

      <div ref={ref} className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="flex items-center gap-4 mb-10">
          <div className="accent-line" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Event at a <span className="text-accent">Glance</span></h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} custom={i} initial="hidden"
              animate={isInView ? "visible" : "hidden"} variants={stagger}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25 } }}
              data-aos="zoom-in" data-aos-delay={String(i * 100)}
              className="card-vibrant p-6 md:p-8 text-center">
              <span className="mb-4 flex justify-center">{stat.icon}</span>
              <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} isInView={isInView} />
              <p className="text-[10px] text-muted mt-2 font-bold uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
