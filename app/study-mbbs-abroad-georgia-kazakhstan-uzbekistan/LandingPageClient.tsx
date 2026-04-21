"use client";

import type {
  ChangeEvent,
  FormEvent,
  ReactNode,
  RefObject,
} from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  GraduationCap,
  Home,
  PlayCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PreferredDestination =
  | "Georgia"
  | "Kazakhstan"
  | "Uzbekistan"
  | "Help Me Decide"
  | "";

interface LeadFormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDestination: PreferredDestination;
}

interface LandingEventPayload {
  eventType: "form_submission" | "cta_click";
  page: string;
  source: string;
  ctaLabel?: string;
  ctaDestination?: string;
  fullName?: string;
  mobile?: string;
  email?: string;
  message?: string;
}

interface DestinationCard {
  title: string;
  vibe: string;
  advantage: string;
  investment: string;
  accentClassName: string;
}

interface VideoStory {
  title: string;
  videoId: string;
  caption: string;
}

const BRAND_NAME = "New-Lyf";
const landingPagePath = "/study-mbbs-abroad-georgia-kazakhstan-uzbekistan";
const heroVideoId = "FDSSu6Tns6s";

const destinationCards: DestinationCard[] = [
  {
    title: "MBBS in Georgia",
    vibe:
      "A safe, modern destination with a European-style academic structure and an internationally familiar learning environment.",
    advantage:
      "Strong clinical exposure and a reputation for structured medical education that appeals to families seeking a premium destination.",
    investment:
      "Typically around INR 25 to 45 Lakhs total, depending on the university and city.",
    accentClassName: "from-sky-500/15 to-indigo-500/10",
  },
  {
    title: "MBBS in Kazakhstan",
    vibe:
      "A practical and popular destination with a large Indian student community and solid English-medium options.",
    advantage:
      "A strong quality-to-budget balance for families looking for affordability without compromising on established MBBS pathways.",
    investment:
      "Typically around INR 15 to 30 Lakhs total, depending on the university and stay options.",
    accentClassName: "from-emerald-500/15 to-cyan-500/10",
  },
  {
    title: "MBBS in Uzbekistan",
    vibe:
      "An emerging hotspot with familiar cultural comfort, low living costs, and growing appeal for Indian medical aspirants.",
    advantage:
      "Hands-on hospital exposure and an affordable pathway for families looking for value and simpler budgeting.",
    investment:
      "Typically around INR 15 to 25 Lakhs total, depending on the university and accommodation style.",
    accentClassName: "from-orange-500/15 to-amber-500/10",
  },
];

const eligibilitySteps = [
  "Minimum 50% aggregate in Physics, Chemistry, and Biology in Class 12. Reserved categories generally need 40%.",
  "A valid NEET-UG qualification is required for students who want the degree to remain usable for the path back to India.",
  "You must be at least 17 years old by December 31 of the admission year.",
];

const advantagePoints = [
  {
    title: "100% NMC-aligned university filtering",
    description:
      "We shortlist only universities that match the key compliance expectations families care about for long-term degree validity and return planning.",
    icon: ShieldCheck,
  },
  {
    title: "End-to-end guidance since 2009",
    description:
      "From choosing the right country to visa support, travel planning, hostel coordination, and post-landing help, the process stays guided.",
    icon: BadgeCheck,
  },
  {
    title: "FMGE / NExT-focused planning mindset",
    description:
      "The counselling is not only about admission. It also considers recognition, academics, and your long-term exam pathway back home.",
    icon: Stethoscope,
  },
  {
    title: "Comfort and support abroad",
    description:
      "Families care about hostels, safety, food, and daily adjustment. We help students move into a genuine home-away-from-home setup.",
    icon: Home,
  },
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

const initialFormData: LeadFormData = {
  fullName: "",
  phone: "",
  email: "",
  preferredDestination: "",
};

function scrollToElement(ref: RefObject<HTMLElement>) {
  if (!ref.current) return;
  const top = ref.current.getBoundingClientRect().top + window.scrollY - 112;
  window.scrollTo({ top, behavior: "smooth" });
}

async function postLandingEvent(payload: LandingEventPayload) {
  const response = await fetch("/api/landing-events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error("Landing event logging failed");
  }
}

function trackLandingEvent(payload: LandingEventPayload) {
  void postLandingEvent(payload).catch((error) => {
    console.error("Landing event logging failed", error);
  });
}

function buildEmailPayload(formData: LeadFormData, source: string) {
  return [
    { Attribute: "Name", Value: formData.fullName },
    { Attribute: "Mobile", Value: formData.phone },
    { Attribute: "Email", Value: formData.email || "Not provided" },
    {
      Attribute: "Preferred Destination",
      Value: formData.preferredDestination || "Help me decide",
    },
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
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="relative aspect-[9/16] bg-slate-950">
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
  onSubmit,
}: {
  formIdPrefix: string;
  formData: LeadFormData;
  isSubmitting: boolean;
  onInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const inputClassName =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
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

      <FormField id={`${formIdPrefix}-phone`} label="Phone Number" required>
        <input
          id={`${formIdPrefix}-phone`}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onInputChange}
          className={inputClassName}
          placeholder="Enter your phone number"
          required
        />
      </FormField>

      <FormField
        id={`${formIdPrefix}-email`}
        label="Email Address"
        required
      >
        <input
          id={`${formIdPrefix}-email`}
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className={inputClassName}
          placeholder="Enter your email address"
          required
        />
      </FormField>

      <FormField
        id={`${formIdPrefix}-preferredDestination`}
        label="Preferred Destination"
        required
      >
        <select
          id={`${formIdPrefix}-preferredDestination`}
          name="preferredDestination"
          value={formData.preferredDestination}
          onChange={onInputChange}
          className={inputClassName}
          required
        >
          <option value="">Choose your preferred destination</option>
          <option value="Georgia">Georgia</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Help Me Decide">Help Me Decide</option>
        </select>
      </FormField>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {isSubmitting
          ? "Submitting..."
          : "Submit & Get Free Expert Counseling"}
        {!isSubmitting && <ArrowRight className="h-4 w-4" />}
      </button>
    </form>
  );
}

