"use client";

import React, { useState, useEffect } from "react";

/* ============================================================
   CONFIG
   ============================================================ */
const CONFIG = {
  whatsappNumber: "918147030030",
  whatsappMessage: "MBBS Decision Map",
  phone: "+91 81470 30030",
  email: "info@newlyf.com",
  apiEndpoint: "/api/decision-map-leads",
  intakeDeadline: "2026-07-31T23:59:00",
};

/* ============================================================
   DATA
   ============================================================ */
const COUNTRY_OPTIONS = [
  { flag: "🇷🇺", name: "Russia", note: "Most popular. Wide university choice." },
  { flag: "🇬🇪", name: "Georgia", note: "English medium. Strong FMGE track." },
  { flag: "🇺🇿", name: "Uzbekistan", note: "Budget-friendly. Rising quality." },
  { flag: "🇰🇿", name: "Kazakhstan", note: "NMC approved. Quality education." },
  { flag: "🇻🇳", name: "Vietnam", note: "Emerging. Quality campus life." },
  { flag: "🇧🇩", name: "Bangladesh", note: "Close to home. Similar culture." },
  { flag: "🇲🇾", name: "Malaysia", note: "Modern infra. International exposure." },
  { flag: "🇧🇦", name: "Bosnia", note: "European exposure. Unique edge." },
];

const COUNTRY_DIFF_FACTORS = [
  "Total yearly cost",
  "Hostel and food comfort",
  "Climate and adjustment",
  "University environment",
  "Student support",
  "Documentation process",
  "Travel and distance",
  "Future licensing pathway direction",
];

const DECISION_MAP_STEPS = [
  { num: "1", title: "Score Fit Check", desc: "Understand whether your NEET status supports India focus, abroad backup planning, or both." },
  { num: "2", title: "Budget Fit Check", desc: "Know what your family can realistically manage before comparing universities." },
  { num: "3", title: "Country Fit Check", desc: "Compare countries based on comfort, safety, student life, climate and pathway." },
  { num: "4", title: "University Pathway Check", desc: "Understand suitable university options based on the student's profile and family priorities." },
  { num: "5", title: "Document Timeline Check", desc: "Know what documents are needed and when the process should start." },
  { num: "6", title: "Future Direction Check", desc: "Understand the student journey beyond admission, including licensing pathway direction and long-term planning." },
];

const COST_ROWS = [
  { label: "Tuition Fee", note: "What most consultants quote you", status: "quoted" },
  { label: "Hostel / Accommodation", note: "Often not included in quoted figure", status: "hidden" },
  { label: "Food & Meals", note: "₹4,000–8,000/month depending on country", status: "hidden" },
  { label: "Visa & Documentation", note: "₹25,000–60,000 one-time cost", status: "hidden" },
  { label: "Return Travel", note: "₹40,000–80,000 per year", status: "hidden" },
  { label: "Living Expenses", note: "Varies heavily by country and city", status: "hidden" },
];

const FAQS = [
  { q: "Should we wait for India counselling first?", a: "If your score is strong enough for your India path, India should be your first focus. But if the score is uncertain, it is better to understand backup options early instead of waiting in confusion." },
  { q: "Is MBBS abroad only for low-score students?", a: "No. Students explore MBBS abroad for different reasons: budget, seat availability, international exposure, family planning, university pathway and future goals." },
  { q: "Which country is best for MBBS abroad?", a: "There is no single best country for everyone. The right country depends on your NEET status, budget, comfort, safety expectations, student life preference and future direction." },
  { q: "Is fee the most important factor?", a: "Fee is important, but it should not be the only factor. Families should also check hostel, food, living cost, climate, safety, documentation, academic pathway and long-term direction." },
  { q: "What happens after I submit the form?", a: "New Lyf will contact you on WhatsApp and help you understand your MBBS Decision Map based on your score, location, country interest and questions." },
];

