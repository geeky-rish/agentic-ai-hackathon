"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "Who can participate in the hackathon?",
    answer:
      "The hackathon is open to all undergraduate and postgraduate students from any branch or university. Whether you're a CS major or from a non-tech background with an interest in AI, you're welcome to participate and learn.",
  },
  {
    question: "What is the team size?",
    answer:
      "Teams can have 3 to 4 members. You can form your own team.",
  },
  {
    question: "Is prior AI/ML experience required?",
    answer:
      "No prior AI or ML experience is required! Day 1 sessions are designed to bring everyone up to speed — from foundational concepts to hands-on frameworks. However, basic programming knowledge (Python preferred) will be helpful.",
  },
  {
    question: "What do we need to bring?",
    answer:
      "Bring your laptop with a stable internet connection, your charger, and your enthusiasm. We recommend having Python, VS Code, and a Google account (for Colab) set up beforehand. Food and refreshments will be provided.",
  },
  {
    question: "How are the hackathon projects evaluated?",
    answer:
      "Projects will be judged on innovation & creativity (25%), technical implementation (30%), use of agentic AI concepts (25%), and presentation quality (20%). Judges will include faculty members and industry experts.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`glass-card overflow-hidden transition-all duration-300 ${isOpen ? "border-accent/15 shadow-lg shadow-accent/5" : ""
        }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
      >
        <span className="text-base font-semibold text-foreground pr-4">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-accent text-lg"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6">
              <p className="text-sm text-foreground/50 leading-relaxed">
                {faq.answer}
              </p>
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent-secondary/3 blur-[200px]" />

      <div ref={ref} className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-medium text-accent mb-6 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            Got Questions?
          </div>
          <h2 className="section-title mb-6">
            <span className="text-foreground">Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-foreground/50">
            Still have questions?{" "}
            <a
              href="mailto:hackathon@kletech.ac.in"
              className="text-accent hover:underline"
            >
              Reach out to us →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
