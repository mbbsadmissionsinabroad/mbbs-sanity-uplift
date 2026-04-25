"use client";

import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  PhoneCall,
  PlayCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NeetStatus =
  | "Appearing NEET 2026"
  | "Repeater"
  | "Qualified Earlier"
  | "";

type ScoreRange = "Below 350" | "350-450" | "450-550" | "550+" | "";

interface LeadFormData {
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  neetStatus: NeetStatus;
  neetScoreRange: ScoreRange;
  sameAsMobile: boolean;
}

interface VideoStory {
  title: string;
  videoId: string;
  caption: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface CostSnapshot {
  country: string;
  estimate: string;
  note: string;
}

interface LandingEventPayload {
  type: "form_submission" | "cta_click";
  page: string;
  source: string;
  ctaLabel?: string;
  ctaDestination?: string;
  fullName?: string;
  mobile?: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  neetStatus?: string;
  neetScoreRange?: string;
  message?: string;
}

interface ConsultationModalState {
  source: string;
  ctaLabel: string;
}

const BRAND_NAME = "New-Lyf";
const heroVideoId = "FDSSu6Tns6s";
const landingPagePath = "/neet-qualifying-score-mbbs-abroad";

const latestCutoffRows = [
  {
    category: "General / EWS",
    qualifyingScore: "144+",
    note: "NEET-UG 2025 official qualifying range released by NTA: 686-144.",
  },
  {
    category: "OBC / SC / ST",
    qualifyingScore: "113+",
    note: "NEET-UG 2025 official qualifying range released by NTA: 143-113.",
  },
  {
    category: "General / EWS PwBD",
    qualifyingScore: "127+",
    note: "NEET-UG 2025 official qualifying range released by NTA: 143-127.",
  },
  {
    category: "OBC / SC / ST PwBD",
    qualifyingScore: "113+",
    note: "NEET-UG 2025 official qualifying range released by NTA: 126-113.",
  },
];

const countries = [
  "Russia",
  "Kazakhstan",
  "Philippines",
  "Georgia",
  "Uzbekistan",
  "Kyrgyzstan",
];

const testimonialVideos: VideoStory[] = [
  {
    title: "Parents and students speak before their MBBS journey",
    videoId: "vKHY0nURC6k",
    caption:
      "Parents and students talk through the decision before starting MBBS in Russia.",
  },
  {
    title: "Student from Karnataka to Russia",
    videoId: "-YRc7hsOFYY",
    caption:
      "A real student story about starting MBBS in Russia with guided support from New-Lyf.",
  },
  {
    title: "Student from Tamil Nadu to Russia",
    videoId: "jl05lKF5Xxw",
    caption:
      "A student explains how clarity replaced confusion after counselling and shortlisting.",
  },
  {
    title: "Journey to White Coats",
    videoId: "qzImQeZL7v0",
    caption:
      "A look at how Indian students move from uncertainty to a practical MBBS abroad plan.",
  },
  {
    title: "Why I chose Kadyrov Chechen State Medical University",
    videoId: "4w-vvKmiEPo",
    caption:
      "A student explains why choosing a recognised university felt safer and more confident.",
  },
];

const costSnapshots: CostSnapshot[] = [
  {
    country: "Russia",
    estimate: "INR 24-30 Lakhs total",
    note: "Current New-Lyf country pages show Russia as one of the more budget-friendly full-course options.",
  },
  {
    country: "Kazakhstan",
    estimate: "USD 29,500 tuition example + living",
    note: "Current site examples show total tuition around this level, with hostel and living added separately.",
  },
  {
    country: "Philippines",
    estimate: "INR 2.5-3.8 Lakhs tuition per year",
    note: "Current site examples also mention hostel around INR 15,000 per month depending on city and accommodation.",
  },
  {
    country: "Georgia",
    estimate: "EUR 24,000-36,000 tuition total",
    note: "Current site examples also cite roughly EUR 300-500 monthly living costs depending on the city.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Is a NEET qualifying score really enough for MBBS abroad?",
    answer:
      "Yes. For many NMC-approved MBBS programmes abroad, a qualifying NEET score is enough for eligibility. The exact admission fit still depends on country, university, budget, and seat availability.",
  },
  {
    question: "What are the latest NEET qualifying marks I should know?",
    answer:
      "The most recent officially released NTA cutoffs for NEET-UG 2025 were 144 and above for General/EWS, 113 and above for OBC/SC/ST, 127 and above for General/EWS PwBD, and 113 and above for OBC/SC/ST PwBD. These figures change every year, so the counselling call should always use the latest released result year.",
  },
  {
    question: "Will an MBBS abroad degree be recognised in India?",
    answer:
      "New-Lyf focuses on recognised, NMC-approved pathways. After completing the degree and any required licensing or screening requirements, students can still follow the route toward practising in India.",
  },
  {
    question: "Which countries do you usually shortlist for qualifying-score students?",
    answer:
      "Depending on score, budget, and preference, common options discussed include Russia, Kazakhstan, Philippines, Georgia, Uzbekistan, and Kyrgyzstan.",
  },
  {
    question: "Is the first counselling call free?",
    answer:
      "Yes. The initial call or WhatsApp discussion is free and is meant to help students and parents understand whether MBBS abroad is realistic for them.",
  },
  {
    question: "What if my NEET score is low or borderline?",
    answer:
      "That is exactly where counselling helps. Many students with average or borderline scores still find practical options abroad, but it depends on budget, timing, and country fit.",
  },
  {
    question: "How do I avoid fraud or the wrong consultancy?",
    answer:
      "Work only with recognised university options, insist on transparent cost discussions, review current student stories, and ask direct questions about university approval, admission flow, and post-admission support.",
  },
  {
    question: "When should I start planning for the 2026 intake?",
    answer:
      "Earlier is better. Counselling, country shortlisting, document checks, and visa planning all become smoother when families start before intake deadlines and travel windows tighten.",
  },
];

const initialFormData: LeadFormData = {
  fullName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  neetStatus: "",
  neetScoreRange: "",
  sameAsMobile: true,
};

async function postLandingEvent(payload: LandingEventPayload) {
  await fetch("/api/landing-events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  });
}

function buildEmailPayload(formData: LeadFormData, source: string) {
  const effectiveWhatsapp = formData.sameAsMobile
    ? formData.mobile
    : formData.whatsapp;

  return [
    { Attribute: "Name", Value: formData.fullName },
    { Attribute: "Mobile", Value: formData.mobile },
    { Attribute: "WhatsApp", Value: effectiveWhatsapp },
    { Attribute: "Email", Value: formData.email || "Not provided" },
    { Attribute: "City", Value: formData.city },
    { Attribute: "NEET Status", Value: formData.neetStatus },
    { Attribute: "Expected / Last NEET Score", Value: formData.neetScoreRange },
    { Attribute: "Lead Source", Value: source },
  ];
}

function FormField({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

function VideoCard({
  video,
  isActive,
  onActivate,
}: {
  video: VideoStory;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <article className="snap-start overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="relative aspect-[4/5] bg-slate-950 sm:aspect-[9/16]">
        {isActive ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={onActivate}
            className="group absolute inset-0 w-full text-left"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.72), rgba(15,23,42,0.18)), url(https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex h-full flex-col justify-between p-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                <PlayCircle className="h-4 w-4" />
                Play Story
              </span>
              <span className="text-sm leading-6 text-slate-100">
                Tap to load the video
              </span>
            </div>
          </button>
        )}
      </div>
      <div className="space-y-3 p-5">
        <h3 className="text-base font-bold leading-6 text-slate-950">
          {video.title}
        </h3>
        <p className="text-sm leading-6 text-slate-600">{video.caption}</p>
      </div>
    </article>
  );
}

function LeadForm({
  formIdPrefix,
  formData,
  isSubmitting,
  onInputChange,
  onCheckboxChange,
  onStatusChange,
  onSubmit,
}: {
  formIdPrefix: string;
  formData: LeadFormData;
  isSubmitting: boolean;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: NeetStatus) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const inputClassName =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  const statusOptions: NeetStatus[] = [
    "Appearing NEET 2026",
    "Repeater",
    "Qualified Earlier",
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField id={`${formIdPrefix}-fullName`} label="Full Name" required>
          <input
            id={`${formIdPrefix}-fullName`}
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={onInputChange}
            className={inputClassName}
            placeholder="Enter your full name"
            required
          />
        </FormField>

        <FormField id={`${formIdPrefix}-mobile`} label="Mobile" required>
          <input
            id={`${formIdPrefix}-mobile`}
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={onInputChange}
            className={inputClassName}
            placeholder="Enter your mobile number"
            required
          />
        </FormField>

        <div className="space-y-3 md:col-span-2">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label
              htmlFor={`${formIdPrefix}-whatsapp`}
              className="text-sm font-semibold text-slate-700"
            >
              WhatsApp Number *
            </label>
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
              <input
                type="checkbox"
                name="sameAsMobile"
                checked={formData.sameAsMobile}
                onChange={onCheckboxChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
              />
              WhatsApp number is same as mobile
            </label>
          </div>
          <input
            id={`${formIdPrefix}-whatsapp`}
            name="whatsapp"
            type="tel"
            value={formData.sameAsMobile ? formData.mobile : formData.whatsapp}
            onChange={onInputChange}
            disabled={formData.sameAsMobile}
            className={`${inputClassName} ${
              formData.sameAsMobile ? "cursor-not-allowed bg-slate-100 text-slate-500" : ""
            }`}
            placeholder="Enter your WhatsApp number"
            required
          />
        </div>

        <FormField id={`${formIdPrefix}-email`} label="Email ID">
          <input
            id={`${formIdPrefix}-email`}
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange}
            className={inputClassName}
            placeholder="Optional, but useful for sending details"
          />
        </FormField>

        <FormField id={`${formIdPrefix}-city`} label="City" required>
          <input
            id={`${formIdPrefix}-city`}
            name="city"
            type="text"
            value={formData.city}
            onChange={onInputChange}
            className={inputClassName}
            placeholder="Enter your city"
            required
          />
        </FormField>

        <FormField
          id={`${formIdPrefix}-neetScoreRange`}
          label="Expected / Last NEET Score"
          required
        >
          <select
            id={`${formIdPrefix}-neetScoreRange`}
            name="neetScoreRange"
            value={formData.neetScoreRange}
            onChange={onInputChange}
            className={inputClassName}
            required
          >
            <option value="">Select your score range</option>
            <option value="Below 350">Below 350</option>
            <option value="350-450">350-450</option>
            <option value="450-550">450-550</option>
            <option value="550+">550+</option>
          </select>
        </FormField>
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-slate-700">
          NEET Status *
        </legend>
        <div className="grid gap-3 md:grid-cols-3">
          {statusOptions.map((option) => {
            const checked = formData.neetStatus === option;
            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  checked
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={`${formIdPrefix}-neetStatus`}
                  value={option}
                  checked={checked}
                  onChange={() => onStatusChange(option)}
                  className="h-4 w-4 border-slate-300 text-blue-700 focus:ring-blue-500"
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {isSubmitting ? "Submitting..." : "Find My Country & University Options"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}

function ConsultationModal({
  formData,
  isSubmitting,
  onClose,
  onInputChange,
  onCheckboxChange,
  onStatusChange,
  onSubmit,
  triggerLabel,
}: {
  formData: LeadFormData;
  isSubmitting: boolean;
  onClose: () => void;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (value: NeetStatus) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  triggerLabel: string;
}) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] border border-white/20 bg-white p-6 shadow-[0_30px_90px_rgba(8,18,38,0.28)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-950"
          aria-label="Close consultation form"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
          Free consultation
        </p>
        <h2
          id="consultation-modal-title"
          className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
        >
          Get your free MBBS abroad counselling call
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          You clicked{" "}
          <span className="font-semibold text-slate-950">{triggerLabel}</span>.
          Fill this same form here and a {BRAND_NAME} counsellor will call or
          WhatsApp you after reviewing your score range and preferences.
        </p>

        <div className="mt-6">
          <LeadForm
            formIdPrefix="consultation-modal"
            formData={formData}
            isSubmitting={isSubmitting}
            onInputChange={onInputChange}
            onCheckboxChange={onCheckboxChange}
            onStatusChange={onStatusChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default function LandingPageClient() {
  const router = useRouter();
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeHeroVideo, setActiveHeroVideo] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [consultationModal, setConsultationModal] =
    useState<ConsultationModalState | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_LEAD_URL ?? "";
  const accessToken = process.env.NEXT_PUBLIC_LEAD_SECRET_KEY ?? "";

  const heroCountries = useMemo(() => countries.join(", "), []);
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    }),
    []
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => {
      const nextData = {
        ...previous,
        [name]: value,
      };

      if (name === "mobile" && previous.sameAsMobile) {
        nextData.whatsapp = value;
      }

      return nextData;
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      sameAsMobile: checked,
      whatsapp: checked ? previous.mobile : previous.whatsapp,
    }));
  };

  const handleStatusChange = (value: NeetStatus) => {
    setFormData((previous) => ({ ...previous, neetStatus: value }));
  };

  const trackLandingEvent = (payload: LandingEventPayload) => {
    void postLandingEvent(payload).catch((error) => {
      console.error("Landing event tracking failed", error);
    });
  };

  const openConsultationModal = (source: string, ctaLabel: string) => {
    trackLandingEvent({
      type: "cta_click",
      page: landingPagePath,
      source,
      ctaLabel,
      ctaDestination: "consultation-modal",
    });
    setConsultationModal({ source, ctaLabel });
  };

  const submitLead = async (source: string) => {
    if (!formData.neetStatus) {
      toast.error("Please select your NEET status.");
      return;
    }

    if (!apiUrl || !accessToken) {
      toast.error(
        "Lead form is not configured yet. Please add the public API environment variables."
      );
      return;
    }

    const effectiveWhatsapp = formData.sameAsMobile
      ? formData.mobile
      : formData.whatsapp;

    const requestData = {
      fields: {
        Name: formData.fullName,
        Phone: formData.mobile,
        WhatsApp: effectiveWhatsapp,
        Email: formData.email,
        City: formData.city,
        NEETStatus: formData.neetStatus,
        NEETScoreRange: formData.neetScoreRange,
      },
      actions: [
        {
          type: "SYSTEM_NOTE",
          text: `Lead Source: ${source}`,
        },
      ],
    };

    const emailPayload = buildEmailPayload(formData, source);
    setIsSubmitting(true);

    try {
      const [leadResponse, emailResponse, sheetResponse] = await Promise.allSettled([
        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }),
        fetch("https://admission-backend.vercel.app/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(emailPayload),
        }),
        postLandingEvent({
          type: "form_submission",
          page: landingPagePath,
          source,
          fullName: formData.fullName,
          mobile: formData.mobile,
          whatsapp: effectiveWhatsapp,
          email: formData.email,
          city: formData.city,
          neetStatus: formData.neetStatus,
          neetScoreRange: formData.neetScoreRange,
        }),
      ]);

      if (
        leadResponse.status !== "fulfilled" ||
        emailResponse.status !== "fulfilled" ||
        !leadResponse.value.ok ||
        !emailResponse.value.ok
      ) {
        throw new Error("Lead form submission failed");
      }

      if (sheetResponse.status === "rejected") {
        console.error("Google Sheets logging failed", sheetResponse.reason);
      }

      setFormData(initialFormData);
      router.push("/thank-you?title=MBBS%20Abroad%20Counselling");
    } catch (error) {
      console.error(error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTopSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLead("NEET Qualifying Score Landing Page - Hero Form");
  };

  const handleBottomSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLead("NEET Qualifying Score Landing Page - Bottom Form");
  };

