"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare } from "lucide-react";

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
    <div 
      className={`relative group bg-black/40 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden transition-all duration-500 mb-4 ${isOpen ? "border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.1)]" : "hover:border-white/20"}`}
    >
      {/* Background large number */}
      <div className="absolute -right-4 -top-8 text-[8rem] font-black text-white opacity-[0.02] group-hover:opacity-[0.04] transition-opacity select-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      <button 
        onClick={onToggle} 
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer group/btn"
      >
        <div className="flex items-center gap-5 relative z-10">
          <span className={`text-xl font-mono font-bold transition-colors duration-300 ${isOpen ? "text-cyan-400" : "text-white/20 group-hover:text-white/40"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-base md:text-lg font-bold transition-colors duration-300 ${isOpen ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
            {faq.question}
          </span>
        </div>
        <div className={`
          flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300
          ${isOpen ? "bg-cyan-500 border-transparent rotate-45 shadow-[0_0_15px_rgba(34,211,238,0.5)]" : "group-hover:border-white/30"}
        `}>
          <Plus size={20} className={isOpen ? "text-black" : "text-white/40 group-hover:text-white"} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} 
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-6 pb-6 pl-[68px] relative z-10">
              <div className="h-px w-12 bg-cyan-500/30 mb-4" />
              <p className="text-gray-400 text-sm md:text-base leading-relaxed font-mono">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-500 transition-all duration-500 ${isOpen ? "w-full" : "w-0"}`} />
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 md:px-16 relative overflow-hidden bg-black">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 inline-block relative hover:text-cyan-400 transition-colors cursor-default tracking-tighter"
          >
            FREQUENTLY ASKED
            <div className="absolute -bottom-2 right-0 w-2/3 h-1 bg-cyan-500" />
          </motion.h2>
          <p className="text-gray-400 font-mono text-sm tracking-widest mt-4 uppercase">
            {"// GETTING SYSTEM_CLEARED FOR DEPLOYMENT"}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i} 
              faq={faq} 
              isOpen={openIndex === i} 
              onToggle={() => setOpenIndex(openIndex === i ? null : i)} 
              index={i} 
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold">Still have questions?</h4>
              <p className="text-gray-400 text-sm">Join our whatsapp group or reach out via email.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <a 
              href="mailto:kleignitrix@gmail.com" 
              className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-500 transition-colors text-center flex-1 md:flex-none"
            >
              Email Us
            </a>
            <a 
              href="https://chat.whatsapp.com/K1H6yVuvTVABzIGJvQiljo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-colors text-center flex-1 md:flex-none"
            >
              Join WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
