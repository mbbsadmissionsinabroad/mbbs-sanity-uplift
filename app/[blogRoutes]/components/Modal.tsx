"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
};

export default function EnquiryPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem("enquiry_submitted");

    if (!hasSubmitted) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/blog-popup-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Popup enquiry failed");
      }

      localStorage.setItem("enquiry_submitted", "true");
      setFormData(initialFormData);
      setIsVisible(false);
    } catch (submitError) {
      console.error("Popup enquiry failed:", submitError);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        className="relative w-[95%] rounded-2xl bg-white p-8 shadow-xl sm:w-[500px]"
      >
        <h2 className="text-center text-3xl font-bold text-indigo-600">
          Enquire Now
        </h2>
        <p className="mt-2 text-center text-gray-500">
          Fill out your details and we&apos;ll get back to you.
        </p>

        <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {error ? (
            <p className="text-center text-sm text-red-500">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-md py-3 text-lg transition ${
              isSubmitting
                ? "cursor-not-allowed bg-gray-400"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Enquire Now"}
          </button>
        </form>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-3 top-3 text-2xl text-gray-500 hover:text-gray-800"
          aria-label="Close enquiry popup"
        >
          ×
        </button>
      </motion.div>
    </div>
  );
}
