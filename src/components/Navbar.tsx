"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import kleLogo from "../../public/kle-logo.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Sessions", href: "#sessions" },
  { label: "Themes", href: "#hackathon" },
  { label: "Timeline", href: "#timeline" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const getHref = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090B]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 md:h-20">
        {/* Logo — KLE Tech + IGNITRIX */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src={kleLogo}
            alt="KLE Technological University"
            className="object-contain brightness-110"
            style={{ height: "2rem", width: "auto" }}
            priority
          />
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-px h-5 bg-white/10" />
            <span className="text-sm font-black tracking-tight text-foreground group-hover:text-accent transition-colors">
              IGNITRIX
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={getHref(link.href)} className="nav-link">
              {link.label}
            </Link>
          ))}
          <Link href="/register" className="btn-primary text-xs px-6 py-2.5 rounded-lg">
            <span>Register →</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-foreground rounded-full" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-foreground rounded-full" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-foreground rounded-full" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#09090B]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="container-main py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={getHref(link.href)} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/register" onClick={() => setMobileOpen(false)} className="mt-4 btn-primary text-sm rounded-lg">
                <span>Register Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