  const handleModalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLead(
      consultationModal?.source
        ? `${consultationModal.source} - Modal Form`
        : "NEET Qualifying Score Landing Page - Consultation Modal Form"
    );
    setConsultationModal(null);
  };

  return (
    <div className="bg-[linear-gradient(180deg,#fcfbf7_0%,#fffdf8_28%,#f8fbff_100%)] text-slate-900">
      {consultationModal ? (
        <ConsultationModal
          formData={formData}
          isSubmitting={isSubmitting}
          onClose={() => setConsultationModal(null)}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onStatusChange={handleStatusChange}
          onSubmit={handleModalSubmit}
          triggerLabel={consultationModal.ctaLabel}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <button
        type="button"
        onClick={() =>
          openConsultationModal(
            "NEET Landing Page - Floating Quick Form CTA",
            "Book Free Consultation"
          )
        }
        className="fixed bottom-4 right-4 z-40 inline-flex max-w-[calc(100vw-1.5rem)] items-center gap-2 rounded-full bg-orange-400 px-4 py-3 text-xs font-semibold text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:bg-orange-300 sm:bottom-5 sm:right-5 sm:px-5 sm:text-sm"
      >
        <ArrowRight className="h-4 w-4" />
        Book Free Consultation
      </button>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.16),transparent_28%),linear-gradient(140deg,#081226_10%,#102a5f_52%,#0f3f7a_100%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_54%)]" />
        <div
          aria-hidden="true"
          className="absolute left-[8%] top-24 h-32 w-32 rounded-full bg-sky-300/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-10 right-[10%] h-44 w-44 rounded-full bg-orange-300/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-start lg:px-8 lg:pb-24 lg:pt-20">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100 backdrop-blur">
              <BadgeCheck className="h-4 w-4" />
              Free MBBS Abroad Counselling
            </div>

            <h1 className="mt-5 max-w-4xl text-[2.35rem] font-black leading-[1.06] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
              24 Lakh Students. 1.4 Lakh Seats. Your MBBS Dream Is Bigger Than
              One Number.
            </h1>

            <div className="mt-6 overflow-hidden rounded-[24px] border border-white/12 bg-slate-950/25 shadow-[0_24px_70px_rgba(8,18,38,0.35)] backdrop-blur sm:mt-8 sm:rounded-[28px]">
              <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                <h2 className="text-base font-bold text-white sm:text-lg">
                  Just a NEET score of 130 -150 can still get you an
                  NMC-approved MBBS seat abroad.
                </h2>
              </div>
              <div className="aspect-video">
                {activeHeroVideo ? (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${heroVideoId}?autoplay=1`}
                    title="MBBS abroad explainer video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveHeroVideo(true)}
                    className="group relative h-full w-full text-left"
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(15,23,42,0.72), rgba(15,23,42,0.16)), url(https://i.ytimg.com/vi/${heroVideoId}/hqdefault.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex h-full flex-col justify-between p-4 sm:p-6">
                      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur sm:px-4 sm:text-xs">
                        <PlayCircle className="h-4 w-4" />
                        Play Video
                      </span>
                      <div>
                        <p className="text-base font-bold text-white sm:text-lg">
                          How a qualifying NEET score can still open MBBS
                          abroad options
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-200 sm:leading-7">
                          Tap to load the video and hear how score, budget, and
                          country fit work together.
                        </p>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
              A NEET qualifying score is enough for NMC-approved MBBS abroad in{" "}
              {heroCountries}. Same doctor dream, same recognised pathway, and
              often a more realistic budget path for Indian families.
            </p>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur sm:mt-6 sm:rounded-[28px] sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100 sm:text-sm">
                Latest official NEET guidance
              </p>
              <p className="mt-3 text-base font-semibold leading-7 text-white sm:text-lg sm:leading-8">
                The most recent released NTA cutoff for NEET-UG 2025 starts at{" "}
                <span className="text-orange-300">144+</span> for General/EWS
                and <span className="text-orange-300">113+</span> for OBC / SC /
                ST. PwBD cutoffs differ by category.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-200 sm:leading-7">
                These qualifying marks change every year, so the latest released
                result year should always be used for planning.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={() =>
                  openConsultationModal(
                    "NEET Landing Page - Hero Primary CTA",
                    "Find My Country & University"
                  )
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-orange-300 sm:w-auto"
              >
                Find My Country & University
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() =>
                  openConsultationModal(
                    "NEET Landing Page - Hero Quick Form CTA",
                    "Jump to Quick Form"
                  )
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/15 sm:w-auto"
              >
                Jump to Quick Form
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-200 sm:leading-7">
              2026 counselling is already worth starting now. Shortlisting early
              gives families more time before intake and visa timelines tighten.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">24 Lakh</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  students sit for NEET every year
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">1.4 Lakh</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  MBBS seats are available in India
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">22+ Lakh</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  students still need a realistic backup path
                </p>
              </div>
            </div>

          </div>

          <aside
            id="lead-form"
            className="scroll-mt-32 self-start rounded-[28px] border border-white/50 bg-white p-5 shadow-[0_30px_90px_rgba(8,18,38,0.18)] sm:rounded-[32px] sm:p-8"
          >
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Get your free MBBS abroad counselling call
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              No consultation fee. No obligation. A {BRAND_NAME} counsellor
              will call or WhatsApp you after reviewing your score range and
              preferences.
            </p>

            <div className="mt-6">
              <LeadForm
                formIdPrefix="hero-form"
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
                onStatusChange={handleStatusChange}
                onSubmit={handleTopSubmit}
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/90">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-sm font-semibold text-slate-700 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <BadgeCheck className="h-5 w-5 text-blue-700" />
            Since 2009
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <PhoneCall className="h-5 w-5 text-blue-700" />
            500+ students guided and placed
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <ShieldCheck className="h-5 w-5 text-blue-700" />
            Recognised, NMC-approved pathways only
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Real students. Real MBBS seats. Real stories.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Watch how students with different scores and budgets found their
              MBBS path abroad with {BRAND_NAME}.
            </p>
          </div>

          <div className="mt-10 grid touch-pan-x grid-flow-col auto-cols-[84%] gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pb-2 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:auto-cols-[64%] sm:scroll-pl-6 md:mt-12 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible md:pb-0 md:pr-0 xl:grid-cols-5">
            {testimonialVideos.map((video) => (
              <VideoCard
                key={video.videoId}
                video={video}
                isActive={activeVideoId === video.videoId}
                onActivate={() => setActiveVideoId(video.videoId)}
              />
            ))}
          </div>

          <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-500">
            These are real Indian students and families who started where many
            NEET aspirants are now: confused about seats, worried about scores,
            and trying to understand whether MBBS abroad is the right path.
          </p>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <h2 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              The math was never in your favour. Your future still can be.
            </h2>

            <div className="mt-8 space-y-4">
              {[
                "Every year, around 24 lakh students sit for NEET.",
                "India has only about 1.4 lakh MBBS seats.",
                "That means over 22 lakh students with real effort and real dreams still have to look beyond the default path.",
                "That is not personal failure. That is the math of seat availability.",
              ].map((point) => (
                <div
                  key={point}
                  className="flex gap-3 rounded-2xl border border-orange-100 bg-white px-5 py-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <p className="text-base leading-7 text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <h3 className="text-2xl font-black tracking-tight text-slate-950">
              What most families do not know
            </h3>
            <div className="mt-6 space-y-4">
              {[
                `A qualifying NEET score, not a top rank, can already open MBBS abroad options in ${heroCountries}.`,
                "The key decision is not just score. It is the match between score, family budget, recognition, and country fit.",
                "The smartest move is to shortlist early rather than waiting until panic starts after results.",
              ].map((point) => (
                <div
                  key={point}
                  className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-4"
                >
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p className="text-sm leading-7 text-slate-700">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 px-5 py-6 text-white">
              <p className="text-lg font-semibold leading-8">
                Want to know which country and university fit your score and
                budget?
              </p>
              <button
                type="button"
                onClick={() =>
                  openConsultationModal(
                    "NEET Landing Page - Mid Page CTA",
                    "Get your free counselling call"
                  )
                }
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Get your free counselling call
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.98fr_1.02fr]">
            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                Why talk to {BRAND_NAME} before you decide anything?
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  `${BRAND_NAME} has been guiding Indian students to MBBS abroad options since 2009.`,
                  "Students from different score ranges have found a better-fit country and university through guided counselling.",
                  "The focus stays on recognition, country fit, cost transparency, and next steps instead of generic sales talk.",
                  "Parents get a clearer path before they spend time or money on the wrong option.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
                    <p className="text-sm leading-7 text-slate-100">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:rounded-[32px] sm:p-7">
              <h2 className="text-3xl font-black tracking-tight text-slate-950">
                Current country cost snapshots
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                These are illustrative figures based on current New-Lyf country
                pages and examples. Final budgets vary by university, hostel,
                city, and exchange rate.
              </p>

              <div className="mt-6 space-y-3 md:hidden">
                {costSnapshots.map((item) => (
                  <div
                    key={item.country}
                    className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-base font-bold text-slate-950">
                      {item.country}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-blue-900">
                      {item.estimate}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200 md:block">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Country</th>
                      <th className="px-4 py-3 font-semibold">
                        Typical budget snapshot
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {costSnapshots.map((item) => (
                      <tr key={item.country}>
                        <td className="px-4 py-4 font-semibold text-slate-950">
                          {item.country}
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          <p className="font-semibold text-slate-900">
                            {item.estimate}
                          </p>
                          <p className="mt-1 leading-6">{item.note}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-50 shadow-sm">
            <div className="px-6 py-6 sm:px-8">
              <h2 className="text-3xl font-black tracking-tight text-slate-950">
                Latest official NEET qualifying score guide
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                These are the most recent officially released NTA qualifying
                ranges from NEET-UG 2025. They matter because many families
                searching for MBBS abroad are asking one question first: what
                number is enough to stay eligible?
              </p>
            </div>

            <div className="space-y-3 px-4 pb-4 md:hidden">
              {latestCutoffRows.map((row) => (
                <div
                  key={row.category}
                  className="rounded-[22px] border border-slate-200 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-slate-600">
                    {row.category}
                  </p>
                  <p className="mt-2 text-2xl font-black text-blue-800">
                    {row.qualifyingScore}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {row.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-white">
                  <tr className="border-y border-slate-200">
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Category
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Minimum qualifying score
                    </th>
                    <th className="px-6 py-4 font-semibold text-slate-900">
                      Latest official note
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {latestCutoffRows.map((row) => (
                    <tr key={row.category}>
                      <td className="px-6 py-4 font-semibold text-slate-950">
                        {row.category}
                      </td>
                      <td className="px-6 py-4 text-lg font-black text-blue-800">
                        {row.qualifyingScore}
                      </td>
                      <td className="px-6 py-4 leading-7 text-slate-600">
                        {row.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              What happens after you fill the form?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              A simple form should give you a clear plan, not pressure.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "Step 1",
                title: "Quick call or WhatsApp",
                description:
                  "A counsellor understands your NEET status, expected score, budget, and country preferences.",
              },
              {
                step: "Step 2",
                title: "Country and university match",
                description:
                  "You get practical options that fit your score range, recognition requirements, and family budget.",
              },
              {
                step: "Step 3",
                title: "Decide your next step",
                description:
                  "You and your parents review the shortlist. If you move forward, admissions support begins from there.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="rounded-[30px] border border-white/10 bg-white/5 p-7 shadow-[0_18px_45px_rgba(8,18,38,0.22)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-black text-sky-200">
                  {index + 1}
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                  {item.step}
                </p>
                <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-sky-400/20 bg-sky-400/10 px-6 py-5 text-sm leading-7 text-sky-50">
            Filling the form does not lock you into anything. It gives you a
            clearer MBBS plan instead of more guesswork.
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Questions students and parents ask every day
            </h2>
          </div>

          <div className="mt-10 grid gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950">
                  {faq.question}
                </h3>
                <p className="mt-3 text-base leading-8 text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-32 bg-[linear-gradient(180deg,#081226_0%,#0f2147_100%)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="text-white">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Your NEET score is a number. Your MBBS dream is your life.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Do not wait for the result to start planning. Find the right
              country and university for your score and budget now, while
              others are still confused.
            </p>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-base leading-8 text-slate-200">
                A simple form today can save you from losing one more year
                tomorrow.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white p-5 shadow-[0_24px_70px_rgba(8,18,38,0.32)] sm:rounded-[32px] sm:p-8">
            <h3 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Find my country and university options
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Same free counselling form, same questions, no hidden step.
            </p>

            <div className="mt-6">
              <LeadForm
                formIdPrefix="footer-form"
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
                onStatusChange={handleStatusChange}
                onSubmit={handleBottomSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="top-center" theme="light" />
    </div>
  );
}
