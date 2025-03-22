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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md"
      >
        <h1 className="text-3xl font-semibold text-blue-600">Thank You!</h1>
        <p className="mt-4 text-gray-600">
          Thank you for enquiring with us for{" "}
          <span className="font-medium text-blue-500">{title}</span>. We will
          get back to you as soon as possible.
        </p>
        <Link href="/">
          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;
