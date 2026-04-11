"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const faqs = [
  { question: "Who can participate in the hackathon?", answer: "The hackathon is open to all undergraduate and postgraduate students from any branch or university. Whether you're a CS major or from a non-tech background with an interest in AI, you're welcome." },
  { question: "What is the team size?", answer: "Teams can have 2 to 4 members. You can form your own team." },
  { question: "Is prior AI/ML experience required?", answer: "No prior experience required! Day 1 sessions bring everyone up to speed. Basic Python knowledge is helpful." },
  { question: "What do we need to bring?", answer: "Laptop, charger, and enthusiasm. Python, VS Code, and Google account (for Colab) recommended. Food provided." },
  { question: "How are projects evaluated?", answer: "Innovation (25%), Technical Implementation (30%), Use of Agentic AI (25%), Presentation (20%). Judges include faculty and industry experts." },
  { question: "Is there a registration fee?", answer: "Yes, registration fee is ₹100!" },
  { question: "Will certificates be provided?", answer: "Yes! All participants receive participation certificates. Winners get certificates of merit plus prizes." },
];

function FAQItem({ faq, isOpen, onToggle, index }: { faq: { question: string; answer: string }; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <div className={`card-vibrant overflow-hidden transition-all duration-300 ${isOpen ? "border-accent/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]" : ""}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between p-5 md:p-6 text-left cursor-pointer group">
        <div className="flex items-center gap-4 pr-4">
          <span className="text-xs font-bold text-white/10 group-hover:text-accent/30 transition-colors tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors duration-200">{faq.question}</span>
        </div>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.15 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-sm text-muted group-hover:text-accent group-hover:bg-accent/10 transition-all duration-200">
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="px-5 pb-5 md:px-6 md:pb-6 pl-[52px] md:pl-[56px]">
              <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="relative py-28 md:py-36 bg-vibrant-2 overflow-hidden">
      <div className="grid-bg" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/3 blur-[180px]" />

      <div ref={ref} className="container-main relative z-10 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6 }} className="mb-14 text-center flex flex-col items-center">
          <span className="label-tag mb-6 inline-flex">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            Got Questions?
          </span>
          <h2 className="section-heading text-foreground">
            Frequently Asked<br /><span className="gradient-text-vibrant">Questions</span>
          </h2>
        </motion.div>

        <div className="max-w-2xl w-full space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
              <FAQItem faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} index={i} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.3, delay: 0.4 }} className="mt-10 text-center">
          <p className="text-xs text-muted">Still have questions?{" "}
            <a href="mailto:hackathon@kletech.ac.in" className="text-accent nav-link inline font-semibold">Reach out to us →</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
