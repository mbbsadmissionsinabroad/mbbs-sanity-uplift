"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

const ThankYou = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "our services"; // Get the title from URL

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-gradient-to-br from-blue-50 to-white p-10 rounded-2xl shadow-lg text-center max-w-lg mx-auto"
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full">
            <svg
              className="w-12 h-12 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-blue-700 mt-4">Thank You!</h1>
          <p className="mt-3 text-gray-600 text-lg">
            We appreciate your interest in{" "}
            <span className="font-semibold text-blue-500">{title}</span>. Our
            team will get back to you soon.
          </p>
          <Link href="/">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md">
              Back to Home
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
