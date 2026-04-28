"use client";

import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MessageCircleMore, PhoneCall, Send, X } from "lucide-react";

type FormState = {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
};

const WHATSAPP_NUMBER = "918147030030";
const IVR_NUMBER = "+918050575767";
const courseOptions = ["MBBS Abroad", "PG Medical", "Nursing Jobs", "Ausbildung"];
const WHATSAPP_BASE_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;

const initialFormState: FormState = {
  name: "",
  phone: "",
  email: "",
  course: "",
  message: "",
};

function useLeadForm(source: string) {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const API_URL =
    process.env.NEXT_PUBLIC_LEAD_URL ?? "https://default-api.com";
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_LEAD_SECRET_KEY;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    const requestData = {
      fields: {
        Name: formData.name,
        Phone: formData.phone,
        Email: formData.email,
        Course: formData.course,
        StudyCountry: "",
        ResidentCountry: "",
        State: "",
        Message: formData.message,
      },
      actions: [
        {
          type: "SYSTEM_NOTE",
          text: `Lead Source: ${source}`,
        },
      ],
    };

    try {
      const requests: Promise<Response>[] = [
        fetch("https://admission-backend.vercel.app/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }),
      ];

      if (API_URL !== "https://default-api.com" && ACCESS_TOKEN) {
        requests.push(
          fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify(requestData),
          })
        );
      }

      const responses = await Promise.all(requests);
      const allOk = responses.every((response) => response.ok);

      if (!allOk) {
        throw new Error("Failed to submit one or more requests.");
      }

      setFormData(initialFormState);
      setStatus({
        type: "success",
        message: "Thanks! Our team will contact you shortly.",
      });
      return true;
    } catch (error) {
      setStatus({
        type: "error",
        message: "Submission failed. Please try WhatsApp or call us directly.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    status,
    handleInputChange,
    submit,
  };
}

function SharedFields({
  form,
  formIdPrefix,
}: {
  form: ReturnType<typeof useLeadForm>;
  formIdPrefix: string;
}) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${formIdPrefix}-name`}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            id={`${formIdPrefix}-name`}
            type="text"
            name="name"
            value={form.formData.name}
            onChange={form.handleInputChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor={`${formIdPrefix}-phone`}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Phone
          </label>
          <input
            id={`${formIdPrefix}-phone`}
            type="tel"
            name="phone"
            value={form.formData.phone}
            onChange={form.handleInputChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${formIdPrefix}-email`}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id={`${formIdPrefix}-email`}
            type="email"
            name="email"
            value={form.formData.email}
            onChange={form.handleInputChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor={`${formIdPrefix}-course`}
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Course / Job Interested
          </label>
          <select
            id={`${formIdPrefix}-course`}
            name="course"
            value={form.formData.course}
            onChange={form.handleInputChange}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
            required
          >
            <option value="">Select an option</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formIdPrefix}-message`}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Message
        </label>
        <textarea
          id={`${formIdPrefix}-message`}
          name="message"
          value={form.formData.message}
          onChange={form.handleInputChange}
          rows={3}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
          placeholder="Tell us your budget, preferred country, NEET status, or current stage."
          required
        />
      </div>
    </>
  );
}

export function HomeQuickContactBar({
  onOpenForm,
}: {
  onOpenForm: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={WHATSAPP_BASE_URL}
        target="_blank"
        rel="noopener noreferrer external"
        className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
      >
        <MessageCircleMore className="h-4 w-4" />
        WhatsApp Us
      </a>
      <a
        href={`tel:${IVR_NUMBER}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
      >
        <PhoneCall className="h-4 w-4" />
        Call IVR
      </a>
      <button
        type="button"
        onClick={onOpenForm}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        <Send className="h-4 w-4" />
        Enquire Now
      </button>
    </div>
  );
}

