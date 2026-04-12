"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, Medal, ShieldCheck, User, Users, Target, ClipboardList, Rocket, Sparkles, ArrowRight } from "lucide-react";

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

  /* ─── Validation helpers ─── */
  const isValidName = (v: string) => /^[a-zA-Z\s]{2,}$/.test(v.trim());
  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isValidPhone = (v: string) => /^\d{10}$/.test(v.trim());

  const isStep1Valid = form.teamName.trim().length >= 2;

  const isMemberValid = (m: MemberInfo) =>
    isValidName(m.name) &&
    isValidEmail(m.email) &&
    isValidPhone(m.phone) &&
    m.yearOfStudy !== "" &&
    m.collegeName.trim().length >= 2;

  const isStep2Valid =
    isMemberValid(form.member1) &&
    isMemberValid(form.member2) &&
    (form.numMembers === "2" || isMemberValid(form.member3)) &&
    (form.numMembers !== "4" || isMemberValid(form.member4));

  const isStep3Valid =
    form.themePriority.every((t) => t !== "");

  /* ─── Submit to Google Form ─── */
  const handleSubmit = useCallback(async () => {
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) return;
    setSubmitting(true);

    try {
      const params = new URLSearchParams();

      // Team info
      params.append(ENTRY.teamName, form.teamName.trim());
      params.append(ENTRY.numMembers, form.numMembers);

      // Member 1
      params.append(ENTRY.m1Name, form.member1.name.trim());
      params.append(ENTRY.m1Email, form.member1.email.trim());
      params.append(ENTRY.m1Phone, form.member1.phone.trim());
      params.append(ENTRY.m1Year, form.member1.yearOfStudy);
      params.append(ENTRY.m1College, form.member1.collegeName.trim());

      // Member 2
      params.append(ENTRY.m2Name, form.member2.name.trim());
      params.append(ENTRY.m2Email, form.member2.email.trim());
      params.append(ENTRY.m2Phone, form.member2.phone.trim());
      params.append(ENTRY.m2Year, form.member2.yearOfStudy);
      params.append(ENTRY.m2College, form.member2.collegeName.trim());

      // Member 3 — only if 3 or 4 members
      if (form.numMembers === "3" || form.numMembers === "4") {
        params.append(ENTRY.m3Name, form.member3.name.trim());
        params.append(ENTRY.m3Email, form.member3.email.trim());
        params.append(ENTRY.m3Phone, form.member3.phone.trim());
        params.append(ENTRY.m3Year, form.member3.yearOfStudy);
        params.append(ENTRY.m3College, form.member3.collegeName.trim());
      }

      // Member 4 — only if 4 members
      if (form.numMembers === "4") {
        params.append(ENTRY.m4Name, form.member4.name.trim());
        params.append(ENTRY.m4Email, form.member4.email.trim());
        params.append(ENTRY.m4Phone, form.member4.phone.trim());
        params.append(ENTRY.m4Year, form.member4.yearOfStudy);
        params.append(ENTRY.m4College, form.member4.collegeName.trim());
      }

      // Themes
      params.append(ENTRY.theme1, form.themePriority[0]);
      params.append(ENTRY.theme2, form.themePriority[1]);
      params.append(ENTRY.theme3, form.themePriority[2]);

      // Accommodation (Defaulting to NO since UI was removed)
      params.append(ENTRY.accommodation, "NO");

      // Required for multi-section Google Forms — tells it all 4 sections were completed
      params.append("pageHistory", "0,1,2,3");
      params.append("submit", "Submit");

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
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

  /* ─── Input classes ─── */
  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition-all font-mono";
  const inputErrCls =
    "w-full px-4 py-3 rounded-xl bg-red-500/[0.05] border border-red-500/40 text-sm text-foreground placeholder:text-foreground/25 focus:outline-none focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 transition-all font-mono";
  const selectCls = `${inputCls} appearance-none cursor-pointer`;
  const errMsg = "text-[10px] text-red-500/80 mt-1.5 font-bold uppercase tracking-wider ml-1";

  /* ─── Per-field error: only show after user has touched the field ─── */
  const getErr = (value: string, type: "name" | "email" | "phone" | "college") => {
    if (!value.trim()) return null; // don't nag empty fields until submit
    switch (type) {
      case "name":
        return !isValidName(value) ? "Letters and spaces only, min 2 chars" : null;
      case "email":
        return !isValidEmail(value) ? "Enter a valid email address" : null;
      case "phone":
        return !isValidPhone(value) ? "Must be exactly 10 digits" : null;
      case "college":
        return value.trim().length < 2 ? "Min 2 characters" : null;
    }
  };

  /* ─── Member form block ─── */
  const renderMemberFields = (
    memberKey: "member1" | "member2" | "member3" | "member4",
    member: MemberInfo,
    label: string,
    isLead: boolean
  ) => (
    <div
      className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-500 overflow-hidden group ${isLead
        ? "bg-red-500/[0.03] border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.05)]"
        : "bg-white/[0.02] border-white/5"
        }`}
    >
      {/* Decorative card elements */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${isLead ? 'from-red-500' : 'from-indigo-500'} via-transparent to-transparent opacity-20`} />
      <div className="absolute top-2 right-4 text-[4rem] font-black text-white/[0.01] pointer-events-none select-none">
        {label.split(' ')[1]}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLead ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-gray-500'}`}>
            {isLead ? <ShieldCheck size={20} /> : <User size={20} />}
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-600 block mb-0.5">{isLead ? 'Lead Registry' : 'Agent Profile'}</span>
            <span className="text-sm font-bold text-white">{label}</span>
          </div>
        </div>
        {isLead && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Primary Contact Authorized
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={member.name}
            onChange={(e) => updateMember(memberKey, "name", e.target.value)}
            placeholder="OPERATIVE NAME"
            className={getErr(member.name, "name") ? inputErrCls : inputCls}
          />
          {getErr(member.name, "name") && (
            <p className={errMsg}>{getErr(member.name, "name")}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
            Communications Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={member.email}
            onChange={(e) => updateMember(memberKey, "email", e.target.value)}
            placeholder="AGENCY@DOMAIN.COM"
            className={getErr(member.email, "email") ? inputErrCls : inputCls}
          />
          {getErr(member.email, "email") && (
            <p className={errMsg}>{getErr(member.email, "email")}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
            Secure Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={member.phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              updateMember(memberKey, "phone", val);
            }}
            placeholder="0000000000"
            maxLength={10}
            className={getErr(member.phone, "phone") ? inputErrCls : inputCls}
          />
          {getErr(member.phone, "phone") && (
            <p className={errMsg}>{getErr(member.phone, "phone")}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
            Service Year <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={member.yearOfStudy}
              onChange={(e) =>
                updateMember(memberKey, "yearOfStudy", e.target.value)
              }
              className={selectCls}
            >
              <option value="" className="bg-[#09090b] text-foreground/50">LEVEL SELECT</option>
              {YEARS.map((yr) => (
                <option key={yr} value={yr} className="bg-[#09090b]">{yr} YEAR</option>
              ))}
            </select>
          </div>
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
            Academy / Institution <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={member.collegeName}
            onChange={(e) =>
              updateMember(memberKey, "collegeName", e.target.value)
            }
            placeholder="INSTITUTION HEADQUARTERS"
            className={getErr(member.collegeName, "college") ? inputErrCls : inputCls}
          />
          {getErr(member.collegeName, "college") && (
            <p className={errMsg}>{getErr(member.collegeName, "college")}</p>
          )}
        </div>
      </div>
    </div>
  );

  /* ═══════ SUCCESS SCREEN ═══════ */
  if (submitted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050507]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-[150px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-lg px-6"
        >
          <div className="flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
            <div className="w-24 h-24 rounded-3xl bg-red-500 flex items-center justify-center text-white relative z-10">
              <ShieldCheck size={48} className="animate-bounce" />
            </div>
            <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute inset-0 border-4 border-red-500 rounded-3xl"
            />
          </div>
          
          <div className="mb-2 uppercase tracking-[0.5em] text-red-500 font-black text-xs">Access Granted</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">
            REGISTRATION <span className="text-red-500">COMPLETE</span>
          </h2>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 backdrop-blur-xl">
            <p className="text-gray-400 text-base leading-relaxed mb-6 font-mono">
              Team <span className="text-white font-black underline decoration-red-500">[{form.teamName.toUpperCase()}]</span> has been synchronized with the Ignitrix grid. Prepare for further transmission via your primary contact email.
            </p>
            <div className="flex items-center justify-center gap-2 text-green-400 text-[10px] font-black uppercase tracking-widest">
              <Check size={14} /> Mission Briefing Staged
            </div>
          </div>

          <Link href="/" className="group inline-flex items-center gap-3 bg-red-500 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] hover:bg-red-600 transition-all shadow-xl shadow-red-500/20">
            <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Surface</span>
          </Link>
        </motion.div>
      </section>
    );
  }

  /* ═══════ FORM ═══════ */
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050507] pt-32 pb-24">
      {/* Background grid & effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#050507]/80 to-[#050507] pointer-events-none" />
      
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full bg-red-500/[0.03] blur-[150px] animate-float" />
      <div
        className="absolute bottom-1/4 right-[5%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[180px] animate-float"
        style={{ animationDelay: "-3s" }}
      />

      <div className="section-container relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-gray-500 hover:text-red-500 transition-colors mb-8"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Command Center
          </Link>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <ShieldCheck size={12} /> Mission Deployment Active
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase">
            OPERATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-indigo-600">REGISTRATION</span>
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto font-mono uppercase tracking-wider">
            Establish your team identity and prepare for immediate deployment into the Agentic AI grid.
          </p>
        </motion.div>

        {/* Next-Gen Step Indicator */}
        <div className="relative mb-16 max-w-xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
          <div className="relative flex justify-between items-center">
            {[
              { num: 1, label: "Mission Base", icon: <Target size={14} /> },
              { num: 2, label: "Agent Crew", icon: <Users size={14} /> },
              { num: 3, label: "Objectives", icon: <ClipboardList size={14} /> },
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center group relative z-10">
                <button
                  onClick={() => s.num < step && setStep(s.num)}
                  disabled={s.num >= step}
                  className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    step === s.num 
                      ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-110" 
                      : step > s.num
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-[#09090b] text-gray-600 border border-white/10"
                  }`}
                >
                  {step > s.num ? <Check size={18} className="stroke-[3]" /> : s.icon}
                  
                  {/* Glowing Pulse for active step */}
                  {step === s.num && (
                    <div className="absolute inset-0 rounded-2xl border-4 border-red-500 animate-ping opacity-20" />
                  )}
                </button>
                <div className={`mt-4 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                  step === s.num ? "text-white" : "text-gray-600"
                }`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative"
        >
          {/* Card Top Branding */}
          <div className="bg-white/[0.02] border-b border-white/5 px-8 md:px-10 py-4 flex items-center justify-between">
            <div className="flex gap-1.5 font-mono text-[9px] text-gray-500 uppercase tracking-widest">
              <span>Security Level:</span>
              <span className="text-red-500 font-black">High</span>
              <span className="ml-4">Status:</span>
              <span className="text-green-500 font-black animate-pulse">Online</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
            </div>
          </div>

          <div className="p-8 md:p-12">
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
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Establishing Team Identity</h2>
                  <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">Provide your primary operative designation.</p>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 ml-1">
                      Mission Call Sign (Team Name) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center text-gray-600 transition-colors group-focus-within:text-red-500">
                        <Target size={18} />
                      </div>
                      <input
                        type="text"
                        value={form.teamName}
                        onChange={(e) => updateField("teamName", e.target.value)}
                        placeholder="TEAM_IDENTIFIER"
                        className={`${inputCls} pl-12 h-14 text-base tracking-widest uppercase focus:bg-red-500/[0.02]`}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px) font-black uppercase tracking-[0.3em] text-gray-500 ml-1">
                      Personnel Count
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(["2", "3", "4"] as const).map((n) => (
                        <button
                          key={n}
                          onClick={() => updateField("numMembers", n)}
                          className={`relative group h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 border ${
                            form.numMembers === n
                              ? "bg-red-500/20 border-red-500/40 text-red-400"
                              : "bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300"
                          }`}
                        >
                          <Users size={18} className={form.numMembers === n ? "scale-110" : ""} />
                          <span className="text-xs font-black tracking-widest">{n} AGENTS</span>
                          {form.numMembers === n && (
                            <motion.div layoutId="n-active" className="absolute inset-0 bg-red-500/10 rounded-2xl -z-10" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Registration Fee Info */}
                  <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                        <Medal size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Registration Fee</p>
                        <p className="text-xs font-bold text-white uppercase">₹100 / Member</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Total Amount</p>
                      <p className="text-xl font-black text-red-500">₹{Number(form.numMembers) * 100}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-12">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="group flex items-center gap-3 bg-red-500 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] disabled:opacity-20 transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  >
                    <span>Define Personnel</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Crew Personnel Registry</h2>
                  <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">Identify all agents participating in this mission.</p>
                </div>

                <div className="space-y-8">
                  {renderMemberFields("member1", form.member1, "MEMBER 01", true)}
                  {renderMemberFields("member2", form.member2, "MEMBER 02", false)}
                  {(form.numMembers === "3" || form.numMembers === "4") &&
                    renderMemberFields("member3", form.member3, "MEMBER 03", false)}
                  {form.numMembers === "4" &&
                    renderMemberFields("member4", form.member4, "MEMBER 04", false)}
                </div>

                <div className="flex justify-between items-center mt-12 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <button
                    onClick={() => setStep(1)}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
                  >
                    ← Alter Configuration
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!isStep2Valid}
                    className="group flex items-center gap-3 bg-red-500 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] disabled:opacity-20 transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  >
                    <span>Finalizing Objectives</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Objectives Strategy</h2>
                  <p className="text-gray-500 text-sm font-mono uppercase tracking-widest">Select your primary, secondary, and tertiary mission tracks.</p>
                </div>

                <div className="space-y-10">
                  {[0, 1, 2].map((priorityIdx) => {
                    const labels = ["PRIMARY OBJECTIVE", "SECONDARY OBJECTIVE", "TERTIARY OBJECTIVE"];
                    const icons = [<Medal className="text-amber-500" key="gold" />, <Medal className="text-slate-400" key="silver" />, <Medal className="text-orange-500" key="bronze" />];
                    return (
                      <div key={priorityIdx}>
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                           <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                               {icons[priorityIdx]}
                             </div>
                             <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-gray-500">{labels[priorityIdx]}</span>
                           </div>
                           {form.themePriority[priorityIdx] && (
                             <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-green-500 flex items-center gap-2">
                               <Check size={14} /> Track Confirmed
                             </span>
                           )}
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                          {THEMES.map((theme) => {
                            const isSelected = form.themePriority[priorityIdx] === theme;
                            const isUsedElsewhere = form.themePriority.some((sel, i) => i !== priorityIdx && sel === theme);
                            return (
                              <button
                                key={theme}
                                disabled={isUsedElsewhere}
                                onClick={() => setTheme(priorityIdx, isSelected ? "" : theme)}
                                className={`relative group p-5 md:p-6 rounded-2xl text-left transition-all border ${
                                  isSelected
                                    ? "bg-red-500/10 border-red-500/40"
                                    : isUsedElsewhere
                                      ? "opacity-10 cursor-not-allowed border-transparent"
                                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/10"
                                }`}
                              >
                                <span className={`text-xs md:text-sm font-mono font-bold leading-snug block uppercase ${isSelected ? "text-red-400" : "text-gray-400"}`}>
                                  {theme}
                                </span>
                                {isSelected && (
                                  <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-red-500 animate-ping" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Summary & Fee */}
                {form.themePriority.some((t) => t) && (
                  <div className="mt-8 space-y-4">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                      <p className="text-[9px] font-black font-mono text-gray-500 mb-4 tracking-[0.3em] uppercase">Selection Manifesto</p>
                      <div className="space-y-3">
                        {form.themePriority.map((theme, i) => {
                          const priorityLabels = ["PRIORITY_01", "PRIORITY_02", "PRIORITY_03"];
                          return theme ? (
                            <div key={i} className="flex items-center gap-4 text-xs font-mono">
                              <span className="text-red-500 font-black tracking-widest w-24 shrink-0">{priorityLabels[i]}</span>
                              <span className="text-gray-300 uppercase">{theme}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                          <Medal size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-0.5">Total Registration Fee</p>
                          <p className="text-sm font-bold text-white uppercase">Payload for {form.numMembers} Agents</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black text-red-500">₹{Number(form.numMembers) * 100}</p>
                        <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Payable at Venue</p>
                      </div>
                    </div>
                  </div>
                )}



                {/* Submit Actions */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
                  <button
                    onClick={() => setStep(2)}
                    className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
                  >
                    ← Review Personnel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isStep3Valid || submitting}
                    className="group relative flex items-center gap-4 bg-red-500 px-10 py-5 rounded-2xl text-white font-black text-sm uppercase tracking-[0.4em] disabled:opacity-20 transition-all hover:bg-red-600 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative z-10">
                      {submitting ? "UPLOADING DATA..." : "AUTHORIZE DEPLOYMENT"}
                    </span>
                    {!submitting && <ShieldCheck size={20} className="relative z-10" />}
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