export default function LandingPageClient() {
  const router = useRouter();
  const heroFormRef = useRef<HTMLElement>(null);
  const bottomCtaRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeHeroVideo, setActiveHeroVideo] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_LEAD_URL ?? "";
  const accessToken = process.env.NEXT_PUBLIC_LEAD_SECRET_KEY ?? "";

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitLead = async (source: string) => {
    if (!apiUrl || !accessToken) {
      toast.error(
        "Lead form is not configured yet. Please add the public API environment variables."
      );
      return;
    }

    const requestData = {
      fields: {
        Name: formData.fullName,
        Phone: formData.phone,
        Email: formData.email,
        PreferredDestination: formData.preferredDestination,
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
          eventType: "form_submission",
          page: landingPagePath,
          source,
          fullName: formData.fullName,
          mobile: formData.phone,
          email: formData.email,
          message: `Preferred Destination: ${formData.preferredDestination}`,
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
        console.error("Landing page sheet logging failed", sheetResponse.reason);
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

  const handleHeroSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLead("New-Lyf MBBS Abroad Landing Page - Hero Form");
  };

  const handleBottomSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLead("New-Lyf MBBS Abroad Landing Page - Bottom Form");
  };

  return (
    <div className="bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_24%,#fffdf8_100%)] text-slate-900">
      <button
        type="button"
        onClick={() =>
          {
            trackLandingEvent({
              eventType: "cta_click",
              page: landingPagePath,
              source: "New-Lyf MBBS Abroad Landing Page - Floating Quick Form CTA",
              ctaLabel: "Book Free Consultation",
              ctaDestination: "#hero-form",
            });
            scrollToElement(heroFormRef);
          }
        }
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:bg-orange-300"
      >
        <ArrowRight className="h-4 w-4" />
        Book Free Consultation
      </button>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(251,146,60,0.18),transparent_30%),linear-gradient(135deg,#081226_8%,#113978_58%,#1d4ed8_100%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100 backdrop-blur">
              <GraduationCap className="h-4 w-4" />
              MBBS Abroad Admissions
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Study MBBS Abroad with {BRAND_NAME}: Secure Your Medical Future
              in Georgia, Kazakhstan, or Uzbekistan
            </h1>

            <div className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_24px_70px_rgba(8,18,38,0.22)] backdrop-blur">
              <div className="border-b border-white/10 px-6 py-5">
                <h2 className="text-2xl font-black tracking-tight text-white">
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
                      <div className="flex h-full flex-col justify-between p-6">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                          <PlayCircle className="h-4 w-4" />
                          Play Video
                        </span>
                      </div>
                    </button>
                )}
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              Join the 17,000+ Indian students who have trusted {BRAND_NAME}
              since 2009 to pursue their doctor dream. Get direct admission to
              globally recognised universities with transparent fee guidance and
              zero donation pressure.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">2009</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Established guidance legacy
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">17,000+</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Students successfully placed
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-3xl font-black text-white">3</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  High-interest destinations to compare
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  trackLandingEvent({
                    eventType: "cta_click",
                    page: landingPagePath,
                    source: "New-Lyf MBBS Abroad Landing Page - Hero CTA",
                    ctaLabel: "Submit & Get Free Expert Counseling",
                    ctaDestination: "#hero-form",
                  });
                  scrollToElement(heroFormRef);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Get Free Expert Counseling
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  trackLandingEvent({
                    eventType: "cta_click",
                    page: landingPagePath,
                    source: "New-Lyf MBBS Abroad Landing Page - Hero Quick Form CTA",
                    ctaLabel: "Book Free Consultation",
                    ctaDestination: "#hero-form",
                  });
                  scrollToElement(heroFormRef);
                }}
                className="text-sm font-semibold text-sky-100 underline decoration-sky-200/70 underline-offset-4 transition hover:text-white"
              >
                Book Free Consultation
              </button>
            </div>
          </div>

          <aside
            id="hero-form"
            ref={heroFormRef}
            className="rounded-[32px] border border-white/50 bg-white p-6 shadow-[0_30px_90px_rgba(8,18,38,0.18)] sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Free consultation
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Get your free, personalized MBBS consultation today
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Tell us your preferred destination, and a {BRAND_NAME} expert
              will guide you on admission fit, costs, and next steps.
            </p>

            <div className="mt-6">
              <LeadForm
                formIdPrefix="hero-form"
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onSubmit={handleHeroSubmit}
              />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Real students. Real MBBS seats. Real stories.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              These are the same student review videos families already respond to
              on the older landing pages, now included here as well.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
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
            These are real Indian students and families who moved from confusion
            to clarity after counselling, shortlisting, and choosing a practical
            MBBS abroad route.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Why 17,000+ students chose {BRAND_NAME} for their white coat
              journey
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Families do not just need admission. They need clarity,
              compliance, support, and a trusted team that has already done this
              thousands of times.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {advantagePoints.map((point) => {
              const Icon = point.icon;
              return (
                <article
                  key={point.title}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-tight text-slate-950">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {point.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Which top-ranked medical hub is right for you?
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Compare the experience, budget, and academic fit across Georgia,
              Kazakhstan, and Uzbekistan before you commit.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {destinationCards.map((card) => (
              <article
                key={card.title}
                className={`overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]`}
              >
                <div
                  className={`bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,1))] p-7`}
                >
                  <div
                    className={`inline-flex items-center rounded-full bg-gradient-to-r ${card.accentClassName} px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700`}
                  >
                    Premium destination
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
                    {card.title}
                  </h3>

                  <div className="mt-6 space-y-5">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        The vibe
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {card.vibe}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        The advantage
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {card.advantage}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        The investment
                      </p>
                      <p className="mt-2 text-base font-semibold leading-7 text-slate-900">
                        {card.investment}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
                Start your journey in 3 simple steps
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Leave the intense uncertainty of Indian seat shortages behind.
                The eligibility checklist is much simpler than most families
                assume.
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                No IELTS or TOEFL required for these destinations
              </p>
            </div>

            <div className="space-y-4">
              {eligibilitySteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-[28px] border border-white/10 bg-white/5 px-5 py-5 shadow-[0_18px_45px_rgba(8,18,38,0.22)]"
                >
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg font-black text-sky-200">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                      Step {index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-200">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        ref={bottomCtaRef}
        className="bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)]"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
              Bottom call to action
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Don&apos;t let your medical dreams wait another year
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              With 17,000+ successful placements and a long-standing track
              record since 2009, {BRAND_NAME} is ready to guide you toward the
              right university and destination.
            </p>

            <div className="mt-8 rounded-[28px] border border-blue-100 bg-white px-6 py-5 shadow-sm">
              <p className="text-base leading-8 text-slate-700">
                Seats in top NMC-aligned universities fill up quickly. Get your
                brochure-ready counselling call and eligibility guidance now.
              </p>
              <button
                type="button"
                onClick={() => {
                  trackLandingEvent({
                    eventType: "cta_click",
                    page: landingPagePath,
                    source:
                      "New-Lyf MBBS Abroad Landing Page - Bottom CTA Button",
                    ctaLabel: "Download Free Brochure & Check Your Eligibility Now",
                    ctaDestination: "#bottom-form",
                  });
                  scrollToElement(bottomCtaRef);
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300"
              >
                Download Free Brochure & Check Your Eligibility Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            id="bottom-form"
            className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8"
          >
            <h3 className="text-3xl font-black tracking-tight text-slate-950">
              Check your fit and get your options
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Same simple form, same expert guidance, and a clearer next step
              for you and your family.
            </p>

            <div className="mt-6">
              <LeadForm
                formIdPrefix="bottom-form"
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
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
