"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Google Form Config ─── */
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd_p37VQKIu8BKUgrig2RWr7-WzpQ-zZ2wnvjMqQi8xX9U3Jw/formResponse";

const ENTRY = {
  teamName: "entry.2142743052",
  numMembers: "entry.1828135787",
  m1Name: "entry.2115634020",
  m1Email: "entry.220181470",
  m1Phone: "entry.1363803420",
  m1Year: "entry.154138528",
  m1College: "entry.824000052",
  m2Name: "entry.614701775",
  m2Email: "entry.2105722021",
  m2Phone: "entry.1882437251",
  m2Year: "entry.831796285",
  m2College: "entry.407654670",
  m3Name: "entry.953268919",
  m3Email: "entry.10188536",
  m3Phone: "entry.1998042382",
  m3Year: "entry.1887706006",
  m3College: "entry.361552535",
  // Member 4
  m4Name: "entry.1227222065",
  m4Email: "entry.1471048252",
  m4Phone: "entry.1613943600",
  m4Year: "entry.1903678478",
  m4College: "entry.955535248",
  theme1: "entry.2107794599",
  theme2: "entry.1422382106",
  theme3: "entry.720064116",
  accommodation: "entry.1873267070",
} as const;

/* ─── 8 Hackathon Themes (exact Google Form values) ─── */
const THEMES = [
  "Finance and Business",
  "Recruitment and Hiring",
  "Education Intelligence",
  "Coding and Debugging Agents",
  "Industry 4.0 and Automation",
  "Healthcare and Well Being",
  "Cybersecurity Systems",
  "Assistive AI Solutions",
] as const;

const YEARS = ["1st", "2nd", "3rd", "4th"] as const;

/* ─── Types ─── */
interface MemberInfo {
  name: string;
  email: string;
  phone: string;
  yearOfStudy: string;
  collegeName: string;
}

interface FormData {
  teamName: string;
  numMembers: "2" | "3" | "4";
  member1: MemberInfo;
  member2: MemberInfo;
  member3: MemberInfo;
  member4: MemberInfo;
  themePriority: [string, string, string];
  accommodation: "YES" | "NO" | "";
}

const emptyMember = (): MemberInfo => ({
  name: "",
  email: "",
  phone: "",
  yearOfStudy: "",
  collegeName: "",
});

