"use client";

import type { ChangeEvent, FormEvent, ReactNode, RefObject } from "react";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  Globe2,
  GraduationCap,
  MessageCircle,
  PhoneCall,
  PlayCircle,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type NeetStatus =
  | "Appearing NEET 2026"
  | "REPEATER"
  | "Last year Qualified Earlier"
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

const heroVideoId = "FDSSu6Tns6s";

const testimonialVideos: VideoStory[] = [
  {
    title: "Parents and students speak before their MBBS journey",
    videoId: "vKHY0nURC6k",
    caption: "Parents and students talk through the decision before starting MBBS in Russia.",
  },
  {
    title: "Student from Karnataka to Russia",
    videoId: "-YRc7hsOFYY",
    caption: "A real student story about beginning MBBS in Russia with guided support.",
  },
  {
    title: "Student from Tamil Nadu to Russia",
    videoId: "jl05lKF5Xxw",
    caption: "A student explains how confidence and clarity replaced confusion about studying abroad.",
  },
  {
    title: "Journey to White Coats",
    videoId: "qzImQeZL7v0",
    caption: "A look at how Indian students move from uncertainty to an MBBS seat abroad.",
  },
  {
    title: "Why I chose Kadyrov Chechen State Medical University",
    videoId: "4w-vvKmiEPo",
    caption: "A student breaks down why choosing an NMC-approved university felt safer and clearer.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Is a NEET qualifying score really enough for MBBS abroad?",
    answer:
      "Yes. For many NMC-approved universities abroad, a qualifying NEET score is sufficient for admission. Requirements still vary by country and university, which is why the counselling call matters.",
  },
  {
    question: "Will an MBBS abroad be recognised in India?",
    answer:
      "Ney Lyf works only with NMC-approved and recognised programmes. After completing MBBS and the required exams, you can still follow the path to practise in India.",
  },
  {
    question: "Is the counselling call free?",
    answer:
      "Yes. The initial counselling call to understand your options and explain countries and universities is completely free.",
  },
  {
    question: "How do I avoid fraud or the wrong consultancy?",
    answer:
      "Speaking directly with a team that has been guiding students since 2009 helps reduce guesswork. You can compare countries, costs, and student stories before making any decision.",
  },
  {
    question: "What if my NEET score is low or I am scared it will be?",
    answer:
      "Many students with average or borderline scores still find a suitable MBBS option abroad depending on their country preference and budget. The call gives you a realistic answer instead of uncertainty.",
  },
];

const stats = [
  { value: "24 Lakh", label: "students sit for NEET every year" },
  { value: "1.4 Lakh", label: "MBBS seats available in India" },
  { value: "22+ Lakh", label: "students are still left searching for a path" },
];

const countries = [
  "Russia",
  "Kazakhstan",
  "Philippines",
  "Georgia",
  "Uzbekistan",
  "Kyrgyzstan",
];

const initialFormData: LeadFormData = {
  fullName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  neetStatus: "",
  neetScoreRange: "",
};

function scrollToElement(ref: RefObject<HTMLElement>) {
  if (!ref.current) return;
  const top = ref.current.getBoundingClientRect().top + window.scrollY - 112;
  window.scrollTo({ top, behavior: "smooth" });
}

