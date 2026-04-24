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
        </div>
        <BlogSection />
      </div>
    </>
  );
};

export default page;
