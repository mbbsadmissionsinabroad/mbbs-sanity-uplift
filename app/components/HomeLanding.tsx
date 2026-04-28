"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  FileCheck2,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MessageCircleMore,
  PhoneCall,
  PlaneTakeoff,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import {
  HomeInlineLeadSection,
  HomeQuickContactBar,
} from "./HomeLeadCapture";
import {
  faq,
  faqSummary,
  howCanWeAssistYou,
  howCanWeAssistYouSummary,
} from "../utilities/HomePageStaticData";
import homeBannerOne from "../../public/assests/home-page-banner-1.png";
import russiaCollege3 from "../../public/russia-college-3.webp";
import russiaCollege4 from "../../public/russia-college-4.webp";
import studentTwoImage from "../../public/student2.jpeg";

const Testinomials = dynamic(() => import("./Testinomials"));
const Assist = dynamic(() => import("./Assist"));
const HomePopupLeadForm = dynamic(() =>
  import("./HomeLeadCapture").then((module) => module.HomePopupLeadForm)
);

const heroStats = [
  { value: "15+", label: "years guiding students" },
  { value: "250+", label: "partner universities" },
  { value: "5000+", label: "student journeys supported" },
];

const trustPoints = [
  "Counselling with country-wise comparisons",
  "Transparent budget and document planning",
  "Visa, travel, and pre-departure guidance",
  "Pathways for MBBS, PG, nursing, and Ausbildung",
];

const pathwayCards = [
  {
    title: "Country and course matching",
    body: "We help you shortlist universities by budget, eligibility, recognition, climate, and long-term licensing goals.",
    icon: Globe2,
  },
  {
    title: "Applications and documentation",
    body: "From academic paperwork to offer letters, we keep the process organized and reduce last-minute surprises.",
    icon: FileCheck2,
  },
  {
    title: "Visa and travel support",
    body: "Our team supports visa preparation, departure planning, and onboarding so the move abroad feels manageable.",
    icon: PlaneTakeoff,
  },
  {
    title: "Safe decision-making",
    body: "We focus on recognized universities, realistic costs, and practical advice instead of vague promises.",
    icon: ShieldCheck,
  },
];

const featuredDestinations = [
  {
    title: "MBBS in Russia",
    href: "/mbbs-in-russia",
    image: "/russia-college-1.webp",
    blurb: "Affordable fee structures, strong medical traditions, and broad university choice.",
  },
  {
    title: "MBBS in Armenia",
    href: "/mbbs-in-armenia",
    image: "/students.jpeg",
    blurb: "Popular with Indian students looking for manageable costs and supportive campuses.",
  },
  {
    title: "MBBS in Georgia",
    href: "/mbbs-in-georgia",
    image: "/assests/country/Georgia01.png",
    blurb: "A balanced option for students comparing English-medium programs and lifestyle fit.",
  },
  {
    title: "MBBS in Malaysia",
    href: "/mbbs-admission-in-malaysia-for-indian-students",
    image: "/malaysia-hero.webp",
    blurb: "Modern city campuses and an approachable environment for international students.",
  },
  {
    title: "Medical PG in Germany",
    href: "/medical-pg-in-germany",
    image: "/assests/doctor-image.jpeg",
    blurb: "For students planning the next step after graduation with a Europe-focused pathway.",
  },
  {
    title: "Nursing Jobs in Germany",
    href: "/nursing-job-in-germany",
    image: "/assests/who-are-we-2.jpeg",
    blurb: "A strong option for healthcare careers with language and relocation support.",
  },
];

const guidanceSteps = [
  {
    step: "01",
    title: "Tell us your goals",
    body: "Share your marks, budget range, preferred countries, and whether you are looking at MBBS, PG, or nursing pathways.",
    icon: HeartHandshake,
  },
  {
    step: "02",
    title: "Compare realistic options",
    body: "We help you compare universities on fee structure, living cost, recognition, language, and student life.",
    icon: Building2,
  },
  {
    step: "03",
    title: "Prepare documents with confidence",
    body: "Application support, visa paperwork, timelines, and travel planning are handled in a structured flow.",
    icon: BookOpen,
  },
  {
    step: "04",
    title: "Move abroad prepared",
    body: "You get pre-departure guidance, communication support, and a clearer picture of what happens after landing.",
    icon: Landmark,
  },
];

