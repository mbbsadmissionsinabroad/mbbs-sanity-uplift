 "use client";

import React, { useState, useEffect } from "react";

/* ============================================================
   CONFIG
   ============================================================ */
const CONFIG = {
  whatsappNumber: "918147030030",
  whatsappMessage: "MBBS",
  phone: "+91 81470 30030",
  email: "info@newlyf.com",
  apiEndpoint: "/api/newlyf-leads",
  intakeDeadline: "2026-07-31T23:59:00",
};

/* ============================================================
   DATA
   ============================================================ */
const COUNTRIES = [
  { flag: "🇷🇺", name: "Russia", cost: "₹3.5–5.5L / yr", tagline: "Most popular pick", label: "High demand" },
  { flag: "🇬🇪", name: "Georgia", cost: "₹4–6L / yr", tagline: "English medium", label: "Good FMGE track" },
  { flag: "🇰🇿", name: "Kazakhstan", cost: "₹3.5–5L / yr", tagline: "Quality + budget", label: "NMC approved" },
  { flag: "🇺🇿", name: "Uzbekistan", cost: "₹3–4.5L / yr", tagline: "Lowest total cost", label: "Rising pick" },
  { flag: "🇻🇳", name: "Vietnam", cost: "₹4–6L / yr", tagline: "Emerging destination", label: "Quality campus" },
  { flag: "🇧🇦", name: "Bosnia", cost: "₹4–5.5L / yr", tagline: "European exposure", label: "Unique edge" },
  { flag: "🇵🇭", name: "Philippines", cost: "₹5–7L / yr", tagline: "US-pattern curriculum", label: "FMGE-ready" },
  { flag: "🇧🇩", name: "Bangladesh", cost: "₹4.5–6L / yr", tagline: "Close to home", label: "Similar culture" },
];

const COST_ROWS = [
  { label: "Tuition Fee", note: "What most consultants quote you", status: "quoted" },
  { label: "Hostel / Accommodation", note: "Often not included in quoted figure", status: "hidden" },
  { label: "Food & Meals", note: "₹4,000–8,000/month depending on country", status: "hidden" },
  { label: "Visa & Documentation", note: "₹25,000–60,000 one-time cost", status: "hidden" },
  { label: "Return Travel", note: "₹40,000–80,000 per year", status: "hidden" },
  { label: "Living Expenses", note: "Varies heavily by country and city", status: "hidden" },
];

const SEVEN_POINTS = [
  { num: "01", title: "NEET Score & Eligibility Check", desc: "We verify your 2024/2025 score qualifies for your target country's intake rules and current timeline." },
  { num: "02", title: "Country Safety & NMC Status", desc: "Only NMC-approved universities in countries with verified student safety records are recommended." },
  { num: "03", title: "University FMGE Track Record", desc: "We check historical FMGE pass rates for every university before placing any student." },
  { num: "04", title: "Total Budget — Not Just Tuition", desc: "Full 6-year cost modelled: tuition + hostel + food + visa + travel + living expenses." },
  { num: "05", title: "Documentation Timeline", desc: "Docs take 45+ days. We map your exact checklist from Day 1 and begin immediately." },
  { num: "06", title: "Visa & Legal Compliance", desc: "Country-specific visa rules, apostille requirements, and embassy interview prep — handled with you." },
  { num: "07", title: "India Return Pathway", desc: "NExT exam pathway and FMGE eligibility confirmed before you leave India." },
];

const TESTIMONIALS = [
  { name: "Priya R.", city: "Bangalore", tag: "NEET 2024", result: "Now studying — Georgia", text: "Three consultants gave me three different fees. Newlyf was the first to show me a full, honest cost breakdown. I finally understood what I was actually committing to." },
  { name: "Mr. Ramesh K.", city: "Chennai", tag: "Parent", result: "Daughter enrolled — Kazakhstan", text: "My daughter qualified NEET but we had no idea where to start. Newlyf compared 4 countries within our budget and guided us through every single document step." },
  { name: "Arjun M.", city: "Hyderabad", tag: "NEET 2025", result: "Now studying — Russia", text: "August intake felt impossible with all the documents required. Newlyf started my documentation the same day I called. Made the intake with time to spare." },
];

