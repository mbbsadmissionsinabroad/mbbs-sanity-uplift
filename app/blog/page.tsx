import type { Metadata } from "next";
import React from "react";
import BlogSection from "./components/BlogSection";

export const metadata: Metadata = {
  title: "Blog | MBBS Admissions in Abroad",
  description:
    "Explore MBBS abroad guidance, updates, and practical articles for students and families planning overseas medical education.",
  alternates: {
    canonical: "https://www.mbbsadmissionsinabroad.com/blog",
  },
};

const page = () => {
  return (
    <>
      <section className="text-white body-font bg-blue-800 bg-gradient-to-r">
        <div className="container py-12 mx-auto">
          <h1 className="text-4xl font-large font-extrabold title-font text-center text-white">
            BLOG
          </h1>
          <p className=" w-3/4 mt-4 mx-auto leading-relaxed text-base text-center">
            Explore our insightful blog page designed to illuminate the diverse
            opportunities for pursuing MBBS across the globe. Let our motivating
            content inspire your journey into the world of international medical
            education.
          </p>
        </div>
      </section>
      <div className="sm:container py-12 mx-auto w-full items-center justify-center">
        <div className="mx-auto mb-8 max-w-5xl px-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Latest MBBS abroad guidance, country updates, and planning articles
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            This blog is where students and families can move beyond short
            marketing copy and get more practical context on MBBS abroad,
            medical PG pathways, nursing routes, German language preparation,
            and admission planning. The goal is to make the site more useful at
            the research stage, not only at the enquiry stage.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Articles here are intended to help readers compare countries,
            understand eligibility, spot recognition and licensing issues,
            prepare documents, and build a more realistic timeline before they
            commit to applications. If you are still deciding what to study,
            where to apply, or how much preparation is needed, this section is
            designed to give you clearer answers.
          </p>
        </div>
        <BlogSection />
        <div className="mx-auto mt-12 max-w-5xl px-4 text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            How to use the blog effectively
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Start with the destination or pathway most relevant to you, then
            compare it against budget, language requirements, return-on-study
            expectations, and long-term licensing goals. That way, every blog
            post becomes part of a clearer decision-making process instead of a
            disconnected read.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            We recommend using the blog alongside the core country and service
            pages. Read a destination overview first, then use related blog
            posts to dig deeper into fees, recognition, exams, visas,
            internships, language preparation, and post-study career planning.
            This approach gives students a more complete picture before they
            speak with a counsellor or submit an enquiry.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            As the site grows, this section will continue to support students
            who want sharper comparisons, more transparent guidance, and a
            better understanding of what studying or working abroad actually
            involves beyond headline promises.
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
