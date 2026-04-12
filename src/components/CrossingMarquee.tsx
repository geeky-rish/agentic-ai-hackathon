"use client";

import React from "react";

export default function CrossingMarquee() {
  const line1 = "AGENTIC AI | INNOVATION | BUILD | DEPLOY | DISRUPT | IGNITRIX 2026 | CODE | COMPETE | CONQUER | ";
  const line2 = "WIN BIG | CASH PRIZES | SWAGS | CERTIFICATES | KLE TECH | HACKATHON | RECOGNITION | ";

  return (
    <div className="relative h-40 md:h-64 overflow-hidden flex items-center justify-center my-8 pointer-events-none select-none">
      {/* Band 1 — rotated clockwise */}
      <div className="absolute w-[120%] z-10 mix-blend-normal opacity-90">
        <div className="bg-red-500 py-2 md:py-3 overflow-hidden border-y-2 border-white relative z-20 shadow-[0_0_15px_rgba(239,68,68,0.5)] transform scale-105 rotate-6 md:rotate-4">
          <div className="whitespace-nowrap flex animate-marquee">
            {Array(10).fill(null).map((_, i) => (
              <span key={i} className="text-black font-black text-sm md:text-2xl uppercase tracking-wider px-4">
                {line1}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Band 2 — rotated counter-clockwise */}
      <div className="absolute w-[120%] z-20 mix-blend-normal opacity-90">
        <div className="bg-purple-500 py-2 md:py-3 overflow-hidden border-y-2 border-white relative z-20 shadow-[0_0_15px_rgba(168,85,247,0.5)] transform scale-105 -rotate-6 md:-rotate-4">
          <div className="whitespace-nowrap flex animate-marquee" style={{ animationDirection: "reverse" }}>
            {Array(10).fill(null).map((_, i) => (
              <span key={i} className="text-black font-black text-sm md:text-2xl uppercase tracking-wider px-4">
                {line2}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
