"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

const ThankYou = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "our services"; // Get the title from URL

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-2xl w-full"
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-5 rounded-full shadow-md">
            <svg
              className="w-16 h-16 text-blue-600"
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
          <h1 className="text-4xl font-extrabold text-blue-700 mt-5">
            Thank You!
          </h1>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Your interest in{" "}
            <span className="font-semibold text-blue-500">
              {title || "our services"}
            </span>{" "}
            is truly appreciated. We are committed to helping aspiring medical
            students achieve their dreams by offering expert guidance on MBBS
            programs abroad.
          </p>
          <p className="mt-3 text-gray-500 text-md">
            Our experienced counselors will get in touch soon to assist you in
            selecting the best-suited MBBS program based on your academic
            profile and career goals.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <Link href="/">
              <button className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md">
                Back to Home
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 bg-white border border-blue-600 text-blue-600 text-lg font-medium rounded-full hover:bg-blue-100 transition-all duration-300 shadow-md">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