export function HomeInlineLeadSection({
  onOpenForm,
}: {
  onOpenForm: () => void;
}) {
  const form = useLeadForm("Home Page Inline Form");
  const whatsappUrl = useMemo(
    () =>
      `${WHATSAPP_BASE_URL}&text=${encodeURIComponent(
        "Hi, I want guidance for MBBS abroad admissions."
      )}`,
    []
  );

  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
            Direct Contact
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight">
            Prefer talking to us right away?
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-200">
            Reach our team directly on WhatsApp, call the IVR line, or open the
            popup enquiry form. These CTAs now match the homepage design so the
            next step feels obvious on every screen size.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer external"
              className="flex items-center justify-between rounded-[1.5rem] border border-emerald-300/20 bg-emerald-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              <span className="inline-flex items-center gap-3">
                <MessageCircleMore className="h-5 w-5" />
                WhatsApp: +91 81470 30030
              </span>
              <span>Open</span>
            </a>
            <a
              href={`tel:${IVR_NUMBER}`}
              className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <span className="inline-flex items-center gap-3">
                <PhoneCall className="h-5 w-5" />
                IVR: +91 80505 75767
              </span>
              <span>Call now</span>
            </a>
            <button
              type="button"
              onClick={onOpenForm}
              className="flex w-full items-center justify-between rounded-[1.5rem] border border-sky-300/20 bg-sky-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
            >
              <span className="inline-flex items-center gap-3">
                <Send className="h-5 w-5" />
                Open popup contact form
              </span>
              <span>Launch</span>
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-7 text-slate-900 shadow-[0_26px_60px_rgba(15,23,42,0.12)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
            Contact Form
          </p>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
            Share your details for a personalized admission callback
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This follows the same structured flow as the Contact page so your
            team gets better lead details from the homepage itself.
          </p>

          <form onSubmit={form.submit} className="mt-8 space-y-4">
            <SharedFields form={form} formIdPrefix="home-inline" />

            {form.status.type && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm ${
                  form.status.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {form.status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={form.isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {form.isSubmitting ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function HomePopupLeadForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const form = useLeadForm("Home Page Popup Form");

  const handleSubmit = async (event: React.FormEvent) => {
    const ok = await form.submit(event);
    if (ok) {
      setTimeout(() => {
        onClose();
      }, 600);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[80]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_32px_90px_rgba(15,23,42,0.24)]">
                <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
                  <div className="bg-[linear-gradient(160deg,#081226_0%,#0f2a58_58%,#0ea5e9_140%)] p-8 text-white">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">
                          Popup Enquiry
                        </p>
                        <h3 className="mt-4 text-3xl font-black tracking-tight">
                          Let our team help you choose the right path
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close enquiry form"
                        className="rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <p className="mt-6 text-sm leading-7 text-slate-100">
                      Fill this form for a callback, or skip the wait and contact
                      us directly through WhatsApp or IVR.
                    </p>

                    <div className="mt-8 space-y-4">
                      <a
                        href={WHATSAPP_BASE_URL}
                        target="_blank"
                        rel="noopener noreferrer external"
                        className="flex items-center gap-3 rounded-[1.5rem] bg-emerald-400 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
                      >
                        <MessageCircleMore className="h-5 w-5" />
                        WhatsApp +91 81470 30030
                      </a>
                      <a
                        href={`tel:${IVR_NUMBER}`}
                        className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/15"
                      >
                        <PhoneCall className="h-5 w-5" />
                        Call IVR +91 80505 75767
                      </a>
                    </div>
                  </div>

                  <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <SharedFields form={form} formIdPrefix="home-popup" />

                      {form.status.type && (
                        <div
                          className={`rounded-2xl px-4 py-3 text-sm ${
                            form.status.type === "success"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {form.status.message}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={form.isSubmitting}
                          className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          <Send className="h-4 w-4" />
                          {form.isSubmitting ? "Submitting..." : "Submit Enquiry"}
                        </button>
                        <button
                          type="button"
                          onClick={onClose}
                          className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
