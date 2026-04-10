"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ParticleBackground from "./ParticleBackground";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Particle background */}
      <ParticleBackground />

      {/* Grid overlay */}
      <div className="particle-grid animate-grid-move" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent-secondary/5 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[150px] animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-accent-muted/5 blur-[100px] animate-float" style={{ animationDelay: "-1.5s" }} />

      {/* Content */}
      <div className="relative z-10 section-container text-center flex flex-col items-center gap-6 pt-40 pb-32">
        {/* Organized by badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass px-5 py-2 rounded-full text-xs md:text-sm font-medium text-foreground/70 tracking-wide"
        >
          ✦ Organized by{" "}
          <span className="text-accent">KLE Technological University</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tighter"
        >
          <span className="gradient-text">Agentic AI</span>
          <br />
          <span className="text-foreground">Hackathon</span>{" "}
          <span className="gradient-text">2026</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-foreground/60 max-w-xl leading-relaxed"
        >
          Build the future with autonomous AI systems.
          <br className="hidden md:block" />{" "}
          Two days of learning, building, and competing.
        </motion.p>

        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center gap-3 text-sm md:text-base"
        >
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-foreground/80 font-medium">April 25–26, 2026</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <svg className="w-4 h-4 text-accent-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-foreground/80 font-medium">KLE Tech Campus</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <Link href="/register" className="btn-primary text-base px-8 py-4 rounded-xl">
            <span>Register Now →</span>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex gap-8 md:gap-16 mt-8"
        >
          {[
            { value: "2", label: "Days" },
            { value: "4+", label: "Sessions" },
            { value: "₹30K+", label: "Prize Pool" },
            { value: "100+", label: "Participants" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-foreground/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