const TESTIMONIALS = [
  {
    img: "/pearl.jpg",
    name: "Pearl",
    text: "New Lyf's counselling changed everything for our family. We were confused between 4 countries and about to make a rushed decision. Their calm roadmap session showed us exactly why Georgia was the right fit for my NEET score, budget and comfort.",
  },
  {
    img: "/neil_issac.jpg",
    name: "Neil Issac",
    text: "I was about to delay my MBBS by a year because I didn't understand the timeline. New Lyf mapped every document, every deadline, and guided my parents through the full process. I reached Russia before the intake closed.",
  },
  {
    img: "/shefali_gautam.png",
    name: "Shefali Gautam",
    text: "As parents, we were scared about safety and unknown costs. New Lyf spent time understanding our concerns, showed us real hostels, real student experiences, and gave us a complete 6-year budget. We chose confidently, not fearfully.",
  },
  {
    img: "/patil_vedant.jpg",
    name: "Patil Vedant",
    text: "Three different agents gave me three different advice. New Lyf was the only one who didn't push me toward any country. They helped me compare and understand. That honest approach is why I trusted them with my MBBS journey.",
  },
];

/* ============================================================
   UTILITY
   ============================================================ */
const openWhatsApp = () => {
  window.open(
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`,
    "_blank"
  );
};

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

/* ============================================================
   ROADMAP FORM  (matches the new design)
   ============================================================ */
interface RoadmapFormProps {
  source: string;
}

function RoadmapForm({ source }: RoadmapFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    neetStatus: "",
    city: "",
    countries: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => { const n = { ...prev }; delete n[e.target.name]; return n; });
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Full name is required";
    const digits = form.phone.replace(/\D/g, "");
    if (!digits || digits.length !== 10) e.phone = "Valid 10-digit WhatsApp number required";
    if (!form.neetStatus) e.neetStatus = "Please select your NEET year";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ve = validate();
    if (Object.keys(ve).length > 0) { setErrors(ve); return; }
    setStatus("loading");
    try {
      await fetch(CONFIG.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source, timestamp: new Date().toISOString() }),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const iCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-navy-800 placeholder:text-gray-400 outline-none transition-all focus:border-saffron-500 focus:ring-[3px] focus:ring-saffron-500/15 bg-white";
  const eCls = "text-medical-red text-xs mt-1 ml-1";

  if (status === "success") {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-extrabold text-xl text-green-700 mb-2">Details Received!</h3>
        <p className="text-sm text-warm-500 mb-5 leading-relaxed">
          Thank you. New Lyf received your details. Our counsellor will contact you on WhatsApp within 24 hours.
        </p>
        <button
          onClick={openWhatsApp}
          className="w-full bg-wa hover:bg-wa-hover text-white font-extrabold text-sm py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          📲 WhatsApp for Instant Response
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-6 animate-fade-in">
        <p className="text-medical-red font-bold text-sm mb-4">
          Something went wrong. Please reach us directly on WhatsApp.
        </p>
        <button
          onClick={openWhatsApp}
          className="w-full bg-wa hover:bg-wa-hover text-white font-extrabold text-sm py-4 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          📲 WhatsApp Now
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {/* Full Name */}
      <div>
        <input
          name="name"
          placeholder="Full Name *"
          value={form.name}
          onChange={onChange}
          className={iCls}
        />
        {errors.name && <p className={eCls}>{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <input
          name="phone"
          placeholder="WhatsApp / Phone Number *"
          value={form.phone}
          onChange={onChange}
          inputMode="numeric"
          className={iCls}
        />
        {errors.phone && <p className={eCls}>{errors.phone}</p>}
      </div>

      {/* NEET Year */}
      <div>
        <select
          name="neetStatus"
          value={form.neetStatus}
          onChange={onChange}
          className={`${iCls} ${!form.neetStatus ? "text-gray-400" : "text-navy-800"}`}
        >
          <option value="" disabled>NEET Qualified Year *</option>
          <option value="NEET 2024">NEET 2024</option>
          <option value="NEET 2025">NEET 2025</option>
          <option value="2026 Appearing">2026 Appearing</option>
          <option value="Score Uncertain">Score Uncertain</option>
          <option value="Need Guidance">Need Guidance</option>
        </select>
        {errors.neetStatus && <p className={eCls}>{errors.neetStatus}</p>}
      </div>

      {/* City */}
      <div>
        <input
          name="city"
          placeholder="Your City *"
          value={form.city}
          onChange={onChange}
          className={iCls}
        />
        {errors.city && <p className={eCls}>{errors.city}</p>}
      </div>

      {/* Preferred Country */}
      <select
        name="countries"
        value={form.countries}
        onChange={onChange}
        className={`${iCls} ${!form.countries ? "text-gray-400" : "text-navy-800"}`}
      >
        <option value="">Preferred Country (Optional)</option>
        <option value="RU Russia">🇷🇺 RU Russia</option>
        <option value="GE Georgia">🇬🇪 GE Georgia</option>
        <option value="UZ Uzbekistan">🇺🇿 UZ Uzbekistan</option>
        <option value="KZ Kazakhstan">🇰🇿 KZ Kazakhstan</option>
        <option value="VN Vietnam">🇻🇳 VN Vietnam</option>
        <option value="BD Bangladesh">🇧🇩 BD Bangladesh</option>
        <option value="MY Malaysia">🇲🇾 MY Malaysia</option>
        <option value="BA Bosnia">🇧🇦 BA Bosnia</option>
        <option value="Not Sure - Help Me Decide">Not Sure — Help Me Decide</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white font-extrabold text-sm py-4 rounded-xl transition-all flex items-center justify-center mt-1 animate-pulse-cta"
        style={{ letterSpacing: "0.06em" }}
      >
        {status === "loading" ? "Sending…" : "GET MY FREE FEE + COUNTRY ROADMAP →"}
      </button>

      <p className="text-center text-[0.65rem] text-warm-400 mt-0.5">
        🔒 Free. Confidential. No commitment required.
      </p>
    </form>
  );
}

/* ============================================================
   MODAL
   ============================================================ */
function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-navy-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-warm-100 flex items-center justify-between z-10 rounded-t-[24px]">
          <h2 className="text-lg font-extrabold text-navy-800">
            Wait — Don&apos;t Decide Without A Roadmap.
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-warm-500 hover:text-navy-700 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 pt-4 pb-1">
          <p className="text-sm text-warm-600 mb-5 leading-relaxed">
            Get your free MBBS Decision Map before choosing India waitlist, abroad backup, country or university.
          </p>
        </div>
        <div className="px-6 pb-6">
          <RoadmapForm source="modal" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LOGO
   ============================================================ */
function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 48 65 C 30 65 22 48 30 36 C 37 26 48 40 48 56 Z" fill="#00df89" stroke="#000000" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 48 56 C 56 56 64 48 60 38 C 56 30 48 40 48 48 Z" fill="#a6ec55" stroke="#000000" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 48 65 L 48 90 L 25 90 C 18 90 15 87 15 80 L 15 45 C 15 25 30 10 50 10 C 70 10 85 25 85 45 L 85 80 C 85 87 82 90 75 90 L 65 90" stroke="#000000" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      {showText && (
        <span
          className="font-extrabold text-2xl tracking-tight flex items-center leading-none"
          style={{ fontFamily: "'Outfit', 'Nunito', 'Inter', sans-serif" }}
        >
          <span style={{ color: "#00df89" }}>New</span>
          <span style={{ color: "#00b0ff" }} className="ml-1">Lyf</span>
        </span>
      )}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function DecisionMapLandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const target = new Date(CONFIG.intakeDeadline);
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-navy-800 antialiased">
      <Modal open={showModal} onClose={() => setShowModal(false)} />

      {/* ═══ STICKY NAVBAR ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "shadow-md py-1.5" : "shadow-sm py-2.5"}`}
        style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e8f0" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2.5">
            <a href={`tel:${CONFIG.whatsappNumber}`} className="hidden md:flex font-bold text-xs text-navy-800 no-underline">
              📞 {CONFIG.phone}
            </a>
            <button
              onClick={openWhatsApp}
              className="bg-wa hover:bg-wa-hover text-white font-extrabold text-xs py-2 px-4 rounded-full transition-all flex items-center gap-1.5"
            >
              💬 WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        className="pt-24 pb-16 md:pt-28 md:pb-20 px-4 sm:px-6"
        style={{ background: "linear-gradient(145deg, #0a1628 0%, #1a3a6e 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <div className="text-white">
              <div className="inline-flex items-center gap-1.5 bg-saffron-500 text-white text-[0.72rem] font-extrabold px-3.5 py-1.5 rounded-full mb-5">
                ⚡ August 2026 Intake — Get Your Clarity Before Timelines Move
              </div>

              <h1 className="text-[clamp(2rem,4.5vw,2.8rem)] font-extrabold leading-[1.15] tracking-tight mb-4">
                {"Don't Choose India Or Abroad Yet. "}
                <span className="text-saffron-500">First, find out which MBBS path actually fits.</span>
              </h1>

              <p className="text-base leading-relaxed text-blue-200/90 mb-6">
                If your MBBS dream feels confusing right now, you are not alone. Some students should focus fully on India
                counselling. Some students need a safe backup plan abroad. Some families are comparing countries without
                knowing the real cost, student life, climate, hostel, documentation timeline or future licensing pathway.
              </p>
              <p className="text-base leading-relaxed text-blue-200/90 mb-6">
                Before you wait, panic, or randomly choose a country — get your{" "}
                <strong className="text-white">free MBBS Decision Map</strong> from New Lyf.
              </p>

              <div className="flex flex-wrap gap-2 mb-5">
                {["Since 2009", "17,000+ Students Guided", "Parent-Friendly Counselling"].map((b) => (
                  <span
                    key={b}
                    className="text-[0.7rem] px-3 py-1 rounded-full font-semibold text-blue-200"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                    ✅ {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={openWhatsApp}
                  className="bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all flex items-center gap-2"
                  style={{ letterSpacing: "0.04em" }}
                >
                  📋 Get My Free MBBS Decision Map
                </button>
                <button
                  onClick={openWhatsApp}
                  className="border-2 border-white/30 hover:border-white/60 text-white font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all"
                >
                  🔍 Check My Score Fit First
                </button>
              </div>

              <p className="text-[0.72rem] text-blue-300/80 leading-relaxed mb-5">
                No pressure. No rushed admission push. Just clarity before you decide.
              </p>

              {/* Countdown */}
              <div className="rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-blue-300 mb-3">
                  ⏳ Estimated Time Left for August 2026 Intake
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {[
                    { val: timeLeft.days, label: "Days" },
                    { val: timeLeft.hours, label: "Hours" },
                    { val: timeLeft.minutes, label: "Minutes" },
                    { val: timeLeft.seconds, label: "Seconds" },
                  ].map(({ val, label }) => (
                    <div
                      key={label}
                      className="rounded-xl py-3 px-1 sm:py-3.5"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-saffron-500 leading-none">{pad(val)}</div>
                      <div className="text-[0.6rem] text-blue-300 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={openWhatsApp}
                className="lg:hidden w-full bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all mt-5 flex items-center justify-center"
              >
                📲 Get My Free MBBS Decision Map →
              </button>
            </div>

            {/* Right: Hero Form */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <h2 className="font-extrabold text-xl text-navy-800 mb-1">Get Your Free Roadmap</h2>
              <p className="text-sm text-warm-500 mb-5 leading-relaxed">
                Personalised Fee + Country Fit Analysis — free, no commitment. Our counsellor calls within 24 hours.
              </p>
              <RoadmapForm source="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROBLEM STRIP ═══ */}
      <section
        className="py-10 px-4 sm:px-6"
        style={{ background: "#fff5f5", borderTop: "1px solid #fecaca", borderBottom: "1px solid #fecaca" }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-medical-red mb-5">
            What Most Consultants Don&apos;t Tell You
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "❌", text: "They show tuition only — not the full 6-year cost you will actually spend" },
              { icon: "❌", text: "They don't verify your NEET score fits the country's specific intake rules" },
              { icon: "❌", text: "They don't explain the India return pathway — FMGE or NExT — before you leave" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-red-100">
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <p className="text-[0.8rem] font-semibold text-navy-800 leading-relaxed m-0">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 1 — THE DECISION MAP ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-saffron-500 mb-2">
              Our Process
            </span>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-navy-800 leading-tight tracking-tight">
              The New Lyf <span className="text-medical-blue">MBBS Decision Map</span>
            </h2>
            <p className="text-base text-warm-600 mt-4 max-w-xl mx-auto leading-relaxed">
              Instead of giving random country suggestions, New Lyf follows a structured counselling flow.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {DECISION_MAP_STEPS.map((pt) => (
              <div key={pt.num} className="flex items-start gap-4 bg-warm-50 rounded-2xl p-5 border border-warm-200">
                <span className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center font-extrabold text-medical-blue text-lg flex-shrink-0">
                  {pt.num}
                </span>
                <div>
                  <h3 className="font-extrabold text-sm text-navy-800 mb-1">{pt.title}</h3>
                  <p className="text-sm text-warm-600 leading-relaxed m-0">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={openWhatsApp}
              className="inline-flex bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
            >
              Get My MBBS Decision Map →
            </button>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — INNER CONFLICT ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-warm-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-navy-800 leading-tight tracking-tight mb-4">
            Waiting Feels Safe. <span className="text-medical-red">But Waiting Without A Plan Is Risky.</span>
          </h2>
          <p className="text-base text-warm-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            Right now, many students and parents are stuck in the same confusion:
          </p>
          <div className="grid sm:grid-cols-2 gap-2 text-left max-w-xl mx-auto mb-7">
            {[
              "Should we wait for India counselling?",
              "What if the score is not enough?",
              "Is MBBS abroad safe?",
              "Which country is actually better?",
              "What if we choose the wrong university?",
              "What if we delay and lose the intake?",
            ].map((q) => (
              <div key={q} className="flex items-start gap-2 bg-white rounded-xl p-3 border border-warm-200">
                <span className="text-saffron-500 font-extrabold flex-shrink-0 text-sm">?</span>
                <p className="text-xs text-navy-800 leading-relaxed m-0">{q}</p>
              </div>
            ))}
          </div>

          <p className="text-base text-warm-600 leading-relaxed mb-2 max-w-2xl mx-auto font-extrabold">
            This page is not asking you to choose abroad today.
          </p>
          <p className="text-base text-warm-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            It is asking you to stop guessing. Because the wrong decision usually starts with one of these three mistakes:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            {[
              { title: "Mistake 1", desc: "Waiting too long without checking backup options." },
              { title: "Mistake 2", desc: "Comparing countries only by low fee." },
              { title: "Mistake 3", desc: "Choosing admission before understanding the full 6-year journey." },
            ].map((m) => (
              <div key={m.title} className="bg-white rounded-2xl p-5 border border-red-100">
                <p className="font-extrabold text-xs text-medical-red mb-1.5">{m.title}</p>
                <p className="text-xs text-navy-800 leading-relaxed m-0">{m.desc}</p>
              </div>
            ))}
          </div>

          <button
            onClick={openWhatsApp}
            className="inline-flex bg-navy-800 hover:bg-navy-700 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
          >
            Avoid These Mistakes — Get My Decision Map →
          </button>
        </div>
      </section>

      {/* ═══ URGENCY — TIMELINES ═══ */}
      <section
        className="py-16 md:py-20 px-4 sm:px-6"
        style={{ background: "linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-4">
            Confusion Becomes Expensive When Timelines Move.
          </h2>
          <p className="text-sm text-red-200 leading-relaxed mb-8 max-w-xl mx-auto">
            Most families do not lose options because they asked questions. They lose options because they waited too long to
            ask the right questions.
          </p>

          <p className="font-extrabold text-sm text-white mb-4">
            Even if you are not ready to decide today, you should know:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8 max-w-3xl mx-auto">
            {[
              "What your score can support",
              "Which countries are realistic",
              "Which documents may be needed",
              "What timeline your family is working with",
              "What questions to ask before paying anyone",
            ].map((item) => (
              <div key={item} className="rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.12)" }}>
                <p className="text-xs text-red-200 leading-relaxed m-0">— {item}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-red-200 leading-relaxed mb-8">
            Getting clarity now does not force a decision. It prevents a bad decision later.
          </p>

          <button
            onClick={openWhatsApp}
            className="inline-flex bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all"
            style={{ letterSpacing: "0.04em" }}
          >
            Check My Timeline Now →
          </button>
        </div>
      </section>

      {/* ═══ INDIA VS ABROAD ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-navy-800 leading-tight tracking-tight mb-5">
            Strong Score? India First.{" "}
            <span className="text-medical-blue">Uncertain Score? Plan Smart.</span>
          </h2>
          <p className="text-base text-warm-600 leading-relaxed mb-4 max-w-2xl mx-auto">
            If your NEET score is strong enough for your preferred India counselling path, that should be your first focus.
          </p>
          <p className="text-base text-warm-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            But if your score is uncertain, your family should not sit in confusion until every option becomes late. A calm
            backup plan does not mean giving up on India. It means your family is prepared.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            <div className="bg-green-50 rounded-2xl p-5 border border-green-100 text-left">
              <p className="font-extrabold text-sm text-green-700 mb-3">If India path looks possible</p>
              <ul className="space-y-1.5">
                {["Focus on counselling priorities", "Track seat possibilities", "Avoid distraction", "Decide with confidence"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-navy-800">
                      <span className="text-green-600 font-extrabold">✓</span> {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 text-left">
              <p className="font-extrabold text-sm text-medical-blue mb-3">If score is uncertain</p>
              <ul className="space-y-1.5">
                {["Build a safe backup plan", "Compare country options", "Prepare documents early", "Avoid last-minute pressure"].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-navy-800">
                      <span className="text-medical-blue font-extrabold">✓</span> {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <button
            onClick={openWhatsApp}
            className="inline-flex bg-navy-800 hover:bg-navy-700 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
          >
            Check My India vs Abroad Fit →
          </button>
        </div>
      </section>

      {/* ═══ FEE REALITY TABLE ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-warm-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-saffron-500 mb-2">
              The Real Numbers
            </span>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-navy-800 leading-tight tracking-tight">
              ₹3.5L Is The Starting Number.{" "}
              <span className="text-medical-red">{"Here's What's Usually Missing."}</span>
            </h2>
          </div>
          <div className="border-[1.5px] border-warm-200 rounded-2xl overflow-hidden shadow-lg">
            {COST_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-4 gap-4 ${i < COST_ROWS.length - 1 ? "border-b border-warm-100" : ""}`}
                style={{ background: i === 0 ? "#eff6ff" : "#fff" }}
              >
                <div>
                  <p className="font-bold text-sm text-navy-800 m-0">{row.label}</p>
                  <p className="text-[0.7rem] text-warm-500 mt-0.5 m-0">{row.note}</p>
                </div>
                <span
                  className={`text-[0.68rem] font-extrabold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${row.status === "quoted" ? "bg-blue-100 text-medical-blue" : "bg-red-100 text-medical-red"}`}
                >
                  {row.status === "quoted" ? "Usually Quoted" : "Often Hidden"}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-4 gap-4 bg-navy-800">
              <p className="font-extrabold text-sm text-white m-0">Realistic Total (6 Years)</p>
              <p className="font-extrabold text-sm text-saffron-500 m-0 flex-shrink-0">
                ₹22L – ₹45L depending on country
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COUNTRY COMPARISON ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-navy-800 leading-tight tracking-tight mb-3">
              8 Countries. 8 Different Realities.{" "}
              <span className="text-medical-blue">One Student Cannot Fit Everywhere.</span>
            </h2>
            <p className="text-base text-warm-600 leading-relaxed max-w-2xl mx-auto">
              MBBS abroad is not one simple option. Russia, Georgia, Uzbekistan, Kazakhstan, Vietnam, Bangladesh, Malaysia
              and Bosnia are not the same.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {COUNTRY_OPTIONS.map((c) => (
              <div
                key={c.name}
                className="group bg-white rounded-2xl p-4 border-[1.5px] border-warm-200 cursor-pointer transition-all hover:border-medical-blue hover:shadow-[0_4px_20px_rgba(29,78,216,0.1)]"
              >
                <div className="text-3xl mb-2">{c.flag}</div>
                <h3 className="font-extrabold text-navy-800 text-sm mb-1">{c.name}</h3>
                <p className="text-[0.72rem] text-warm-500 leading-relaxed m-0">{c.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-3xl p-6 sm:p-8 border border-blue-100 mb-8">
            <p className="font-extrabold text-sm text-navy-800 mb-4 text-center">Each country can differ in:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto">
              {COUNTRY_DIFF_FACTORS.map((f) => (
                <div key={f} className="bg-white rounded-xl px-3 py-3 text-center font-bold text-[0.75rem] text-navy-800 border border-blue-100">
                  {f}
                </div>
              ))}
            </div>
          </div>

          <p className="text-center font-extrabold text-lg text-navy-800 mb-2">
            &quot;Which country fits my child?&quot;
          </p>
          <p className="text-center text-sm text-warm-600 mb-8">
            That is the better first question. New Lyf helps families compare country fit before they compare admission
            offers.
          </p>

          <div className="text-center">
            <button
              onClick={openWhatsApp}
              className="inline-flex bg-navy-800 hover:bg-navy-700 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
            >
              Compare Countries For My Profile →
            </button>
          </div>
        </div>
      </section>

      {/* ═══ PARENT PSYCHOLOGY ═══ */}
      <section
        className="py-16 md:py-20 px-4 sm:px-6"
        style={{ background: "linear-gradient(145deg, #0a1628 0%, #1a3a6e 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold leading-tight tracking-tight mb-4">
            This Is Not Just Admission.{" "}
            <span className="text-saffron-500">{"This Is Your Child's Next 6 Years."}</span>
          </h2>

          <p className="text-base text-blue-200/90 leading-relaxed mb-6 max-w-2xl mx-auto">
            A student is not only going abroad to enter a university. They are going to live there. Study there. Eat there.
            Adjust there. Prepare for exams there. Build independence there.
          </p>

          <p className="font-extrabold text-sm text-saffron-400 mb-4">
            So before choosing any country or university, parents should be clear about:
          </p>

          <div className="text-left max-w-lg mx-auto mb-8 space-y-3">
            {[
              "Where will my child stay?",
              "How will they adjust to food, weather and culture?",
              "What is the real yearly cost?",
              "What support is available after admission?",
              "How does the academic pathway work?",
              "What is the future licensing direction?",
              "What happens after the student reaches the country?",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl p-3.5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <span className="text-saffron-500 font-extrabold flex-shrink-0 text-sm">◇</span>
                <p className="text-sm text-blue-200 leading-relaxed m-0">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-base text-blue-200/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            A good MBBS decision is not made from a brochure. It is made from a full roadmap.
          </p>

          <button
            onClick={openWhatsApp}
            className="inline-flex bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
          >
            {"Build My Child's 6-Year Roadmap →"}
          </button>
        </div>
      </section>

      {/* ═══ TRUST AND AUTHORITY ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-navy-800 leading-tight tracking-tight mb-3">
            Why Parents Speak To New Lyf <span className="text-medical-blue">Before Deciding</span>
          </h2>
          <p className="text-base text-warm-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Since 2009, New Lyf has helped 17,000+ students move toward their MBBS dream with structured counselling and
            family support.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-xl mx-auto">
            {[
              "Score clarity",
              "Country clarity",
              "Budget clarity",
              "Parent confidence",
              "Documentation planning",
              "Student journey support",
              "Future pathway direction",
            ].map((item) => (
              <div
                key={item}
                className="bg-blue-50 rounded-xl px-3 py-3 text-center font-bold text-[0.75rem] text-navy-800 border border-blue-100"
              >
                {item}
              </div>
            ))}
          </div>

          <p className="text-base text-navy-800 font-extrabold mb-8">
            New Lyf helps you slow down, understand clearly and then decide with confidence.
          </p>

          <button
            onClick={openWhatsApp}
            className="inline-flex bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
          >
            Speak To New Lyf First →
          </button>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-[clamp(1.3rem,3vw,1.75rem)] font-extrabold text-navy-800 mb-2">
            Students New Lyf Helped Find Their Path
          </h2>
          <p className="text-center text-sm text-warm-500 mb-10">
            Real students and parents who made confident MBBS decisions with New Lyf&apos;s counselling.
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-warm-200 shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover object-top border-2 border-blue-100 flex-shrink-0"
                  />
                  <p className="font-extrabold text-sm text-navy-800 m-0">{t.name}</p>
                </div>
                <p className="text-saffron-500 text-sm mb-2">★★★★★</p>
                <p className="text-[0.82rem] text-navy-800 leading-relaxed italic m-0">&quot;{t.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OBJECTION HANDLING ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-warm-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold text-navy-800 leading-tight tracking-tight mb-5">
            &quot;We Are Not Ready <span className="text-medical-blue">To Decide Yet.&quot;</span>
          </h2>
          <p className="text-base text-warm-600 leading-relaxed mb-6 max-w-xl mx-auto">
            That is exactly why you should book the session. This is not a final admission call. This is a clarity call.
          </p>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-100 mb-8 text-left max-w-lg mx-auto">
            {[
              "You do not need to choose a country today.",
              "You do not need to commit to a university today.",
              "You do not need to make payment today.",
              "You only need to understand your options before they become confusing, rushed or delayed.",
            ].map((line, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed m-0 ${i < 3 ? "mb-3" : ""} ${i === 3 ? "text-navy-800 font-extrabold" : "text-warm-600"}`}
              >
                <span className="text-green-600 font-extrabold mr-2">✓</span>
                {line}
              </p>
            ))}
          </div>

          <button
            onClick={openWhatsApp}
            className="inline-flex bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
          >
            Start With A Clarity Call →
          </button>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-[clamp(1.3rem,3vw,1.75rem)] font-extrabold text-navy-800 mb-2">
            Common Questions From Students And Parents
          </h2>
          <p className="text-center text-sm text-warm-500 mb-8">Get clear, honest answers before your next step.</p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-warm-50 rounded-xl border border-warm-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-navy-800 text-sm hover:bg-warm-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-saffron-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-warm-600 leading-relaxed animate-fade-in">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section
        className="py-16 md:py-20 px-4 sm:px-6"
        style={{ background: "linear-gradient(145deg, #0a1628 0%, #1a3a6e 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center text-white mb-8">
            <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-extrabold leading-tight tracking-tight mb-4">
              Your MBBS Dream Does Not Need Panic.{" "}
              <span className="text-saffron-500">It Needs A Plan.</span>
            </h2>
            <div className="text-sm text-blue-200 leading-relaxed space-y-1 mb-6">
              <p className="m-0">Before you wait blindly…</p>
              <p className="m-0">Before you compare random countries…</p>
              <p className="m-0">Before you believe the lowest-fee promise…</p>
              <p className="m-0">Before you choose a university…</p>
            </div>
            <p className="text-base text-white font-extrabold mb-6">
              First check your path with New Lyf. Get your free MBBS Decision Map and understand what fits your score, your
              budget, your family and your next six years.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={openWhatsApp}
              className="bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
              style={{ letterSpacing: "0.04em" }}
            >
              Get My Free MBBS Decision Map →
            </button>
            <button
              onClick={openWhatsApp}
              className="border-2 border-white/30 hover:border-white/60 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all"
            >
              Book Free Counselling →
            </button>
          </div>

          <p className="text-center text-[0.72rem] text-blue-300/60 leading-relaxed">
            🔒 No pressure. No rushed admission push. Just clarity before you decide. New Lyf will contact you on WhatsApp.
          </p>

          {/* End-of-page Roadmap Form on white card */}
          <div className="mt-10 bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <h3 className="font-extrabold text-xl text-navy-800 mb-1">
              Get Your Free Roadmap
            </h3>
            <p className="text-sm text-warm-500 mb-5 leading-relaxed">
              Personalised Fee + Country Fit Analysis — free, no commitment. Our counsellor calls within 24 hours.
            </p>
            <RoadmapForm source="footer" />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-navy-900 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Logo />
            <div className="flex flex-wrap items-center justify-center gap-4 text-[0.72rem] text-warm-500">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-and-conditions" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center text-[0.68rem] text-warm-600">
            <p className="m-0">
              © {new Date().getFullYear()} New-Lyf Overseas. All rights reserved. |{" "}
              <a href={`mailto:${CONFIG.email}`} className="hover:text-white transition-colors">{CONFIG.email}</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
