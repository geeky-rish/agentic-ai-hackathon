"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import VanillaTilt from "vanilla-tilt";
import { 
  CircleDollarSign, 
  Handshake, 
  GraduationCap, 
  TerminalSquare, 
  Factory, 
  Hospital, 
  ShieldAlert, 
  Accessibility, 
  Trophy, 
  Medal, 
  ArrowUpRight 
} from "lucide-react";

/* ═══════ DATA ═══════ */
const themes = [
  { name: "Finance & Business", icon: <CircleDollarSign size={28} />, color: "emerald", description: "Build AI agents that automate financial analysis, detect fraud, and optimize business operations.", borderColor: "border-emerald-500", textColor: "text-emerald-400", bgGlow: "bg-emerald-500", hoverBorder: "hover:border-emerald-500", bottomBar: "bg-emerald-500", dotColor: "bg-emerald-500" },
  { name: "Recruitment & Hiring", icon: <Handshake size={28} />, color: "blue", description: "Create agents that streamline the hiring pipeline — from resume parsing to candidate ranking.", borderColor: "border-blue-500", textColor: "text-blue-400", bgGlow: "bg-blue-500", hoverBorder: "hover:border-blue-500", bottomBar: "bg-blue-500", dotColor: "bg-blue-500" },
  { name: "Education Intelligence", icon: <GraduationCap size={28} />, color: "purple", description: "Design AI tutors and learning assistants that adapt to individual students.", borderColor: "border-purple-500", textColor: "text-purple-400", bgGlow: "bg-purple-500", hoverBorder: "hover:border-purple-500", bottomBar: "bg-purple-500", dotColor: "bg-purple-500" },
  { name: "Coding & Debugging", icon: <TerminalSquare size={28} />, color: "green", description: "Build agents that write, review, and debug code autonomously.", borderColor: "border-green-500", textColor: "text-green-400", bgGlow: "bg-green-500", hoverBorder: "hover:border-green-500", bottomBar: "bg-green-500", dotColor: "bg-green-500" },
  { name: "Industry 4.0", icon: <Factory size={28} />, color: "orange", description: "Design agents for smart manufacturing — predictive maintenance and supply chain optimization.", borderColor: "border-orange-500", textColor: "text-orange-400", bgGlow: "bg-orange-500", hoverBorder: "hover:border-orange-500", bottomBar: "bg-orange-500", dotColor: "bg-orange-500" },
  { name: "Healthcare & Wellbeing", icon: <Hospital size={28} />, color: "red", description: "Create AI agents that assist in diagnostics, patient monitoring, and health recommendations.", borderColor: "border-red-500", textColor: "text-red-400", bgGlow: "bg-red-500", hoverBorder: "hover:border-red-500", bottomBar: "bg-red-500", dotColor: "bg-red-500" },
  { name: "Cybersecurity", icon: <ShieldAlert size={28} />, color: "yellow", description: "Build autonomous security agents that detect threats, analyze vulnerabilities, and respond to incidents.", borderColor: "border-yellow-500", textColor: "text-yellow-400", bgGlow: "bg-yellow-500", hoverBorder: "hover:border-yellow-500", bottomBar: "bg-yellow-500", dotColor: "bg-yellow-500" },
  { name: "Assistive AI", icon: <Accessibility size={28} />, color: "cyan", description: "Design AI agents that assist people with disabilities — inclusive technology for all.", borderColor: "border-cyan-500", textColor: "text-cyan-400", bgGlow: "bg-cyan-500", hoverBorder: "hover:border-cyan-500", bottomBar: "bg-cyan-500", dotColor: "bg-cyan-500" },
];

const prizes = [
  { rank: "1st", label: "First Prize", amount: "₹15,000", icon: <Trophy size={48} className="text-amber-500" />, gradient: "from-amber-400 to-yellow-600" },
  { rank: "2nd", label: "Second Prize", amount: "₹10,000", icon: <Medal size={48} className="text-slate-400" />, gradient: "from-slate-300 to-gray-500" },
  { rank: "3rd", label: "Third Prize", amount: "₹5,000", icon: <Medal size={48} className="text-orange-500" />, gradient: "from-orange-400 to-amber-600" },
];

/* ═══════ TYPES ═══════ */
interface Theme {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  borderColor: string;
  textColor: string;
  bgGlow: string;
  hoverBorder: string;
  bottomBar: string;
  dotColor: string;
}

