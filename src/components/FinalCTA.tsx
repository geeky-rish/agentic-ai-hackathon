"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Send } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-48 bg-black overflow-hidden flex items-center justify-center">
      {/* Background grid and glows */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] bg-red-500/10 blur-[150px] rounded-full pointer-events-none" />
      
      {/* Floating particles (CSS only) */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse opacity-20" />

      <div ref={ref} className="container-main relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold tracking-widest uppercase animate-bounce">
              <Sparkles size={14} /> Mission Critical
            </div>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-8 italic"
          >
            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-red-600 animate-gradient">IGNITE?</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 font-mono"
          >
            {"// REGISTER YOUR SQUAD FOR THE BIGGEST AI REVOLUTION"}
            <br />
            <span className="text-white/60">Limited capacity. Secured deployment protocols active.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link 
              href="/register" 
              className="group relative px-12 py-6 bg-red-600 text-white font-black text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative flex items-center gap-3">
                DEPLOY NOW <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Link>
            
            <a 
              href="#about" 
              className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black text-xl rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
            >
              MISSION LOGS
            </a>
          </motion.div>

          {/* Registration count / Proof of life */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-3 text-red-500/60 font-mono text-sm uppercase tracking-widest"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            200+ AGENTS ALREADY REGISTERED
          </motion.div>
        </div>
      </div>

      {/* Skewed bottom ribbon */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-red-600 transform -skew-y-3 origin-bottom-right -z-10 translate-y-16" />
    </section>
  );
}