const FAQS = [
  { q: "Is MBBS abroad valid in India?", a: "Yes — provided the university is NMC-approved. You must clear FMGE/NExT to practice. We only recommend universities with proven NMC recognition and strong FMGE pass records." },
  { q: "What is the true total cost (all-inclusive)?", a: "The realistic 6-year cost ranges from ₹22L–₹45L depending on country. This includes tuition, hostel, food, visa, travel, and living — not just the tuition figure most consultants quote." },
  { q: "Is NEET qualification mandatory?", a: "Yes. NMC mandates NEET qualification for Indian students pursuing MBBS abroad. Scores are valid for 3 years. If you haven't qualified yet, we guide you on the timeline." },
  { q: "Which country is best for me?", a: "There's no single 'best' country — it depends on your budget, NEET score, climate preference, and FMGE goals. Our free counselling matches you to 2–3 countries that fit your specific profile." },
  { q: "What about language barriers?", a: "All universities we recommend teach in English. Most include local language classes for clinical rotations in later years." },
  { q: "Can I get an education loan?", a: "Yes. SBI, HDFC, Axis, and other banks provide education loans for NMC-approved universities. We guide you through the documentation." },
  { q: "How long does the admission process take?", a: "Approximately 45–60 days from NEET qualification to classroom. Documentation is the longest step — we start immediately after your first call." },
];

/* ============================================================
   UTILITY
   ============================================================ */