/* ═══════ SUB-COMPONENT ═══════ */
function ThemeCard({ theme, index }: { theme: Theme; index: number }) {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiltNode = tiltRef.current;
    if (tiltNode) {
      VanillaTilt.init(tiltNode, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative h-[380px] w-full cursor-pointer"
    >
      <div 
        ref={tiltRef}
        className={`relative w-full h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-500 ease-out hover:border-opacity-100 hover:shadow-2xl ${theme.hoverBorder}`}
      >
        {/* Hover glow */}
        <div className={`absolute -inset-1 ${theme.bgGlow} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`} />
        {/* Background number */}
        <div className="absolute -right-4 -top-8 text-[10rem] font-black text-white opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 select-none pointer-events-none">
          {String(index + 1).padStart(2, "0")}
        </div>
        
        <div className="relative z-10 p-7 h-full flex flex-col">
          {/* Icon + dots */}
          <div className="mb-6 flex justify-between items-start">
            <div className="w-14 h-14 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
              <div className={`absolute inset-0 ${theme.bgGlow} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              <div className={`${theme.textColor} relative z-10`}>{theme.icon}</div>
            </div>
            <div className="flex flex-col gap-1.5 pt-2">
              {[0, 1, 2].map((d) => (
                <div key={d} className={`w-1.5 h-1.5 rounded-full bg-white/10 group-hover:${theme.dotColor} transition-colors duration-300`} style={{ transitionDelay: `${d * 75}ms` }} />
              ))}
            </div>
          </div>

          <h3 className={`text-2xl font-black text-white mb-3 uppercase tracking-wider group-hover:${theme.textColor} transition-colors duration-300`}>
            {theme.name}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed font-mono mb-6 border-l-2 border-white/5 pl-4 group-hover:border-white/30 transition-colors">
            {theme.description}
          </p>

          <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between group-hover:border-white/20 transition-colors">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${theme.dotColor} opacity-75`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${theme.dotColor}`} />
              </span>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black cursor-pointer">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 w-full h-1 ${theme.bottomBar} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </div>
    </motion.div>
  );
}

/* ═══════ MAIN COMPONENT ═══════ */
export default function HackathonSection() {
  return (
    <section id="hackathon" className="py-20 px-6 md:px-16 relative">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="mb-16">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 inline-block relative hover:text-red-400 transition-colors cursor-default tracking-tighter">
          MISSION TRACKS
          <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-500" />
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg">
          Select your mission objective. Each track presents unique challenges designed to test your AI engineering capabilities.
        </p>
      </div>

      {/* ──── Featured Mission Briefing Terminal ──── */}
      <div className="mb-20 relative w-full max-w-6xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-red-500/10 to-transparent blur-3xl -z-10 rounded-[3rem]" />
        <div className="relative group bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Terminal top bar */}
          <div className="bg-black/80 border-b border-white/5 p-4 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-500 font-mono text-xs tracking-widest uppercase">{"// SECURE CONNECTION ESTABLISHED"}</span>
            </div>
            <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-gray-400 border border-white/5">
              ID: IGNITRIX-AI-2026
            </div>
          </div>

          {/* Terminal content */}
          <div className="flex flex-col lg:flex-row relative z-10">
            <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="relative z-10 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-4 animate-pulse">
                  <ShieldAlert size={10} />Top Secret Protocol
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-wide leading-none">
                  OPERATION: <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">IGNITRIX</span>
                </h3>
                <p className="text-gray-400 font-mono text-sm tracking-wide">{"// AUTHORIZATION REQUIRED: AGENTIC AI"}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 relative backdrop-blur-sm group-hover:bg-white/10 transition-colors duration-500">
                <div className="absolute -left-[1px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent" />
                <h4 className="text-lg font-bold text-white uppercase mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <TerminalSquare size={16} />
                  </span>
                  Mission Objectives
                </h4>
                <ul className="space-y-4 font-mono text-sm text-gray-300">
                  <li className="flex gap-3 items-start"><span className="text-green-400 mt-1">➜</span><span>Build <strong className="text-white">autonomous AI agents</strong> that think, decide, and act.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-green-400 mt-1">➜</span><span>Leverage <strong className="text-white">LangChain, CrewAI, LangGraph</strong> frameworks.</span></li>
                  <li className="flex gap-3 items-start"><span className="text-green-400 mt-1">➜</span><span>Solve real-world problems across <strong className="text-white">8 industry tracks</strong>.</span></li>
                </ul>
              </div>
            </div>

            {/* Right panel */}
            <div className="lg:w-[400px] bg-black/40 border-l border-white/10 relative p-8 md:p-12 flex flex-col items-center justify-center text-center">
              <div className="relative w-28 h-28 mb-8 group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/kle-logo.png" alt="KLE Logo" className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" />
                <div className="absolute inset-0 border border-red-500/30 rounded-full animate-spin" style={{ animationDuration: "10s" }} />
              </div>
              <h4 className="text-white font-black text-2xl uppercase mb-2">Mission Reward</h4>
              <div className="text-red-400 font-black text-xl md:text-2xl mb-2 tracking-wider" style={{ textShadow: "0 0 20px rgba(239,68,68,0.5)" }}>
                ₹30,000+ PRIZE POOL
              </div>
              <div className="text-gray-500 font-mono text-[10px] uppercase tracking-widest mb-8">
                {"// REGISTRATION FEE: ₹100 PER MEMBER"}
              </div>
              <div className="relative group/btn w-full max-w-xs opacity-50 cursor-not-allowed">
                <div className="relative bg-zinc-800 text-zinc-400 font-bold py-4 px-8 rounded-lg border border-white/10 flex items-center justify-center gap-3">
                   <span>REGISTRATIONS CLOSED</span>
                   <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──── Track Cards Grid ──── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
        {themes.map((theme, i) => (
          <ThemeCard key={theme.name} theme={theme} index={i} />
        ))}
      </div>

      {/* ──── Prizes Section ──── */}
      <div className="max-w-4xl mx-auto mb-16">
        <h3 className="text-4xl md:text-6xl font-black text-white mb-8 hover:text-purple-400 transition-colors cursor-default tracking-tighter">
          PRIZES & REWARDS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prizes.map((prize) => (
            <motion.div
              key={prize.rank}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:border-white/20 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">{prize.icon}</div>
                <div className={`text-4xl font-black bg-gradient-to-b ${prize.gradient} bg-clip-text text-transparent mb-1`}>{prize.amount}</div>
                <div className="text-gray-400 text-sm font-bold tracking-widest uppercase">{prize.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Total prize banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 bg-red-500 p-6 overflow-hidden group transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-xl"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="text-black font-bold uppercase tracking-widest mb-1 text-sm">Total Prize Pool</div>
              <h4 className="font-black text-4xl md:text-5xl text-black">₹30,000+</h4>
            </div>
            <p className="text-black/70 font-bold text-sm mt-2 md:mt-0">+ Certificates, Swags & Recognition</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
