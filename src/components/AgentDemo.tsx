"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const presets: { keywords: string[]; steps: [string, string, string] }[] = [
  {
    keywords: ["hire", "recruit", "candidate", "resume"],
    steps: [
      "Parsing job requirements, scanning 500 candidate profiles...",
      "Ranking by skill match, experience, cultural fit...",
      "Top 3 candidates shortlisted. Sending interview invites...",
    ],
  },
  {
    keywords: ["stock", "finance", "market", "invest", "portfolio"],
    steps: [
      "Analyzing market data, scanning 12 portfolio positions...",
      "Evaluating risk exposure, comparing against benchmarks...",
      "Rebalanced portfolio. Moved 15% from bonds to tech equities.",
    ],
  },
  {
    keywords: ["bug", "debug", "code", "error", "fix"],
    steps: [
      "Reading error logs, tracing stack frames across 3 services...",
      "Identified null reference in auth middleware, line 142...",
      "Patch applied and tests passing. Deploying hotfix to staging.",
    ],
  },
  {
    keywords: ["health", "patient", "medical", "doctor"],
    steps: [
      "Reviewing patient vitals, cross-referencing symptom database...",
      "Correlating with historical data, assessing risk factors...",
      "Alert sent to Dr. Patel. Recommended follow-up within 48 hours.",
    ],
  },
  {
    keywords: ["teach", "learn", "student", "education", "tutor"],
    steps: [
      "Assessing student knowledge gaps from last 10 quiz results...",
      "Generating personalized problem set targeting weak areas...",
      "Study plan created. 15 practice problems queued for tomorrow.",
    ],
  },
];

const defaultSteps: [string, string, string] = [
  "Analyzing your request, gathering relevant context...",
  "Processing data, evaluating multiple solution paths...",
  "Task complete. Results compiled and ready for review.",
];

const stepMeta = [
  { label: "Think", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  { label: "Decide", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  { label: "Act", color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
];

function matchPreset(input: string): [string, string, string] {
  const lower = input.toLowerCase();
  for (const preset of presets) {
    if (preset.keywords.some((kw) => lower.includes(kw))) return preset.steps;
  }
  return defaultSteps;
}

export default function AgentDemo() {
  const [input, setInput] = useState("");
  const [activeSteps, setActiveSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [typingText, setTypingText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const run = () => {
    if (!input.trim() || running) return;
    const steps = matchPreset(input);
    setActiveSteps([]);
    setCurrentStep(0);
    setRunning(true);

    let step = 0;
    const showStep = () => {
      setActiveSteps((prev) => [...prev, steps[step]]);
      setCurrentStep(step);

      // Typing effect
      let charIdx = 0;
      setTypingText("");
      const typeInterval = setInterval(() => {
        charIdx++;
        setTypingText(steps[step].slice(0, charIdx));
        if (charIdx >= steps[step].length) {
          clearInterval(typeInterval);
          step++;
          if (step < 3) {
            timerRef.current = setTimeout(showStep, 1000);
          } else {
            setCurrentStep(3);
            setRunning(false);
          }
        }
      }, 25);
    };
    showStep();
  };

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setInput("");
    setActiveSteps([]);
    setCurrentStep(-1);
    setRunning(false);
    setTypingText("");
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="agent-demo-terminal p-6 max-w-xl mx-auto" data-aos="fade-up">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500/60" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <div className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="text-xs text-muted ml-2 font-mono">agent-demo.ai</span>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && run()}
            placeholder="Try: Hire the best candidate for a React role"
            disabled={running}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-foreground font-mono placeholder:text-muted/40 focus:outline-none focus:border-accent/40 disabled:opacity-50"
          />
          <button onClick={run} disabled={running || !input.trim()}
            className="px-4 py-2.5 text-sm font-bold rounded-lg bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 transition-all disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed">
            Run
          </button>
        </div>
      </div>

      <div className="space-y-3 min-h-[120px]">
        <AnimatePresence>
          {activeSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 p-3 rounded-lg ${stepMeta[i].bg} border ${stepMeta[i].border}`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider ${stepMeta[i].color} whitespace-nowrap mt-0.5`}>
                {stepMeta[i].label}
              </span>
              <span className={`text-sm font-mono text-muted ${i === currentStep && currentStep < 3 ? "typing-cursor" : ""}`}>
                {i === currentStep && currentStep < 3 ? typingText : step}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {currentStep >= 3 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={reset}
          className="mt-4 text-xs font-bold text-muted hover:text-accent transition-colors cursor-pointer"
        >
          ↻ Reset & Try Again
        </motion.button>
      )}
    </div>
  );
}
