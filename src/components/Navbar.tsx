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

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col"
              style={{ background: "rgba(10, 10, 10, 0.97)", backdropFilter: "blur(16px)" }}
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-foreground cursor-pointer" aria-label="Close menu">
                  ✕
                </button>
              </div>
              <motion.nav
                initial="closed"
                animate="open"
                exit="closed"
                variants={{ open: { transition: { staggerChildren: 0.08 } }, closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } } }}
                className="flex flex-col gap-1 px-6 flex-1"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.href}
                    variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}
                    transition={{ duration: 0.2 }}>
                    <Link href={getHref(link.href)} onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-muted hover:text-foreground hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={{ open: { y: 0, opacity: 1 }, closed: { y: 20, opacity: 0 } }}
                  transition={{ duration: 0.2 }}
                  className="mt-6">
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary btn-register text-sm rounded-lg w-full">
                    <span>Register Now</span>
                  </Link>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
