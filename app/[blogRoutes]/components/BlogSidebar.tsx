"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import TOC from "./TOC";

type SidebarCategory = {
  name: string;
  count: number;
};

type SidebarPost = {
  title: string;
  href: string;
  category?: string;
};

type BlogSidebarProps = {
  categories: SidebarCategory[];
  latestPosts: SidebarPost[];
  currentCategory?: string;
};

type StudentType = "Fresher" | "Repeater" | "Qualified Earlier" | "";

type SidebarFormData = {
  fullName: string;
  email: string;
  phone: string;
  studentType: StudentType;
};

const primaryCallNumber = "+91 80505 75767";
const initialFormData: SidebarFormData = {
  fullName: "",
  email: "",
  phone: "",
  studentType: "",
};

function initialsForCategory(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function BlogSidebar({
  categories,
  latestPosts,
  currentCategory,
}: BlogSidebarProps) {
  const topCategories = useMemo(() => categories.slice(0, 8), [categories]);
  const [formData, setFormData] = useState<SidebarFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setIsSubmitted(false);

    try {
      const response = await fetch("/api/blog-sidebar-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Sidebar enquiry failed");
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Blog sidebar enquiry failed", error);
      setSubmitError(
        "We could not save your enquiry right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="w-full">
      <div className="space-y-6 lg:sticky lg:top-28">
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#0f2746_0%,#112d53_100%)] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold uppercase tracking-[0.18em] text-sky-100">
              MB
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                Quick Enquiry
              </p>
              <h2 className="mt-1 text-xl font-bold text-white">
                Speak with our counselling team
              </h2>
            </div>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="blog-sidebar-name"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Full name
              </label>
              <input
                id="blog-sidebar-name"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-white/12 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100/60"
                required
              />
            </div>

            <div>
              <label
                htmlFor="blog-sidebar-email"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Email
              </label>
              <input
                id="blog-sidebar-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/12 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100/60"
                required
              />
            </div>

            <div>
              <label
                htmlFor="blog-sidebar-phone"
                className="mb-2 block text-sm font-medium text-slate-100"
              >
                Phone number
              </label>
              <input
                id="blog-sidebar-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91"
                className="w-full rounded-2xl border border-white/12 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100/60"
                required
              />
            </div>

            <div>
              <span className="mb-2 block text-sm font-medium text-slate-100">
                You are
              </span>
              <div className="grid gap-2">
                {(
                  ["Fresher", "Repeater", "Qualified Earlier"] as StudentType[]
                ).map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 rounded-2xl border border-white/12 bg-white/10 px-4 py-3 text-sm text-white"
                  >
                    <input
                      type="radio"
                      name="studentType"
                      value={option}
                      checked={formData.studentType === option}
                      onChange={handleInputChange}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {submitError ? (
              <p className="text-sm leading-6 text-red-200">{submitError}</p>
            ) : null}

            {isSubmitted ? (
              <p className="text-sm leading-6 text-emerald-200">
                Your enquiry has been submitted successfully.
              </p>
            ) : null}

            <div className="mt-6 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#f3b33d] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#f8c35b] disabled:cursor-wait disabled:opacity-75"
              >
                {isSubmitting ? "Submitting..." : "Enquire Now"}
              </button>
              <p className="text-center text-xs leading-6 text-slate-300">
                Direct counselling line: {primaryCallNumber}
              </p>
            </div>
          </form>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Navigation
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                Table of contents
              </h3>
            </div>
          </div>
          <div className="mt-4 text-sm leading-7 text-slate-700">
            <TOC />
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Categories
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            Explore by topic
          </h3>
          <div className="mt-4 space-y-3">
            {topCategories.map((category) => {
              const isCurrent = category.name === currentCategory;

              return (
                <div
                  key={category.name}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${
                    isCurrent
                      ? "border-sky-200 bg-sky-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-xs font-bold uppercase tracking-[0.16em] text-slate-700 shadow-sm">
                      {initialsForCategory(category.name)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {category.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {category.count} article{category.count === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Latest posts
          </p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            Fresh guidance
          </h3>
          <div className="mt-4 space-y-4">
            {latestPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-sky-200 hover:bg-sky-50"
              >
                {post.category ? (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {post.category}
                  </p>
                ) : null}
                <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                  {post.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
