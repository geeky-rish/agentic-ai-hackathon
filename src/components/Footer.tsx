"use client";

import Link from "next/link";
import { Mail, ArrowUpRight, Heart, Code2 } from "lucide-react";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Diagonal Split/Ribbon at top of footer */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 opacity-30" />

      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/kle-logo.png" alt="KLE Tech" className="h-10 w-auto brightness-200" />
                <div className="h-8 w-px bg-white/20" />
                <span className="text-3xl font-black text-white tracking-tighter">IGNITRIX</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed max-w-md font-mono">
                The flagship AI Hackathon of <span className="text-white font-bold">KLE Technological University</span>. 
                Pioneering the next wave of autonomous intelligence, one agent at a time.
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { icon: <InstagramIcon size={20} />, href: "#", label: "Instagram", color: "hover:text-pink-500 hover:border-pink-500/50" },
                { icon: <LinkedinIcon size={20} />, href: "#", label: "LinkedIn", color: "hover:text-blue-500 hover:border-blue-500/50" },
                { icon: <TwitterIcon size={20} />, href: "#", label: "Twitter", color: "hover:text-cyan-400 hover:border-cyan-400/50" },
              ].map((social) => (
                <a 
                  key={social.label} 
                  href={social.href}
                  className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} hover:bg-white/10 shadow-lg`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8 border-l-2 border-red-500 pl-4">
              Navigation
            </h4>
            <ul className="space-y-4">
              {[
                { name: "About", href: "/#about" },
                { name: "Sessions", href: "/#sessions" },
                { name: "Tracks", href: "/#hackathon" },
                { name: "Timeline", href: "/#timeline" },
                { name: "FAQ", href: "/#faq" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-red-400 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8 border-l-2 border-purple-500 pl-4">
              Mission Control
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Email Us</p>
                  <a href="mailto:kleignitrix@gmail.com" className="text-white hover:text-purple-400 transition-colors font-bold tracking-tight">
                    kleignitrix@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                  <Heart size={18} />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white font-bold tracking-tight">
                    KLE Tech University, Hubballi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Background Text */}
        <div className="relative py-12 flex justify-center items-center opacity-5 select-none pointer-events-none">
          <span className="text-[15vw] font-black text-white tracking-tighter leading-none">
            IGNITRIX
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.2em] text-gray-500">
            <span>© {currentYear} IGNITRIX</span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span>KLE TECHNOLOGICAL UNIVERSITY</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.2em] text-gray-500 group cursor-pointer">
              <span>Built by Team Ignitrix</span>
              <Code2 size={12} className="group-hover:text-red-500 transition-colors" />
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.2em] text-white/40 hover:text-white transition-colors"
            >
              Back to Top
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scratched Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
    </footer>
  );
}
