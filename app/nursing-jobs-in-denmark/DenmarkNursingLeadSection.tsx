"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  employers,
  ivrNumber,
  whatsappHref,
  whatsappNumber,
} from "./pageData";

type FormData = {
  name: string;
  phone: string;
  email: string;
  preferredEmployer: string;
};

const initialFormData: FormData = {
  name: "",
  phone: "",
  email: "",
  preferredEmployer: "",
};

function DenmarkNursingLeadForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
  buttonLabel,
}: {
  formData: FormData;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
  buttonLabel: string;
}) {
  const employerOptions = useMemo(
    () => employers.map((item) => item.Employer),
    []
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="denmark-nursing-name" className="mb-1 block text-sm font-medium text-slate-700">
          Full name
        </label>
        <input
          id="denmark-nursing-name"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Enter your full name"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="denmark-nursing-phone" className="mb-1 block text-sm font-medium text-slate-700">
            WhatsApp number
          </label>
          <input
            id="denmark-nursing-phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="+91"
          />
        </div>
        <div>
          <label htmlFor="denmark-nursing-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="denmark-nursing-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="denmark-nursing-employer" className="mb-1 block text-sm font-medium text-slate-700">
          Preferred employer or region
        </label>
        <select
          id="denmark-nursing-employer"
          name="preferredEmployer"
          value={formData.preferredEmployer}
          onChange={onChange}
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Select an option</option>
          {employerOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Submitting..." : buttonLabel}
      </button>
    </form>
  );
}

export default function DenmarkNursingLeadSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [popupData, setPopupData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<FormData>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setter((prev) => ({ ...prev, [name]: value }));
    };

  const submitLead = async (
    event: React.FormEvent,
    activeForm: FormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    reset: () => void,
    closePopup?: boolean
  ) => {
    event.preventDefault();
    setLoading(true);

    const requestData = {
      fields: {
        Name: activeForm.name,
        Phone: activeForm.phone,
        Email: activeForm.email,
        Course: "Nursing Jobs Abroad",
        StudyCountry: "Denmark",
        College: activeForm.preferredEmployer,
      },
      actions: [
        {
          type: "SYSTEM_NOTE",
          text: "Lead Source: Nursing Jobs in Denmark Page",
        },
      ],
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_LEAD_URL || "https://default-api.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LEAD_SECRET_KEY}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      const emailResponse = await fetch(
        "https://admission-backend.vercel.app/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok || !emailResponse.ok) {
        throw new Error("Submission failed");
      }

      reset();
      if (closePopup) {
        setShowPopup(false);
      }
      router.push("/thank-you?title=Nursing%20Jobs%20in%20Denmark");
    } catch (error) {
      console.error(error);
      toast.error("We could not submit your details. Please try WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-wrap items-center gap-2 rounded-[24px] border border-slate-200 bg-white/95 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.15)] backdrop-blur">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          WhatsApp
        </a>
        <a
          href={`tel:${ivrNumber.replace(/\s+/g, "")}`}
          className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
        >
          Call IVR
        </a>
        <button
          type="button"
          onClick={() => setShowPopup(true)}
          className="rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Enquire Now
        </button>
      </div>

      {showPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute right-5 top-5 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500"
            >
              Close
            </button>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              Talk to us directly
            </p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              Get personalised Denmark nursing guidance
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Share your details and our team will help with Danish language planning, STPS readiness, employer targeting and quota-reopening strategy.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${whatsappNumber.replace(/\s+/g, "")}`}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
              >
                Call {whatsappNumber}
              </a>
              <a
                href={`tel:${ivrNumber.replace(/\s+/g, "")}`}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500"
              >
                IVR {ivrNumber}
              </a>
            </div>
            <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <DenmarkNursingLeadForm
                formData={popupData}
                onChange={handleChange(setPopupData)}
                onSubmit={(event) =>
                  submitLead(
                    event,
                    popupData,
                    setIsPopupLoading,
                    () => setPopupData(initialFormData),
                    true
                  )
                }
                isLoading={isPopupLoading}
                buttonLabel="Request a Callback"
              />
            </div>
          </div>
        </div>
      ) : null}

      <section id="denmark-nursing-contact-form" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] bg-[linear-gradient(135deg,#1d4ed8_0%,#0f172a_100%)] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
              Contact Denmark Nursing Desk
            </p>
            <h3 className="mt-4 text-3xl font-bold">
              Speak to our team on WhatsApp or request a callback
            </h3>
            <p className="mt-4 text-base leading-8 text-slate-300">
              Use this section for Danish-language planning, 2027 quota strategy, STPS file readiness and employer shortlisting.
            </p>
            <div className="mt-8 grid gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white transition hover:brightness-95"
              >
                WhatsApp {whatsappNumber}
              </a>
              <a
                href={`tel:${whatsappNumber.replace(/\s+/g, "")}`}
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/50"
              >
                Call Now
              </a>
              <a
                href={`tel:${ivrNumber.replace(/\s+/g, "")}`}
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/50"
              >
                Call IVR {ivrNumber}
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              Quick Inquiry Form
            </p>
            <h3 className="mt-4 text-3xl font-bold text-slate-950">
              Request Denmark nursing support
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Fill this once and the team can contact you with the Denmark timeline, language plan and the most realistic path for your profile.
            </p>
            <div className="mt-8">
              <DenmarkNursingLeadForm
                formData={formData}
                onChange={handleChange(setFormData)}
                onSubmit={(event) =>
                  submitLead(
                    event,
                    formData,
                    setIsLoading,
                    () => setFormData(initialFormData)
                  )
                }
                isLoading={isLoading}
                buttonLabel="Submit Inquiry"
              />
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" />
    </>
  );
}

