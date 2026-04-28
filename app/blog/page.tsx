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
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Families often use the blog as a second layer of research. First,
            they visit a country or service page. Then, they use blog articles
            to dig into fees, eligibility, recognition, deadlines, language
            preparation, and career fit. That makes the reading process more
            useful than browsing random articles without a clear plan.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            A useful blog should also save time. It should help readers reject
            weak-fit routes early and focus on the destinations or pathways
            that match their budget, documents, language comfort, and long-term
            medical or nursing goals. That is why this section is built around
            practical decision support rather than general motivation alone.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Readers can also use this page as a planning hub. Open one article,
            note the main cost point, recognition point, language point, and
            timing point, then compare that with another route. That simple
            method turns the blog from a reading section into a better decision
            tool for families who are still shortlisting countries or services.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            The strongest blog content does one job well. It reduces confusion.
            It should help a student say yes with more confidence, say no with
            good reason, or keep only a short list for the next counsellor
            conversation. That is the standard this section is designed to
            support as the site keeps growing.
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
