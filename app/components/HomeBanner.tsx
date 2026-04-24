"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { homeHeroHighlights } from "@/app/data/siteContent";

export default function HomeBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const notifySuccess = () =>
    toast.success("Thanks for contacting us, will respond to this ASAP!");

  const notifyFailure = () =>
    toast.error(
      "Sorry, there might be an issue with the server. Please try again later."
    );

  const notifyEmptyField = () =>
    toast.error("Please complete all fields before submitting the form.");

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !phone || !email || !message) {
      notifyEmptyField();
      setIsLoading(false);
      return;
    }

    const requestData = [
      { Attribute: "Name", Value: name },
      { Attribute: "Phone", Value: phone },
      { Attribute: "Email", Value: email },
      { Attribute: "Message", Value: message },
      { Attribute: "Lead Source", Value: "Home Page" },
    ];

    try {
      const response = await fetch(
        "https://admission-backend.vercel.app/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setPhone("");
      setName("");
      setEmail("");
      setMessage("");
      notifySuccess();
      localStorage.setItem("isFormFilled", "true");
    } catch (error) {
      notifyFailure();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="absolute inset-0">
        <Image
          src="/assests/home-page-banner-1.png"
          alt="MBBS abroad consultation background"
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-200">
            MBBS Abroad Guidance
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build your MBBS abroad journey with a page that feels clear,
            direct, and easy to trust.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            We guide Indian students through country selection, university
            comparisons, documentation, visa support, and direct enquiry
            assistance without hiding the next step.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {homeHeroHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-sm font-medium text-slate-100 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Request Consultation
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Read Updates
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/95 p-5 text-slate-900 shadow-2xl shadow-black/20">
          <div className="overflow-hidden rounded-[1.5rem]">
            <Image
              src="/assests/home-page-banner-2.webp"
              alt="MBBS abroad student consultation"
              width={1200}
              height={800}
              className="h-56 w-full object-cover sm:h-64"
            />
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Request Free Consultation
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Talk to our admission team
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share your details and we will reach out with a personalized
              MBBS abroad recommendation.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <input
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-blue-600"
            />
            <input
              placeholder="Enter your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-blue-600"
            />
            <input
              placeholder="Enter your Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-blue-600"
            />
            <textarea
              placeholder="Tell us your preferred country or budget"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-blue-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            {isLoading ? "Submitting..." : "SEND REQUEST"}
          </button>
        </div>
      </div>
    </section>
  );
}