const contentHighlights = [
  {
    title: "Affordable options without vague promises",
    body: "We elevate the conversation beyond hype by focusing on recognition, practical costs, and student fit.",
  },
  {
    title: "Better research before you commit",
    body: "Country guides, blog updates, and destination pages help families compare choices instead of guessing.",
  },
  {
    title: "A smoother path from enquiry to admission",
    body: "Calls to action are clearer, the routes are easier to follow, and the most useful destinations are one click away.",
  },
];

function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

function SectionIntro({
  eyebrow,
  title,
  body,
  level = "h3",
}: {
  eyebrow: string;
  title: string;
  body: string;
  level?: "h2" | "h3";
}) {
  const HeadingTag = level;
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
        {eyebrow}
      </p>
      <HeadingTag className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </HeadingTag>
      <p className="mt-4 text-base leading-7 text-slate-600">{body}</p>
    </div>
  );
}

export default function HomeLanding() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_28%,#f7fafc_100%)] text-slate-900">
      <HomePopupLeadForm
        open={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      <div className="fixed bottom-5 right-5 z-40 hidden flex-col gap-3 lg:flex">
        <a
          href="https://api.whatsapp.com/send?phone=918147030030"
          target="_blank"
          rel="noopener noreferrer external"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_16px_36px_rgba(15,23,42,0.16)] transition hover:bg-emerald-300"
        >
          <MessageCircleMore className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href="tel:+918050575767"
          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(15,23,42,0.16)] transition hover:bg-slate-800"
        >
          <PhoneCall className="h-4 w-4" />
          Call IVR
        </a>
        <button
          type="button"
          onClick={() => setIsLeadModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_16px_36px_rgba(15,23,42,0.16)] transition hover:bg-slate-50"
        >
          <Send className="h-4 w-4" />
          Enquiry Form
        </button>
      </div>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.14),transparent_30%),linear-gradient(135deg,#081226_10%,#0f1e3e_55%,#102f6f_100%)]" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_52%)]" />
        <div
          aria-hidden="true"
          className="absolute left-[6%] top-28 h-32 w-32 rounded-full border border-white/15 bg-white/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-16 right-[14%] h-40 w-40 rounded-full border border-sky-300/20 bg-sky-300/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:px-8 lg:pb-24 lg:pt-24">
          <Reveal className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Study Abroad Guidance
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Study MBBS abroad with clarity, confidence, and trusted guidance.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              We rebuilt the first impression around what students actually need:
              country comparisons, realistic fee expectations, recognition
              awareness, visa support, and direct next steps without confusion.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Latest Blogs
              </Link>
            </div>

            <div className="mt-4">
              <HomeQuickContactBar
                onOpenForm={() => setIsLeadModalOpen(true)}
              />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {heroStats.map((item, index) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/12 bg-white/10 px-5 py-5 backdrop-blur"
                >
                  <p className="text-3xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-100">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {trustPoints.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/15 px-4 py-2 text-sm text-slate-100"
                >
                  <BadgeCheck className="h-4 w-4 text-sky-300" />
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="relative">
              <div className="absolute -left-6 top-8 hidden rounded-3xl border border-white/60 bg-white/90 p-4 shadow-2xl lg:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                      Guidance
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      Country fit before application
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative col-span-2 overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-[0_30px_70px_rgba(2,6,23,0.3)]">
                  <Image
                    src="/malaysia-hero-skyline.jpg"
                    alt="Students exploring an international study destination skyline"
                    width={1200}
                    height={820}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                    quality={72}
                    className="h-[320px] w-full object-cover sm:h-[360px]"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-100">
                      Global Study Paths
                    </p>
                    <p className="mt-2 max-w-md text-lg font-semibold text-white">
                      Modern destinations, practical planning, and clearer choices for Indian medical aspirants.
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/10 shadow-xl">
                  <Image
                    src="/students.jpeg"
                    alt="Indian students discussing study abroad plans"
                    width={700}
                    height={820}
                    sizes="(max-width: 640px) 50vw, 22vw"
                    quality={68}
                    className="h-52 w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/10 shadow-xl">
                  <Image
                    src="/russia-college-2.jpeg"
                    alt="International medical campus exterior"
                    width={700}
                    height={820}
                    sizes="(max-width: 640px) 50vw, 22vw"
                    quality={68}
                    className="h-52 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 -mt-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {contentHighlights.map((item, index) => (
            <Reveal key={item.title}>
              <div className="h-full rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                  Homepage upgrade
                </p>
                <p className="mt-3 text-xl font-bold text-slate-950">
                  {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Why Students Choose Us"
          title="The support stays practical from first enquiry to departure"
          body="The previous homepage talked about counselling, visa support, documentation, and affordable options. This version keeps those promises and makes them easier to understand at a glance."
          level="h2"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pathwayCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title}>
                <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_35px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="inline-flex rounded-2xl bg-sky-50 p-3 text-sky-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="How It Works"
            title="A clearer path from confusion to campus"
            body="We turned the old service list into a more usable flow so families can see what happens next instead of reading broad promises."
            level="h3"
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {guidanceSteps.map((item, index) => {
            const Icon = item.icon;
            return (
                <Reveal key={item.step}>
                  <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="absolute right-5 top-4 text-6xl font-black text-white/5">
                      {item.step}
                    </div>
                    <div className="inline-flex rounded-2xl bg-white/10 p-3 text-sky-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
                      Step {item.step}
                    </p>
                    <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Featured Destinations"
          title="Start with the countries and pathways families ask about most"
          body="Each card below takes students directly to a destination or career page, so the homepage becomes a better launchpad instead of a dead-end brochure."
          level="h3"
        />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredDestinations.map((item) => (
            <Reveal key={item.href}>
              <div className="group h-full transition-transform duration-300 hover:-translate-y-1.5">
                <Link
                  href={item.href}
                  className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={900}
                      height={640}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      quality={68}
                      className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
                      <Stethoscope className="h-3.5 w-3.5" />
                      Explore
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-2xl font-bold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                      {item.blurb}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                      Open page
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Visual Story"
            title="More atmosphere, more confidence, and a stronger sense of life beyond the brochure"
            body="The old homepage had useful information but not much visual momentum. This gallery gives the page more depth while keeping the subject focused on international education."
            level="h3"
          />

          <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
            <Reveal className="md:col-span-5 md:row-span-2">
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem]">
                <Image
                  src={homeBannerOne}
                  alt="Counselling session for students planning study abroad"
                  width={homeBannerOne.width}
                  height={homeBannerOne.height}
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                    Counselling
                  </p>
                  <p className="mt-2 text-2xl font-bold">
                    Guidance should feel personal, not mechanical.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-4">
              <div className="relative min-h-[200px] overflow-hidden rounded-[2rem]">
                <Image
                  src={russiaCollege3}
                  alt="Study abroad medical campus"
                  width={russiaCollege3.width}
                  height={russiaCollege3.height}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="md:col-span-3">
              <div className="relative min-h-[200px] overflow-hidden rounded-[2rem]">
                <Image
                  src={studentTwoImage}
                  alt="Student portrait for study abroad experience"
                  width={studentTwoImage.width}
                  height={studentTwoImage.height}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="md:col-span-3">
              <div className="relative min-h-[200px] overflow-hidden rounded-[2rem]">
                <Image
                  src={russiaCollege4}
                  alt="International medical infrastructure"
                  width={russiaCollege4.width}
                  height={russiaCollege4.height}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="md:col-span-6">
              <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[2rem] border border-sky-100 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">
                  <ShieldCheck className="h-4 w-4" />
                  Built for trust
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-950">
                    Stronger visual design should still keep the next step obvious.
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                    That is why the page now balances atmosphere with action:
                    destination cards, clear enquiry routes, meaningful proof,
                    and content that still sounds grounded.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Speak With Our Team
                  </Link>
                  <Link
                    href="/blog"
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Read Student Resources
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsLeadModalOpen(true)}
                    className="rounded-full border border-sky-200 bg-sky-50 px-5 py-3 text-sm font-semibold text-sky-800 transition hover:bg-sky-100"
                  >
                    Open Enquiry Popup
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <HomeInlineLeadSection
        onOpenForm={() => setIsLeadModalOpen(true)}
      />

      <Testinomials />

      <Assist
        data={howCanWeAssistYou}
        title="HOW CAN WE ASSIST YOU"
        summary={howCanWeAssistYouSummary}
        headingLevel="h3"
      />

      <Assist
        data={faq}
        title="MBBS ADMISSION CONSULTANCY IN INDIA"
        summary={faqSummary}
        headingLevel="h3"
      />
    </div>
  );
}
