"use client";

import React from "react";
import { MapPin, Navigation } from "lucide-react";

export default function MapSection() {
  const marqueeText = "JOIN THE REVOLUTION // REGISTER NOW // LIMITED SEATS // IGNITRIX 2026 // Hubballi, Karnataka // ";
  const repeatedText = Array(15).fill(marqueeText).join("");

  return (
    <section id="location" className="relative w-full bg-[#050505] overflow-hidden">
      {/* Top Divider with Marquee */}
      <div className="relative z-20 bg-red-600 border-y border-white/20 -skew-y-1 transform origin-left shadow-[0_0_40px_rgba(239,68,68,0.2)]">
        <div className="py-4 md:py-6 overflow-hidden whitespace-nowrap select-none">
          <div className="inline-block animate-marquee uppercase tracking-[0.2em] font-black text-black text-2xl md:text-5xl italic">
            {repeatedText}
          </div>
          <div className="inline-block animate-marquee uppercase tracking-[0.2em] font-black text-black text-2xl md:text-5xl italic" aria-hidden="true">
            {repeatedText}
          </div>
        </div>
      </div>

      <div className="container-main py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Text/Info Side */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-mono text-xs tracking-widest uppercase">
              <MapPin size={14} className="text-red-500" /> MISSION LOCATION
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase italic">
              BASE <span className="text-red-500">CONTROL</span>
            </h2>

            <p className="text-gray-400 text-lg font-mono leading-relaxed border-l-2 border-red-500/30 pl-6">
              {"// SECTOR: HUBBALLI"}
              <br />
              KLE Technological University Campus.
              <br />
              Vidyanagar, Hubballi, Karnataka 580031.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=KLE+Technological+University,+Hubballi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-white font-bold hover:text-red-500 transition-colors group"
              >
                OPEN IN GOOGLE MAPS <Navigation size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Map Frame Side */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            {/* HUD Elements */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded text-[10px] font-mono text-red-500 font-bold uppercase tracking-widest animate-pulse">
              ● MISSION_LIVE
            </div>
            <div className="absolute bottom-4 right-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              COORD: 15.3715° N, 75.1228° E
            </div>

            {/* The Map */}
            <div className="absolute inset-0 grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=KLE+Technological+University,+Hubballi+(KLE%20Tech)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                className="w-full h-full"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-scan z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
