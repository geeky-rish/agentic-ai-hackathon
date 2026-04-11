"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ═══════ COUNTDOWN ═══════ */
function CountdownTimer() {
  const targetDate = new Date("2026-04-25T09:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 md:gap-5">
      {[
        { v: timeLeft.days, l: "Days" },
        { v: timeLeft.hours, l: "Hrs" },
        { v: timeLeft.minutes, l: "Min" },
        { v: timeLeft.seconds, l: "Sec" },
      ].map((u, i, arr) => (
        <div key={u.l} className="flex items-center gap-3 md:gap-5">
          <div className="card-vibrant px-4 py-3 md:px-6 md:py-4 text-center min-w-[60px] md:min-w-[80px]">
            <motion.div
              key={u.v}
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              className="countdown-value text-foreground"
            >
              {String(u.v).padStart(2, "0")}
            </motion.div>
            <div className="countdown-label mt-1">{u.l}</div>
          </div>
          {i < arr.length - 1 && <span className="text-white/15 text-2xl font-light">:</span>}
        </div>
      ))}
    </div>
  );
}

/* ═══════ FLOATING BLOBS ═══════ */
function FloatingBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-[10%] right-[5%] w-72 h-72 md:w-[500px] md:h-[500px] bg-gradient-to-br from-red-500/8 via-purple-500/5 to-indigo-500/8 animate-morph animate-hero-blob blur-[60px]" />
      <div className="absolute bottom-[10%] left-[5%] w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-indigo-500/6 via-red-500/4 to-purple-500/6 animate-morph animate-hero-blob blur-[80px]" style={{ animationDelay: "-5s" }} />
      <div className="absolute top-[50%] left-[40%] w-48 h-48 bg-red-500/4 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-3s" }} />
    </div>
  );
}

/* ═══════ FLOATING 3D SHAPES ═══════ */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-[15%] right-[12%] w-16 h-16 md:w-24 md:h-24"
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "600px", transformStyle: "preserve-3d" }}
      >
        <div className="w-full h-full border border-red-500/15 rounded-lg" style={{ transform: "rotateX(45deg) rotateZ(45deg)" }} />
      </motion.div>

      <motion.div
        className="absolute top-[40%] left-[6%] w-20 h-20 md:w-32 md:h-32"
        animate={{ rotateY: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "800px" }}
      >
        <div className="w-full h-full rounded-full border-2 border-purple-500/10" style={{ transform: "rotateX(70deg)" }} />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] right-[18%] w-10 h-10 md:w-14 md:h-14"
        animate={{ rotate: 360, y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full border border-indigo-500/12 rounded-sm" style={{ transform: "rotate(45deg)" }} />
      </motion.div>

      <motion.svg className="absolute bottom-[35%] left-[10%] w-14 h-14 md:w-18 md:h-18 text-red-500/8" viewBox="0 0 100 100"
        animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}>
        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </motion.svg>

      <motion.div className="absolute top-[25%] left-[25%]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <div className="w-2 h-2 rounded-full bg-red-400/30" />
      </motion.div>

      <motion.div className="absolute top-[35%] right-[35%]"
        animate={{ rotate: 180, scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <div className="relative w-6 h-6">
          <div className="absolute top-1/2 left-0 w-full h-px bg-purple-400/12 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-purple-400/12 -translate-x-1/2" />
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════ MARQUEE STRIP ═══════ */
function MarqueeStrip() {
  const text = "IGNITRIX 2026  ✦  AGENTIC AI HACKATHON  ✦  KLE TECH  ✦  APRIL 25-26  ✦  ₹30K+ PRIZES  ✦  ";
  return (
    <div className="marquee-strip">
      <div className="marquee-content">
        {Array(4).fill(text).map((t, i) => (
          <span key={i} className="mx-2">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════ HERO ═══════ */
export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero">
      <div className="grid-bg" />
      <FloatingBlobs />
      <FloatingShapes />

      <div className="container-main relative z-10 pt-28 pb-8 md:pt-36 md:pb-12">
        {/* Tag */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <span className="label-tag mb-8 inline-flex">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
          </span>
        </motion.div>

        {/* IGNITRIX — Massive */}
        <motion.h1
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="display-hero gradient-text-hero mb-2 select-none break-words"
        >
          IGNITRIX
        </motion.h1>

        {/* Agentic AI Hackathon 2026 */}
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="display-sub text-foreground mb-8"
        >
          Agentic AI <span className="gradient-text-vibrant">Hackathon 2026</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted text-sm md:text-lg max-w-xl leading-relaxed mb-8"
        >
          Build autonomous AI agents that{" "}
          <span className="text-red-400 font-semibold">Think</span>,{" "}
          <span className="text-purple-400 font-semibold">Decide</span>, and{" "}
          <span className="text-indigo-400 font-semibold">Act</span>
          <span className="text-muted/60"> — Two days. One mission. Infinite possibilities.</span>
        </motion.p>

        {/* Date + Location */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <span className="label-tag">
            <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            April 25–26, 2026
          </span>
          <span className="label-tag">
            <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            KLE Tech Campus, Hubballi
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <Link href="/register" className="btn-primary"><span>Register Now →</span></Link>
          <a href="#hackathon" className="btn-outline">Explore Themes</a>
        </motion.div>

        {/* Countdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}>
          <p className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold mb-4">Event starts in</p>
          <CountdownTimer />
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }} className="flex gap-8 md:gap-14 mt-10">
          {[
            { value: "100+", label: "Participants" },
            { value: "₹30K+", label: "Prize Pool" },
            { value: "2-Day", label: "Hackathon" },
            { value: "4+", label: "Sessions" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.3 + i * 0.08 }} className="text-center">
              <div className="text-xl md:text-2xl font-black text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted uppercase tracking-wider mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }}>
        <MarqueeStrip />
      </motion.div>
    </section>
  );
}