function buildEmailPayload(formData: LeadFormData, source: string) {
  return [
    { Attribute: "Name", Value: formData.fullName },
    { Attribute: "Mobile", Value: formData.mobile },
    { Attribute: "WhatsApp", Value: formData.whatsapp },
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

function LandingLeadForm({
  formIdPrefix,
  compact = false,
  formData,
  isSubmitting,
  onInputChange,
  onStatusChange,
  onSubmit,
}: {
  formIdPrefix: string;
  compact?: boolean;
  formData: LeadFormData;
  isSubmitting: boolean;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onStatusChange: (value: NeetStatus) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const inputClassName =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  const statusOptions: NeetStatus[] = [
    "Appearing NEET 2026",
    "REPEATER",
    "Last year Qualified Earlier",
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className={compact ? "grid gap-4 md:grid-cols-2" : "grid gap-4"}>
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

        <FormField id={`${formIdPrefix}-whatsapp`} label="WhatsApp Number" required>
          <input
            id={`${formIdPrefix}-whatsapp`}
            name="whatsapp"
            type="tel"
            value={formData.whatsapp}
            onChange={onInputChange}
            className={inputClassName}
            placeholder="Enter your WhatsApp number"
            required
          />
        </FormField>

        {!compact && (
          <FormField id={`${formIdPrefix}-email`} label="Email ID">
            <input
              id={`${formIdPrefix}-email`}
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              className={inputClassName}
              placeholder="Enter your email address"
            />
          </FormField>
        )}

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

export default function LandingPageClient() {
  const router = useRouter();
  const topFormRef = useRef<HTMLElement>(null);
  const bottomFormRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const apiUrl = process.env.NEXT_PUBLIC_LEAD_URL ?? "";
  const accessToken = process.env.NEXT_PUBLIC_LEAD_SECRET_KEY ?? "";

  const heroCountries = useMemo(() => countries.join(", "), []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleStatusChange = (value: NeetStatus) => {
    setFormData((previous) => ({ ...previous, neetStatus: value }));
  };

  const submitLead = async (source: string) => {
    if (!formData.neetStatus) {
      toast.error("Please select your NEET status.");
      return;
    }

    if (!apiUrl || !accessToken) {
      toast.error("Lead form is not configured yet. Please add the public API environment variables.");
      return;
    }

    const requestData = {
      fields: {
        Name: formData.fullName,
        Phone: formData.mobile,
        WhatsApp: formData.whatsapp,
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
      const [leadResponse, emailResponse] = await Promise.all([
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
      ]);

      if (!leadResponse.ok || !emailResponse.ok) {
        throw new Error("Lead form submission failed");
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

  return (
    <div className="bg-[linear-gradient(180deg,#fcfbf7_0%,#fffdf8_28%,#f8fbff_100%)] text-slate-900">
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

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100 backdrop-blur">
              <BadgeCheck className="h-4 w-4" />
              Free MBBS Abroad Counselling
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              24 Lakh Students. 1.4 Lakh Seats. Your MBBS Dream Is Bigger Than
              One Number.
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-semibold text-orange-200 sm:text-2xl">
              How a Qualifying NEET Score Can Still Get You an MBBS Seat Abroad
            </p>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
              A NEET qualifying score is enough for NMC-approved MBBS abroad in{" "}
              {heroCountries} and more. Same recognition, same doctor dream, and
              often a more realistic budget path for Indian families.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollToElement(topFormRef)}
                className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Find My Country & University
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToElement(bottomFormRef)}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Jump to Quick Form
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.value}
                  className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                >
                  <p className="text-3xl font-black text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[28px] border border-white/12 bg-slate-950/25 shadow-[0_24px_70px_rgba(8,18,38,0.35)] backdrop-blur">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4 text-sm font-semibold text-sky-100">
                <PlayCircle className="h-4 w-4" />
                VSL Block
              </div>
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${heroVideoId}`}
                  title="MBBS abroad hero video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <aside
            id="lead-form"
            ref={topFormRef}
            className="scroll-mt-32 rounded-[32px] border border-white/50 bg-white p-6 shadow-[0_30px_90px_rgba(8,18,38,0.18)] sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Start Here
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Get Your Free MBBS Abroad Counselling Call
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              No consultation fees. No obligation. A New-Lyf counsellor will
              call or WhatsApp you.
            </p>

            <div className="mt-6">
              <LandingLeadForm
                formIdPrefix="hero-form"
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
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
            <GraduationCap className="h-5 w-5 text-blue-700" />
            500+ Students Placed
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <ShieldCheck className="h-5 w-5 text-blue-700" />
            NMC-Approved Universities Only
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Student Proof
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Real Students. Real MBBS Seats. Real Stories.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Watch how students and families found their MBBS path abroad with
            Ney Lyf and moved forward with more clarity and less fear.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {testimonialVideos.map((video) => (
            <article
              key={video.videoId}
              className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
            >
              <div className="aspect-[9/16] bg-slate-950">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="space-y-3 p-5">
                <h3 className="text-base font-bold leading-6 text-slate-950">
                  {video.title}
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {video.caption}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-500">
          These are real Indian students and families who started where many
          NEET aspirants are now: confused about seats, worried about scores,
          and trying to understand whether MBBS abroad is the right path.
        </p>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
              Why This Matters
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              The Math Was Never in Your Favour. Your Future Still Can Be.
            </h2>

            <div className="mt-8 space-y-4">
              {[
                "Every year, around 24 lakh students sit for NEET.",
                "India has only about 1.4 lakh MBBS seats.",
                "That means over 22 lakh students with real effort and real dreams are still told there is no seat for them.",
                "That is not your failure. That is just the math.",
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
              What most students do not know:
            </h3>
            <div className="mt-6 space-y-4">
              {[
                "A NEET qualifying score, not a top rank, is enough to get into many NMC-approved MBBS programmes abroad.",
                "Russia, Kazakhstan, Philippines, Georgia and more can still offer the same recognised degree path for Indian students.",
                "The overall cost is often more realistic for an Indian family when compared with many private MBBS options in India.",
              ].map((point) => (
                <div
                  key={point}
                  className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-4"
                >
                  <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
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
                onClick={() => scrollToElement(topFormRef)}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Fill the form and get your free call
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
              Authority
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Why Talk to Ney Lyf Before You Decide Anything?
            </h2>
            <div className="mt-8 space-y-4">
              {[
                "Ney Lyf has been placing Indian students in MBBS programmes abroad since 2009.",
                "Students from different score ranges have found the right country and university through guided counselling.",
                "We work only with NMC-approved and recognised universities abroad.",
                "You get honest counselling on countries, universities, costs, and next steps, not just a sales pitch.",
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

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <PhoneCall className="h-10 w-10 text-blue-700" />
              <h3 className="mt-5 text-xl font-black text-slate-950">
                Honest country guidance
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                We start with score, budget, and family comfort, then show
                realistic options instead of overselling one country.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <ShieldCheck className="h-10 w-10 text-blue-700" />
              <h3 className="mt-5 text-xl font-black text-slate-950">
                Recognition-first filtering
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Only NMC-approved and recognised university options make it into
                the shortlist discussion.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <Wallet className="h-10 w-10 text-blue-700" />
              <h3 className="mt-5 text-xl font-black text-slate-950">
                Budget clarity
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Families get a clearer view of tuition, living costs, and what
                feels realistic before any commitment.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <MessageCircle className="h-10 w-10 text-blue-700" />
              <h3 className="mt-5 text-xl font-black text-slate-950">
                Clear next steps
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                After the call, students and parents know exactly what path
                makes sense and what to do next.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-300">
              3 Steps
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              What Happens After You Fill the Form?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              A simple form should give you a clear plan, not pressure.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                step: "Step 1",
                title: "Quick Call / WhatsApp",
                description:
                  "A Ney Lyf counsellor speaks with you, understands your NEET status, expected score, budget, and preferences.",
              },
              {
                step: "Step 2",
                title: "Country & University Match",
                description:
                  "Based on your details, we shortlist NMC-approved universities and countries that realistically fit your score and family budget.",
              },
              {
                step: "Step 3",
                title: "Decide Your Path",
                description:
                  "You and your parents review the options. If you choose to move ahead, the team guides you through applications and admission.",
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
            Filling the form does not lock you into anything. It simply gives
            you a clear MBBS plan instead of guessing.
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Questions Students and Parents Ask Us Every Day
          </h2>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-lg font-bold text-slate-950">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-5 text-base leading-8 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section
        ref={bottomFormRef}
        className="scroll-mt-32 bg-[linear-gradient(180deg,#081226_0%,#0f2147_100%)]"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
              Final CTA
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Your NEET Score Is a Number. Your MBBS Dream Is Your Life.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Do not wait for the result to start planning. Find the right
              country and university for your score and budget now, while
              others are still confused.
            </p>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
                Quick reminder
              </p>
              <p className="mt-3 text-base leading-8 text-slate-200">
                A simple form today can save you from losing one more year
                tomorrow.
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white p-6 shadow-[0_24px_70px_rgba(8,18,38,0.32)] sm:p-8">
            <h3 className="text-3xl font-black tracking-tight text-slate-950">
              Find My Country & University - Free Counselling
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Full Name, Mobile, WhatsApp, City, NEET Status, and Expected /
              Last Score are enough to start.
            </p>

            <div className="mt-6">
              <LandingLeadForm
                formIdPrefix="footer-form"
                compact
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onStatusChange={handleStatusChange}
                onSubmit={handleBottomSubmit}
              />
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" theme="light" />
    </div>
  );
}