const openWhatsApp = () => {
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`, "_blank");
};
const pad = (n) => String(n).padStart(2, "0");

/* ============================================================
   LEAD FORM
   ============================================================ */
function LeadForm({ source, compact = false }) {
  const [form, setForm] = useState({ name: "", phone: "", neetYear: "", city: "", country: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => { const n = { ...prev }; delete n[e.target.name]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "Full name is required";
    const phone = form.phone.replace(/\D/g, "");
    if (!phone || phone.length !== 10) e.phone = "Valid 10-digit number required";
    if (!form.neetYear) e.neetYear = "Select your NEET year";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
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

  const inputClass = "w-full border-[1.5px] border-warm-200 rounded-xl px-4 py-3 text-sm text-navy-800 placeholder:text-warm-400 outline-none transition-all focus:border-medical-blue focus:ring-[3px] focus:ring-medical-blue/8 bg-white";
  const errorClass = "text-medical-red text-xs mt-1 ml-1";

  if (status === "success") {
    return (
      <div className="text-center py-6 animate-fade-in">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="font-extrabold text-lg text-green-700 mb-2">Details Received!</h3>
        <p className="text-sm text-warm-500 mb-4 leading-relaxed">Our counsellor will call you within 24 hours with your personalised Fee + Country Roadmap.</p>
        <button onClick={openWhatsApp} className="w-full bg-wa hover:bg-wa-hover text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
          📲 WhatsApp for Instant Response
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-4 animate-fade-in">
        <p className="text-medical-red font-bold text-sm mb-4">Something went wrong. Please reach us on WhatsApp directly.</p>
        <button onClick={openWhatsApp} className="w-full bg-wa hover:bg-wa-hover text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
          📲 WhatsApp "MBBS" Now
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 animate-fade-in">
        <input name="name" placeholder="Full Name *" value={form.name} onChange={onChange} className={`${inputClass} bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-saffron-500 focus:ring-saffron-500/20`} />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
        <input name="phone" placeholder="WhatsApp / Phone Number *" value={form.phone} onChange={onChange} inputMode="numeric" className={`${inputClass} bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-saffron-500 focus:ring-saffron-500/20`} />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        <select name="neetYear" value={form.neetYear} onChange={onChange} className={`${inputClass} bg-white/5 border-white/20 text-white/80 focus:border-saffron-500 focus:ring-saffron-500/20`}>
          <option value="">NEET Qualified Year *</option>
          <option value="2025">NEET 2025</option>
          <option value="2024">NEET 2024</option>
          <option value="2023">NEET 2023</option>
          <option value="parent">I'm a Parent / Guardian</option>
        </select>
        {errors.neetYear && <p className={errorClass}>{errors.neetYear}</p>}
        <button type="submit" disabled={status === "loading"} className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center" style={{ letterSpacing: "0.04em" }}>
          {status === "loading" ? "Sending…" : "GET MY FREE FEE + COUNTRY ROADMAP →"}
        </button>
        <p className="text-center text-[0.65rem] text-white/50">🔒 Free. Confidential. No commitment.</p>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input name="name" placeholder="Full Name *" value={form.name} onChange={onChange} className={inputClass} />
      {errors.name && <p className={errorClass}>{errors.name}</p>}
      <input name="phone" placeholder="WhatsApp / Phone Number *" value={form.phone} onChange={onChange} inputMode="numeric" className={inputClass} />
      {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      <select name="neetYear" value={form.neetYear} onChange={onChange} className={`${inputClass} text-warm-500`}>
        <option value="">NEET Qualified Year *</option>
        <option value="2025">NEET 2025</option>
        <option value="2024">NEET 2024</option>
        <option value="2023">NEET 2023</option>
        <option value="parent">I'm a Parent / Guardian</option>
      </select>
      {errors.neetYear && <p className={errorClass}>{errors.neetYear}</p>}
      <input name="city" placeholder="Your City" value={form.city} onChange={onChange} className={inputClass} />
      <select name="country" value={form.country} onChange={onChange} className={`${inputClass} text-warm-500`}>
        <option value="">Preferred Country (Optional)</option>
        <option value="russia">Russia</option>
        <option value="georgia">Georgia</option>
        <option value="kazakhstan">Kazakhstan</option>
        <option value="uzbekistan">Uzbekistan</option>
        <option value="vietnam">Vietnam</option>
        <option value="bosnia">Bosnia</option>
        <option value="philippines">Philippines</option>
        <option value="bangladesh">Bangladesh</option>
        <option value="unsure">Not Sure — Help Me Decide</option>
      </select>
      <button type="submit" disabled={status === "loading"} className="w-full bg-saffron-500 hover:bg-saffron-600 disabled:opacity-60 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center animate-pulse-cta" style={{ letterSpacing: "0.04em" }}>
        {status === "loading" ? "Sending…" : "GET MY FREE FEE + COUNTRY ROADMAP →"}
      </button>
      <p className="text-center text-[0.65rem] text-warm-400">🔒 Free. Confidential. No commitment required.</p>
    </form>
  );
}

/* ============================================================
   MODAL (Popup Lead Form)
   ============================================================ */
function Modal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-navy-900/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[24px] shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-warm-100 flex items-center justify-between z-10 rounded-t-[24px]">
          <h2 className="text-lg font-extrabold text-navy-800">🎓 Get Your Free Roadmap</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-warm-500 hover:text-navy-700 transition-all">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="px-6 py-5">
          <LeadForm source="modal" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LOGO COMPONENT
   ============================================================ */
function Logo({ className = "", showText = true }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* SVG Icon */}
      <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Leaf */}
        <path
          d="M 48 65 C 30 65 22 48 30 36 C 37 26 48 40 48 56 Z"
          fill="#00df89"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Right Leaf */}
        <path
          d="M 48 56 C 56 56 64 48 60 38 C 56 30 48 40 48 48 Z"
          fill="#a6ec55"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arch & Stem */}
        <path
          d="M 48 65 L 48 90 L 25 90 C 18 90 15 87 15 80 L 15 45 C 15 25 30 10 50 10 C 70 10 85 25 85 45 L 85 80 C 85 87 82 90 75 90 L 65 90"
          stroke="#000000"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
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
function NewLyfLandingPage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Countdown timer
  useEffect(() => {
    const target = new Date(CONFIG.intakeDeadline);
    const tick = () => {
      const diff = target - Date.now();
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

  // Scroll detection for navbar shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-navy-800 antialiased">
      {/* ═══════════════════════════════════════════════════════════
          STICKY NAVBAR
      ═══════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "shadow-md py-1.5" : "shadow-sm py-2.5"}`} style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2.5">
            <a href={`tel:${CONFIG.whatsappNumber}`} className="hidden md:flex font-bold text-xs text-navy-800 no-underline">📞 {CONFIG.phone}</a>
            <button onClick={openWhatsApp} className="bg-wa hover:bg-wa-hover text-white font-extrabold text-xs py-2 px-4 rounded-full transition-all flex items-center gap-1.5">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="pt-24 pb-16 md:pt-28 md:pb-20 px-4 sm:px-6" style={{ background: "linear-gradient(145deg, #0a1628 0%, #1a3a6e 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div className="text-white">
              {/* Urgency pill */}
              <div className="inline-flex items-center gap-1.5 bg-saffron-500 text-white text-[0.72rem] font-extrabold px-3.5 py-1.5 rounded-full mb-5">
                ⚡ August 2026 Intake — Documentation Closing Fast
              </div>

              {/* Headline — message-matched to ad */}
              <h1 className="text-[clamp(1.75rem,4vw,2.4rem)] font-extrabold leading-[1.2] tracking-tight mb-4">
                MBBS Abroad From ₹3.5L —{" "}
                <span className="text-saffron-500">But Does The Fee They Showed You Include Everything?</span>
              </h1>

              <p className="text-base leading-relaxed text-blue-200/90 mb-6">
                2024–2025 NEET Qualified? Your eligibility window is open — but August intake moves fast.
                Get your <strong className="text-white">Free Fee + Country Fit Roadmap</strong> before making any decision.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["✅ Since 2009", "✅ 17,000+ Students", "✅ Free Counselling", "✅ NMC-Approved Only"].map((b) => (
                  <span key={b} className="text-[0.7rem] px-3 py-1 rounded-full font-semibold text-blue-200" style={{ background: "rgba(255,255,255,0.12)" }}>{b}</span>
                ))}
              </div>

              {/* Happy Student Avatars Visual Hook */}
              <div className="flex items-center gap-3.5 mb-6 bg-white/5 border border-white/10 rounded-2xl p-3.5 max-w-md">
                <div className="flex -space-x-3">
                  <img src="/students/neil-issac-russia.jpeg" className="w-10 h-10 rounded-full border-2 border-navy-900 object-cover object-top" alt="Neil Issac" />
                  <img src="/students/patil-vedant-russia.jpeg" className="w-10 h-10 rounded-full border-2 border-navy-900 object-cover object-top" alt="Patil Vedant" />
                  <img src="/students/pearl-russia.jpeg" className="w-10 h-10 rounded-full border-2 border-navy-900 object-cover object-top" alt="Pearl" />
                  <img src="/students/shefali-gautam-germany.png" className="w-10 h-10 rounded-full border-2 border-navy-900 object-cover object-top" alt="Shefali Gautam" />
                </div>
                <div>
                  <div className="flex items-center gap-0.5 text-saffron-400 text-xs">
                    {"★★★★★".split("").map((star, idx) => (
                      <span key={idx}>{star}</span>
                    ))}
                    <span className="text-white font-extrabold ml-1.5 text-xs">4.9/5 Rating</span>
                  </div>
                  <p className="text-[0.75rem] text-blue-200/90 leading-tight m-0 mt-0.5">
                    Trusted by 17,000+ Indian students abroad
                  </p>
                </div>
              </div>

              {/* Mobile-only primary CTA */}
              <button onClick={openWhatsApp} className="lg:hidden w-full bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all mb-5 flex items-center justify-center" style={{ letterSpacing: "0.04em" }}>
                📲 WhatsApp "MBBS" Now → Free Roadmap
              </button>

              {/* Countdown */}
              <div className="rounded-2xl p-4 sm:p-5" style={{ background: "rgba(255,255,255,0.1)" }}>
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-blue-300 mb-3">⏳ Estimated Time Left for August 2026 Intake</p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {[
                    { val: timeLeft.days, label: "Days" },
                    { val: timeLeft.hours, label: "Hours" },
                    { val: timeLeft.minutes, label: "Minutes" },
                    { val: timeLeft.seconds, label: "Seconds" },
                  ].map(({ val, label }) => (
                    <div key={label} className="rounded-xl py-3 px-1 sm:py-3.5" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <div className="text-2xl sm:text-3xl font-extrabold text-saffron-500 leading-none">{pad(val)}</div>
                      <div className="text-[0.6rem] text-blue-300 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Lead Form Card */}
            <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <h2 className="font-extrabold text-lg text-navy-800 mb-1">Get Your Free Roadmap</h2>
              <p className="text-sm text-warm-500 mb-5 leading-relaxed">Personalised Fee + Country Fit Analysis — free, no commitment. Our counsellor calls within 24 hours.</p>
              <LeadForm source="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROBLEM STRIP
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-10 px-4 sm:px-6" style={{ background: "#fff5f5", borderTop: "1px solid #fecaca", borderBottom: "1px solid #fecaca" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-medical-red mb-5">What Most Consultants Don't Tell You</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "❌", text: "They show tuition only — not the full 6-year cost you will actually spend" },
              { icon: "❌", text: "They don't verify your NEET score fits the country's specific intake rules" },
              { icon: "❌", text: "They don't explain the India return pathway — NExT or FMGE — before you leave" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-red-100">
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <p className="text-[0.8rem] font-semibold text-navy-800 leading-relaxed m-0">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEE REALITY TABLE
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-saffron-500 mb-2">The Real Numbers</span>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-navy-800 leading-tight tracking-tight">
              ₹3.5L Is The Starting Number.{" "}
              <span className="text-medical-red">Here's What's Usually Missing.</span>
            </h2>
          </div>

          <div className="border-[1.5px] border-warm-200 rounded-2xl overflow-hidden shadow-lg">
            {COST_ROWS.map((row, i) => (
              <div key={row.label} className={`flex items-center justify-between px-5 py-4 gap-4 ${i < COST_ROWS.length - 1 ? "border-b border-warm-100" : ""}`} style={{ background: i === 0 ? "#eff6ff" : "#fff" }}>
                <div>
                  <p className="font-bold text-sm text-navy-800 m-0">{row.label}</p>
                  <p className="text-[0.7rem] text-warm-500 mt-0.5 m-0">{row.note}</p>
                </div>
                <span className={`text-[0.68rem] font-extrabold px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${row.status === "quoted" ? "bg-blue-100 text-medical-blue" : "bg-red-100 text-medical-red"}`}>
                  {row.status === "quoted" ? "Usually Quoted" : "Often Hidden"}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between px-5 py-4 gap-4 bg-navy-800">
              <p className="font-extrabold text-sm text-white m-0">Realistic Total (6 Years)</p>
              <p className="font-extrabold text-sm text-saffron-500 m-0 flex-shrink-0">₹22L – ₹45L depending on country</p>
            </div>
          </div>

          <p className="text-center text-sm text-warm-500 mt-5">
            Newlyf builds your <strong className="text-navy-800">complete 6-year budget plan</strong> before you make any decision.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          COUNTRY CARDS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-saffron-500 mb-2">8 Countries. 8 Different Realities.</span>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-navy-800 leading-tight tracking-tight">
              Every Country Is Different.{" "}
              <span className="text-medical-blue">Not Every Country Fits You.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {COUNTRIES.map((c) => (
              <div key={c.name} className="group bg-white rounded-2xl p-4 border-[1.5px] border-warm-200 cursor-pointer transition-all hover:border-medical-blue hover:shadow-[0_4px_20px_rgba(29,78,216,0.1)]">
                <div className="text-3xl mb-2">{c.flag}</div>
                <h3 className="font-extrabold text-navy-800 text-sm mb-1">{c.name}</h3>
                <p className="font-bold text-[0.78rem] text-saffron-600 mb-1">{c.cost}</p>
                <p className="text-[0.7rem] text-warm-500 mb-2">{c.tagline}</p>
                <span className="inline-block text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-medical-blue">{c.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => setShowModal(true)} className="inline-flex bg-navy-800 hover:bg-navy-700 text-white font-extrabold text-sm py-4 px-8 rounded-2xl transition-all">
              📲 Find Which Country Fits Me → Free Check
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HAPPY STUDENTS VISUAL SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white border-b border-warm-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-saffron-500 mb-2">Visual Proof</span>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-navy-800 leading-tight tracking-tight">
              Meet Our Happy Students <span className="text-medical-blue">Thriving Abroad</span>
            </h2>
            <p className="text-sm text-warm-500 mt-3 leading-relaxed max-w-xl mx-auto">
              Real Indian students who found their perfect university and budget match through New Lyf.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: "/students/neil-issac-russia.jpeg",
                name: "Neil Issac",
                country: "Russia",
                flag: "🇷🇺",
                status: "Year 2 Student",
                uni: "Orenburg State Medical Univ.",
                quote: "Newlyf laid out every single charge transparently. Studying here is amazing and within our budget!"
              },
              {
                img: "/students/patil-vedant-russia.jpeg",
                name: "Patil Vedant",
                country: "Georgia",
                flag: "🇬🇪",
                status: "Year 1 Student",
                uni: "Tbilisi State Medical Univ.",
                quote: "The NMC guidelines were confusing, but Newlyf mapped my documentation from Day 1. Georgia is extremely safe!"
              },
              {
                img: "/students/pearl-russia.jpeg",
                name: "Pearl",
                country: "Kazakhstan",
                flag: "🇰🇿",
                status: "Year 3 Student",
                uni: "Astana Medical University",
                quote: "Modern labs and English-medium curriculum. My FMGE roadmap started from the very first semester."
              },
              {
                img: "/students/shefali-gautam-germany.png",
                name: "Shefali Gautam",
                country: "Philippines",
                flag: "🇵🇭",
                status: "Year 4 Clinicals",
                uni: "Davao Medical School Foundation",
                quote: "The US-pattern curriculum here is a huge advantage for my career goals. Newlyf guided me every step."
              }
            ].map((student) => (
              <div key={student.name} className="group rounded-[28px] overflow-hidden border border-warm-200/80 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/5] overflow-hidden bg-warm-100">
                  <img
                    src={student.img}
                    alt={student.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-5 py-4 text-center">
                  <h3 className="font-extrabold text-base text-navy-800 m-0">{student.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          7-POINT UNIVERSITY SAFETY CHECK
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-saffron-500 mb-2">Our Proprietary Process</span>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-navy-800 leading-tight tracking-tight">
              The Newlyf{" "}
              <span className="text-medical-blue">7-Point University Safety Check</span>
            </h2>
            <p className="text-sm text-warm-500 mt-3 leading-relaxed max-w-xl mx-auto">
              Before we recommend any university in any country, every student goes through this checklist.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {SEVEN_POINTS.map((pt) => (
              <div key={pt.num} className="flex items-start gap-4 bg-warm-50 rounded-2xl p-4 sm:p-5 border border-warm-200">
                <span className="text-2xl font-extrabold text-blue-200 flex-shrink-0 leading-none w-10">{pt.num}</span>
                <div>
                  <h3 className="font-extrabold text-sm text-navy-800 mb-1">{pt.title}</h3>
                  <p className="text-xs text-warm-500 leading-relaxed m-0">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          URGENCY — August Intake
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)" }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-red-200 mb-2">Time-Sensitive</span>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-8">August Intake Is Moving Fast</h2>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "📋", title: "45+ Days", desc: "Average documentation timeline for MBBS abroad" },
              { icon: "📅", title: "August Intake", desc: "Most universities close applications in July" },
              { icon: "✈️", title: "Act Now", desc: "NEET 2024–2025 eligibility window is closing" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="font-extrabold text-lg text-white mb-1">{item.title}</p>
                <p className="text-sm text-red-200 leading-relaxed m-0">{item.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={openWhatsApp} className="inline-flex bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-4 px-8 rounded-xl transition-all" style={{ letterSpacing: "0.04em" }}>
            📲 WhatsApp "MBBS" — Check My Timeline Now
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST STATS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-saffron-500 mb-2">Track Record</span>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-navy-800 leading-tight tracking-tight mb-8">
            Since 2009.{" "}
            <span className="text-medical-blue">17,000+ Students. One Process.</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "17,000+", label: "Students Guided" },
              { num: "15+", label: "Years of Experience" },
              { num: "6+", label: "Countries Covered" },
            ].map((s) => (
              <div key={s.label} className="bg-blue-50 rounded-2xl py-6 px-3">
                <p className="font-extrabold text-[clamp(1.4rem,4vw,2rem)] text-navy-700 m-0 mb-1">{s.num}</p>
                <p className="text-xs text-warm-500 m-0">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-[clamp(1.3rem,3vw,1.75rem)] font-extrabold text-navy-800 mb-8">What Students & Parents Say</h2>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-5 sm:p-6 border border-warm-200 shadow-sm">
                <p className="text-saffron-500 text-sm mb-3">★★★★★</p>
                <p className="text-[0.82rem] text-navy-800 leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-extrabold text-[0.82rem] text-navy-800 m-0">{t.name}</p>
                    <p className="text-[0.7rem] text-warm-500 mt-0.5 m-0">{t.city} · {t.tag}</p>
                  </div>
                  <span className="text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700 whitespace-nowrap">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-[clamp(1.3rem,3vw,1.75rem)] font-extrabold text-navy-800 mb-8">❓ Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-warm-50 rounded-xl border border-warm-200 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-navy-800 text-sm hover:bg-warm-100 transition-colors">
                  <span>{faq.q}</span>
                  <svg className={`w-5 h-5 text-saffron-500 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM CTA + SECOND FORM
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6" style={{ background: "linear-gradient(145deg, #0a1628 0%, #1a3a6e 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center text-white mb-8">
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-extrabold leading-tight tracking-tight mb-3">
              Affordable Options Exist.{" "}
              <span className="text-saffron-500">The Right Choice Starts With The Right Counselling.</span>
            </h2>
            <p className="text-sm text-blue-200 leading-relaxed max-w-lg mx-auto">
              Get your personalised Fee + Country Roadmap — free, no commitment, within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            <LeadForm source="bottom-cta" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-blue-300">
            <span>📞 {CONFIG.phone}</span>
            <span>·</span>
            <span>✉️ {CONFIG.email}</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════ */}
      <footer className="py-6 px-4 sm:px-6 text-center text-[0.7rem] text-warm-500 leading-relaxed" style={{ background: "#0a0f1e" }}>
        <p className="mb-1">© {new Date().getFullYear()} New Lyf Consultancy. All rights reserved.</p>
        <p className="max-w-2xl mx-auto">
          For informational purposes only. MBBS abroad eligibility and fees are subject to NMC and respective country guidelines.
          Fees mentioned are indicative and may vary by university and admission year.
        </p>
      </footer>

      {/* ═══════════════════════════════════════════════════════════
          FIXED MOBILE BOTTOM BAR
      ═══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white border-t border-warm-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-3 py-3">
        <div className="flex gap-2.5">
          <a href={`tel:${CONFIG.whatsappNumber}`} className="flex-1 flex items-center justify-center gap-1 bg-warm-50 text-navy-800 font-extrabold text-sm py-3.5 rounded-xl no-underline">
            📞 Call
          </a>
          <button onClick={openWhatsApp} className="flex-[2] bg-saffron-500 hover:bg-saffron-600 text-white font-extrabold text-sm py-3.5 rounded-xl transition-all flex items-center justify-center animate-pulse-cta" style={{ letterSpacing: "0.04em" }}>
            📲 WhatsApp "MBBS" →
          </button>
        </div>
      </div>

      {/* Spacer for mobile sticky bar */}
      <div className="lg:hidden h-20" />

      {/* ═══════════════════════════════════════════════════════════
          POPUP MODAL
      ═══════════════════════════════════════════════════════════ */}
      <Modal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}

export default NewLyfLandingPage;
