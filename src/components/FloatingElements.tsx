"use client";

import { motion } from "framer-motion";

interface FloatingElementsProps {
  variant?: "default" | "alt" | "minimal";
}

export default function FloatingElements({ variant = "default" }: FloatingElementsProps) {
  if (variant === "minimal") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[20%] right-[8%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-8 h-8 border border-accent/10 rounded-sm" style={{ transform: "rotate(45deg)" }} />
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[5%]"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-2 h-2 rounded-full bg-accent-secondary/20" />
        </motion.div>
      </div>
    );
  }

  if (variant === "alt") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 3D Wireframe sphere */}
        <motion.svg
          className="absolute top-[10%] right-[5%] w-24 h-24 md:w-32 md:h-32 text-accent/8"
          viewBox="0 0 200 200"
          animate={{ rotateY: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ perspective: "600px" }}
        >
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <ellipse cx="100" cy="100" rx="55" ry="80" fill="none" stroke="currentColor" strokeWidth="0.3" style={{ transform: "rotateY(60deg)", transformOrigin: "center" }} />
        </motion.svg>

        {/* Floating dots constellation */}
        <motion.div
          className="absolute bottom-[20%] left-[10%]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-20 h-20">
            <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-accent/25" />
            <div className="absolute top-1/3 right-0 w-1 h-1 rounded-full bg-accent-cyan/20" />
            <div className="absolute bottom-0 left-1/4 w-1.5 h-1.5 rounded-full bg-accent-secondary/25" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
              <line x1="40" y1="0" x2="80" y2="27" stroke="rgba(124,138,255,0.08)" strokeWidth="0.5" />
              <line x1="80" y1="27" x2="20" y2="80" stroke="rgba(167,139,250,0.08)" strokeWidth="0.5" />
            </svg>
          </div>
        </motion.div>

        {/* Rotating ring */}
        <motion.div
          className="absolute top-[50%] right-[15%] w-12 h-12 md:w-16 md:h-16"
          animate={{ rotateX: 360, rotateZ: 45 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ perspective: "400px" }}
        >
          <div className="w-full h-full rounded-full border border-accent-secondary/10" />
        </motion.div>
      </div>
    );
  }

  // default
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* 3D Rotating octahedron wireframe */}
      <motion.svg
        className="absolute top-[15%] right-[8%] w-20 h-20 md:w-28 md:h-28 text-accent/10"
        viewBox="0 0 100 100"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
      </motion.svg>

      {/* Floating torus */}
      <motion.div
        className="absolute bottom-[25%] left-[8%] w-20 h-20 md:w-28 md:h-28"
        animate={{ rotateY: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "500px" }}
      >
        <div className="w-full h-full rounded-full border-2 border-accent-cyan/8" style={{ transform: "rotateX(65deg)" }} />
        <div className="absolute inset-[25%] rounded-full border border-accent-cyan/6" style={{ transform: "rotateX(65deg)" }} />
      </motion.div>

      {/* Small floating cross */}
      <motion.div
        className="absolute top-[45%] right-[25%]"
        animate={{ rotate: 180, scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative w-6 h-6">
          <div className="absolute top-1/2 left-0 w-full h-px bg-accent/12 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-accent/12 -translate-x-1/2" />
        </div>
      </motion.div>

      {/* Pulsing dot */}
      <motion.div
        className="absolute bottom-[40%] right-[5%]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-accent-secondary/30" />
      </motion.div>
    </div>
  );
}
