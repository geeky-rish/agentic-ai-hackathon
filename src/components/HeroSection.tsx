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
    <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
      {/* Days */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-red-500 blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative w-16 h-20 md:w-20 md:h-28 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center rounded-lg transform -skew-x-6 group-hover:border-red-500 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <motion.span key={timeLeft.days} initial={{ opacity: 0.5, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }}
              className="text-3xl md:text-5xl font-black text-white skew-x-6 tracking-wider relative z-10">
              {String(timeLeft.days).padStart(2, "0")}
            </motion.span>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 opacity-70" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500 opacity-70" />
          </div>
        </div>
        <span className="mt-2 text-xs md:text-sm font-mono font-bold text-red-400 tracking-[0.2em] uppercase">Days</span>
      </div>
      {/* Hours */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-purple-500 blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative w-16 h-20 md:w-20 md:h-28 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center rounded-lg transform -skew-x-6 group-hover:border-purple-500 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <motion.span key={timeLeft.hours} initial={{ opacity: 0.5, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }}
              className="text-3xl md:text-5xl font-black text-white skew-x-6 tracking-wider relative z-10">
              {String(timeLeft.hours).padStart(2, "0")}
            </motion.span>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500 opacity-70" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500 opacity-70" />
          </div>
        </div>
        <span className="mt-2 text-xs md:text-sm font-mono font-bold text-purple-400 tracking-[0.2em] uppercase">Hours</span>
      </div>
      {/* Mins */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-emerald-500 blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative w-16 h-20 md:w-20 md:h-28 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center rounded-lg transform -skew-x-6 group-hover:border-emerald-500 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(52,211,153,0.3)]">
            <motion.span key={timeLeft.minutes} initial={{ opacity: 0.5, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }}
              className="text-3xl md:text-5xl font-black text-white skew-x-6 tracking-wider relative z-10">
              {String(timeLeft.minutes).padStart(2, "0")}
            </motion.span>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-500 opacity-70" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-500 opacity-70" />
          </div>
        </div>
        <span className="mt-2 text-xs md:text-sm font-mono font-bold text-emerald-400 tracking-[0.2em] uppercase">Mins</span>
      </div>
      {/* Secs */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-500 blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative w-16 h-20 md:w-20 md:h-28 bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center rounded-lg transform -skew-x-6 group-hover:border-indigo-500 transition-all duration-300 overflow-hidden shadow-[0_0_15px_rgba(129,140,248,0.3)]">
            <motion.span key={timeLeft.seconds} initial={{ opacity: 0.5, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.15 }}
              className="text-3xl md:text-5xl font-black text-white skew-x-6 tracking-wider relative z-10">
              {String(timeLeft.seconds).padStart(2, "0")}
            </motion.span>
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-indigo-500 opacity-70" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-indigo-500 opacity-70" />
          </div>
        </div>
        <span className="mt-2 text-xs md:text-sm font-mono font-bold text-indigo-400 tracking-[0.2em] uppercase">Secs</span>
      </div>
    </div>
  );
}

/* ═══════ MARQUEE STRIP ═══════ */
function MarqueeStrip() {
  const items = ["IGNITRIX HACKATHON 2026", "AGENTIC AI HACKATHON", "KLE TECH", "APRIL 25-26", "REG FEE: ₹100/PERSON", "₹30K+ PRIZES"];
  return (
    <div className="marquee-wrapper">
      <div className="marquee-strip">
        <div className="marquee-content">
          {Array(4).fill(items).flat().map((item, i) => (
            <span key={i} className="mx-2 hover:text-red-200 cursor-pointer transition-colors">
              {item} <span className="text-red-300 mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════ HERO ═══════ */
export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hero">
      <div className="grid-bg" />

      {/* Neon ambient blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500 blur-[150px] opacity-[0.07] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500 blur-[150px] opacity-[0.07] pointer-events-none" />

      {/* Split-screen layout */}
      <div className="container-main relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-6 md:px-12 pt-40 pb-6 md:pt-40 md:pb-0">

        {/* ——— LEFT: Text Content ——— */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Live tag */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-6 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              REGISTRATIONS OPEN
            </span>
          </motion.div>

          {/* IGNITRIX — Massive stacked text */}
          <motion.h1
            initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-4 group cursor-default"
          >
            <div
              className="inline-block relative whitespace-nowrap glitch group-hover:translate-x-2 transition-transform duration-300"
              data-text="IGNITRIX"
            >
              <span className="text-red-500"
                style={{ textShadow: "0 0 20px rgba(239,68,68,0.5), 0 0 40px rgba(239,68,68,0.3)" }}>
                IGNI
              </span>
              <span className="text-purple-400"
                style={{ textShadow: "0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(168,85,247,0.3)" }}>
                TRIX
              </span>
            </div>
            <span className="text-white block hover:translate-x-6 transition-transform duration-300 text-5xl md:text-7xl mt-2">
              HACKATHON
            </span>
            <span className="text-white block hover:translate-x-6 transition-transform duration-300 text-5xl md:text-7xl mt-2">
              2026
            </span>
          </motion.h1>

          {/* Subtitle badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-block bg-purple-500/20 border border-purple-500 px-4 py-2 mb-4 transform -skew-x-12 hover:skew-x-0 transition-transform cursor-pointer self-start"
          >
            <span className="text-indigo-300 font-bold tracking-widest block skew-x-12 text-xs md:text-sm uppercase">
              {"KLE TECH'S AGENTIC AI HACKATHON"}
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed border-l-4 border-red-500 pl-4 hover:border-purple-500 transition-colors duration-500 mb-8"
          >
            <span className="text-white font-bold block mb-1"></span>
            Build autonomous AI agents that <b className="text-red-400">Think</b>,{" "}
            <b className="text-purple-400">Decide</b>, and{" "}
            <b className="text-indigo-400">Act</b> — Two days. One mission. Infinite possibilities.
          </motion.p>

          {/* CTA Buttons — skewed style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <Link href="/register" className="relative group inline-block cursor-pointer w-full sm:w-auto text-center">
              <div className="absolute inset-0 bg-white/30 skew-x-[-10deg] transform translate-x-[4px] translate-y-[4px] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative z-10 bg-red-600 text-white px-6 py-3 md:px-10 md:py-4 font-bold text-lg md:text-xl skew-x-[-10deg] border border-transparent group-hover:border-white group-hover:bg-white group-hover:text-red-600 transition-all duration-300">
                <span className="block skew-x-[10deg]">REGISTER NOW</span>
              </div>
            </Link>

            <a href="#hackathon" className="relative group inline-block cursor-pointer w-full sm:w-auto text-center">
              <div className="absolute inset-0 bg-purple-500 skew-x-[-10deg] transform translate-x-[4px] translate-y-[4px] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
              <div className="relative z-10 bg-black text-purple-400 px-6 py-3 md:px-10 md:py-4 font-bold text-lg md:text-xl skew-x-[-10deg] border border-purple-500 group-hover:bg-purple-500 group-hover:text-black transition-all duration-300">
                <span className="block skew-x-[10deg]">EXPLORE THEMES</span>
              </div>
            </a>
          </motion.div>

          {/* Quick Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }} className="flex gap-8 md:gap-14 mt-2">
            {[
              { value: "100+", label: "Participants" },
              { value: "₹30K+", label: "Prize Pool" },
              { value: "2-Day", label: "Hackathon" },
              { value: "4+", label: "Sessions" },
            ].map((stat) => (
              <div key={stat.label} className="group/stat cursor-pointer text-center">
                <div className="text-xl md:text-2xl font-black text-white group-hover/stat:scale-110 transition-transform">{stat.value}</div>
                <div className="text-[10px] text-red-400 font-bold tracking-widest uppercase mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ——— RIGHT: Logo + Countdown ——— */}
        <div className="w-full md:w-1/2 relative flex flex-col justify-center items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 text-center flex flex-col items-center"
          >
            <div className="relative w-36 h-36 md:w-48 md:h-48 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/agentic-ai-hackathon' : ''}/kle-logo.png`}
                alt="IGNITRIX Logo"
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:scale-105 transition-transform duration-300 brightness-110"
              />
            </div>
            <div className="text-red-400 font-mono text-sm tracking-[0.5em] mb-2 animate-pulse uppercase">
              Launch Sequence Initiated
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto" />
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-[10px] text-center text-gray-500 uppercase tracking-[0.3em] font-bold mb-4">Event starts in</p>
            <CountdownTimer />
          </motion.div>

          {/* Date + Location Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="flex flex-wrap justify-center items-center gap-3 mt-8"
          >
            <span className="inline-flex items-center gap-2 text-xs font-mono bg-white/5 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10 text-gray-300">
              <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              April 25–26, 2026
            </span>
            <span className="inline-flex items-center gap-2 text-xs font-mono bg-white/5 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10 text-gray-300">
              <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              KLE Tech Campus, Hubballi
            </span>
          </motion.div>
        </div>

      </div>

      {/* Marquee strip — bottom edge */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }} className="mt-auto">
        <MarqueeStrip />
      </motion.div>
    </section>
  );
}