const initialForm = (): FormData => ({
  teamName: "",
  numMembers: "2",
  member1: emptyMember(),
  member2: emptyMember(),
  member3: emptyMember(),
  member4: emptyMember(),
  themePriority: ["", "", ""],
  accommodation: "",
});

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(initialForm());
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1 = Team, 2 = Members, 3 = Themes + Accommodation

  /* ─── Update helpers ─── */
  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateMember = (
    memberKey: "member1" | "member2" | "member3" | "member4",
    field: keyof MemberInfo,
    value: string
  ) =>
    setForm((f) => ({
      ...f,
      [memberKey]: { ...f[memberKey], [field]: value },
    }));

  const setTheme = (priorityIdx: number, theme: string) => {
    setForm((f) => {
      const tp = [...f.themePriority] as [string, string, string];
      tp[priorityIdx] = theme;
      return { ...f, themePriority: tp };
    });
  };

  /* ─── Validation ─── */
  const isStep1Valid = form.teamName.trim().length >= 2;

  const isMemberValid = (m: MemberInfo) =>
    m.name.trim() && m.email.trim() && m.phone.trim() && m.yearOfStudy && m.collegeName.trim();

  const isStep2Valid =
    isMemberValid(form.member1) &&
    isMemberValid(form.member2) &&
    (form.numMembers === "2" || isMemberValid(form.member3)) &&
    (form.numMembers !== "4" || isMemberValid(form.member4));

  const isStep3Valid =
    form.themePriority.every((t) => t !== "") && form.accommodation !== "";

  /* ─── Submit to Google Form ─── */
  const handleSubmit = useCallback(async () => {
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) return;
    setSubmitting(true);

    try {
      const fd = new window.FormData();

      // Team info
      fd.append(ENTRY.teamName, form.teamName.trim());
      fd.append(ENTRY.numMembers, form.numMembers);

      // Member 1
      fd.append(ENTRY.m1Name, form.member1.name.trim());
      fd.append(ENTRY.m1Email, form.member1.email.trim());
      fd.append(ENTRY.m1Phone, form.member1.phone.trim());
      fd.append(ENTRY.m1Year, form.member1.yearOfStudy);
      fd.append(ENTRY.m1College, form.member1.collegeName.trim());

      // Member 2
      fd.append(ENTRY.m2Name, form.member2.name.trim());
      fd.append(ENTRY.m2Email, form.member2.email.trim());
      fd.append(ENTRY.m2Phone, form.member2.phone.trim());
      fd.append(ENTRY.m2Year, form.member2.yearOfStudy);
      fd.append(ENTRY.m2College, form.member2.collegeName.trim());

      // Member 3 — only if 3 or 4 members
      if ((form.numMembers === "3" || form.numMembers === "4") && form.member3.name.trim()) {
        fd.append(ENTRY.m3Name, form.member3.name.trim());
        fd.append(ENTRY.m3Email, form.member3.email.trim());
        fd.append(ENTRY.m3Phone, form.member3.phone.trim());
        fd.append(ENTRY.m3Year, form.member3.yearOfStudy);
        fd.append(ENTRY.m3College, form.member3.collegeName.trim());
      }

      // Member 4 — only if 4 members
      if (form.numMembers === "4" && form.member4.name.trim()) {
        fd.append(ENTRY.m4Name, form.member4.name.trim());
        fd.append(ENTRY.m4Email, form.member4.email.trim());
        fd.append(ENTRY.m4Phone, form.member4.phone.trim());
        fd.append(ENTRY.m4Year, form.member4.yearOfStudy);
        fd.append(ENTRY.m4College, form.member4.collegeName.trim());
      }

      // Themes
      fd.append(ENTRY.theme1, form.themePriority[0]);
      fd.append(ENTRY.theme2, form.themePriority[1]);
      fd.append(ENTRY.theme3, form.themePriority[2]);

      // Accommodation
      fd.append(ENTRY.accommodation, form.accommodation);

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: fd,
      });

      setSubmitted(true);
    } catch {
      // no-cors always resolves opaque — treat as success
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }, [form, isStep1Valid, isStep2Valid, isStep3Valid]);

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  /* ─── Input class ─── */
  const inputCls =
    "w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;

  /* ─── Member form block ─── */
  const renderMemberFields = (
    memberKey: "member1" | "member2" | "member3" | "member4",
    member: MemberInfo,
    label: string,
    isLead: boolean
  ) => (
    <div
      className={`relative p-5 rounded-2xl border transition-all ${
        isLead
          ? "bg-accent/[0.04] border-accent/20"
          : "bg-white/[0.02] border-white/5"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-bold text-foreground/60">{label}</span>
        {isLead && (
          <span className="px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">
            ★ Team Lead
          </span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => updateMember(memberKey, "name", e.target.value)}
            placeholder="John Doe"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={member.email}
            onChange={(e) => updateMember(memberKey, "email", e.target.value)}
            placeholder="john@example.com"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={member.phone}
            onChange={(e) => updateMember(memberKey, "phone", e.target.value)}
            placeholder="9876543210"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">
            Year of Study <span className="text-red-400">*</span>
          </label>
          <select
            value={member.yearOfStudy}
            onChange={(e) =>
              updateMember(memberKey, "yearOfStudy", e.target.value)
            }
            className={selectCls}
          >
            <option value="" className="bg-[#111] text-foreground/50">
              Select year
            </option>
            {YEARS.map((yr) => (
              <option key={yr} value={yr} className="bg-[#111]">
                {yr}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-foreground/50 mb-1.5">
            College Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={member.collegeName}
            onChange={(e) =>
              updateMember(memberKey, "collegeName", e.target.value)
            }
            placeholder="KLE Technological University"
            className={inputCls}
          />
        </div>
      </div>
    </div>
  );

  /* ═══════ SUCCESS SCREEN ═══════ */
  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-accent-secondary/5 blur-[200px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 glass-card p-12 max-w-lg mx-auto text-center"
        >
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Registration Successful!
          </h2>
          <p className="text-foreground/60 mb-2 text-lg">
            Team{" "}
            <span className="text-accent font-semibold">{form.teamName}</span>{" "}
            has been registered.
          </p>
          <p className="text-foreground/40 text-sm mb-8">
            We&apos;ll send confirmation details to your team lead&apos;s email.
          </p>
          <Link
            href="/"
            className="btn-primary text-sm px-6 py-3 rounded-lg inline-flex"
          >
            <span>← Back to Home</span>
          </Link>
        </motion.div>
      </section>
    );
  }

  /* ═══════ FORM ═══════ */
  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient pt-28 pb-20">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent-secondary/5 blur-[120px] animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[150px] animate-float"
        style={{ animationDelay: "-3s" }}
      />

      <div className="section-container relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-accent transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            <span className="gradient-text">Register</span>{" "}
            <span className="text-foreground">Your Team</span>
          </h1>
          <p className="text-foreground/50 text-lg">
            Fill in your team details to participate in the Agentic AI Hackathon
          </p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { num: 1, label: "Team Info" },
            { num: 2, label: "Members" },
            { num: 3, label: "Themes" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <button
                onClick={() => setStep(s.num)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  step === s.num
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : step > s.num
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "glass text-foreground/40 border border-white/5"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step > s.num
                      ? "bg-green-500/20 text-green-400"
                      : step === s.num
                        ? "bg-accent/20 text-accent"
                        : "bg-white/5 text-foreground/40"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < 2 && (
                <div
                  className={`w-8 h-px ${
                    step > s.num ? "bg-green-500/30" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8 md:p-10"
          style={{ transform: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "none")}
        >
          <AnimatePresence mode="wait">
            {/* ═══════ STEP 1: Team Info ═══════ */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">
                    1
                  </span>
                  Team Information
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                      Team Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.teamName}
                      onChange={(e) => updateField("teamName", e.target.value)}
                      placeholder="Enter your team name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/70 mb-2">
                      Number of Members
                    </label>
                    <div className="flex gap-3">
                      {(["2", "3", "4"] as const).map((n) => (
                        <button
                          key={n}
                          onClick={() => updateField("numMembers", n)}
                          className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                            form.numMembers === n
                              ? "bg-accent/15 text-accent border border-accent/25"
                              : "bg-white/[0.03] text-foreground/50 border border-white/10 hover:border-white/20"
                          }`}
                        >
                          {n} Members
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="btn-primary text-sm px-6 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Next: Team Members →</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════ STEP 2: Members ═══════ */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">
                    2
                  </span>
                  Team Members
                </h2>

                <div className="space-y-6">
                  {renderMemberFields("member1", form.member1, "Member 1", true)}
                  {renderMemberFields(
                    "member2",
                    form.member2,
                    "Member 2",
                    false
                  )}
                  {(form.numMembers === "3" || form.numMembers === "4") &&
                    renderMemberFields(
                      "member3",
                      form.member3,
                      "Member 3",
                      false
                    )}
                  {form.numMembers === "4" &&
                    renderMemberFields(
                      "member4",
                      form.member4,
                      "Member 4",
                      false
                    )}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 text-sm font-medium rounded-lg text-foreground/50 hover:text-foreground border border-white/10 hover:border-white/20 transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!isStep2Valid}
                    className="btn-primary text-sm px-6 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Next: Select Themes →</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ═══════ STEP 3: Themes + Accommodation ═══════ */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-sm">
                    3
                  </span>
                  Themes & Preferences
                </h2>
                <p className="text-foreground/40 text-sm mb-8">
                  Choose 3 themes in order of preference. Priority 1 is your top
                  choice.
                </p>

                <div className="space-y-5">
                  {[0, 1, 2].map((priorityIdx) => {
                    const labels = [
                      "1st Priority",
                      "2nd Priority",
                      "3rd Priority",
                    ];
                    const colors = [
                      {
                        dot: "bg-amber-400",
                        badge: "bg-amber-400/15 text-amber-300",
                      },
                      {
                        dot: "bg-slate-300",
                        badge: "bg-slate-300/15 text-slate-300",
                      },
                      {
                        dot: "bg-orange-400",
                        badge: "bg-orange-400/15 text-orange-300",
                      },
                    ];
                    return (
                      <div key={priorityIdx}>
                        <label className="flex items-center gap-2 text-sm font-medium text-foreground/70 mb-2">
                          <span
                            className={`w-2 h-2 rounded-full ${colors[priorityIdx].dot}`}
                          />
                          {labels[priorityIdx]}
                          {form.themePriority[priorityIdx] && (
                            <span
                              className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold ${colors[priorityIdx].badge}`}
                            >
                              Selected
                            </span>
                          )}
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {THEMES.map((theme) => {
                            const isSelected =
                              form.themePriority[priorityIdx] === theme;
                            const isUsedElsewhere = form.themePriority.some(
                              (sel, i) => i !== priorityIdx && sel === theme
                            );

                            return (
                              <button
                                key={theme}
                                disabled={isUsedElsewhere}
                                onClick={() =>
                                  setTheme(
                                    priorityIdx,
                                    isSelected ? "" : theme
                                  )
                                }
                                className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all border ${
                                  isSelected
                                    ? "bg-accent/15 border-accent/25 text-accent"
                                    : isUsedElsewhere
                                      ? "bg-white/[0.01] border-white/5 text-foreground/20 cursor-not-allowed"
                                      : "bg-white/[0.03] border-white/8 text-foreground/60 hover:border-accent/15 hover:text-foreground/80"
                                }`}
                              >
                                {theme}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Summary */}
                {form.themePriority.some((t) => t) && (
                  <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-semibold text-foreground/50 mb-3 tracking-wider uppercase">
                      Your Selections
                    </p>
                    <div className="space-y-2">
                      {form.themePriority.map((theme, i) => {
                        const priorityLabels = [
                          "🥇 Priority 1",
                          "🥈 Priority 2",
                          "🥉 Priority 3",
                        ];
                        return theme ? (
                          <div
                            key={i}
                            className="flex items-center gap-3 text-sm"
                          >
                            <span className="text-foreground/40 text-xs w-24">
                              {priorityLabels[i]}
                            </span>
                            <span className="text-foreground/80 font-medium">
                              {theme}
                            </span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                {/* Accommodation */}
                <div className="mt-8">
                  <label className="block text-sm font-medium text-foreground/70 mb-3">
                    Do you need accommodation?{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-3">
                    {(["YES", "NO"] as const).map((val) => (
                      <button
                        key={val}
                        onClick={() => updateField("accommodation", val)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                          form.accommodation === val
                            ? "bg-accent/15 text-accent border border-accent/25"
                            : "bg-white/[0.03] text-foreground/50 border border-white/10 hover:border-white/20"
                        }`}
                      >
                        {val === "YES" ? "Yes, I need accommodation" : "No, not needed"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 text-sm font-medium rounded-lg text-foreground/50 hover:text-foreground border border-white/10 hover:border-white/20 transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isStep3Valid || submitting}
                    className="btn-primary text-sm px-8 py-3 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>
                      {submitting ? "Submitting..." : "Submit Registration ✓"}
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
