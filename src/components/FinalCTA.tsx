"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative py-32 md:py-44 bg-cta overflow-hidden">
      <div className="grid-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-[200px]" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/4 blur-[120px] rounded-full animate-float" />

      <div ref={ref} className="container-main relative z-10 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl flex flex-col items-center">
          <span className="label-tag text-accent mb-8 inline-flex">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-dot" />
            Limited spots available
          </span>

          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.85] mb-6 mt-6">
            Don&apos;t<br/>Miss <span className="gradient-text-hero">This.</span>
          </h2>

          <p className="text-muted text-sm md:text-base max-w-md mb-10 leading-relaxed">
            Spots are filling fast. Register your team now and be part of the most exciting AI hackathon of 2026.
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-base px-10 py-5"><span>Register Now →</span></Link>
            <a href="#about" className="btn-outline text-base px-10 py-5">Learn More</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }} className="flex items-center justify-center gap-6 mt-10 text-muted text-xs">
            {["Exciting Competitions", "Meals Included", "Certificates"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />{item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
