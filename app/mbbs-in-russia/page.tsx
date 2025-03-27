"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Image from "next/image";
import img1 from "@/public/russia-college-1.webp";
import img2 from "@/public/russia-college-2.avif";
import img3 from "@/public/russia-college-3.webp";
import img4 from "@/public/russia-college-4.webp";

export default function MBBSInRussia() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const API_URL = process.env.NEXT_PUBLIC_LEAD_URL ?? "https://default-api.com";

  const notifySuccess = () =>
    toast.success("Thanks for contacting us, will respond to this ASAP!");

  const notifyFailure = () =>
    toast.error(
      "Sorry, there might be an issue with the server. Please try again later."
    );

  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_LEAD_SECRET_KEY;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const requestData = {
      fields: {
        Name: formData.name,
        Phone: formData.phone,
        Email: formData.email,
        College: formData.university,
      },
      actions: [
        {
          type: "SYSTEM_NOTE",
          text: "Lead Source: MBBS in Russia Landing Page",
        },
      ],
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setIsLoading(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          university: "",
        });
        router.push("/thank-you");
      } else {
        setIsLoading(false);
        notifyFailure();
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      notifyFailure();
    }
  };

  return (
    <>
      <Head>
        <title>
          MBBS in Russia 2025 | Affordable Medical Education | NMC Approved
        </title>
        <meta
          name="description"
          content="Complete guide to MBBS in Russia for Indian students for 2025 intake. Study at WHO/NMC approved universities with fees under ₹20 Lakhs. Admission process, eligibility, and career opportunities."
        />
        <meta
          name="keywords"
          content="MBBS in Russia 2025, Medical education Russia, NMC approved universities 2025, Affordable MBBS abroad, MBBS for Indian students"
        />
        <meta
          property="og:title"
          content="MBBS in Russia 2025 - Affordable & Globally Recognized"
        />
        <meta
          property="og:description"
          content="Study MBBS in Russia at top medical universities under ₹20 Lakhs for 2025 intake with English medium programs approved by NMC, WHO, and MCI."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com/mbbs-in-russia" />
      </Head>

      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        as="style"
      />

      <h1 className="text-4xl pt-16 pb-8 font-extrabold bg-blue-900 text-center text-white">
        MBBS in Russia - Complete Guide for 2025 Intake
      </h1>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {/* Mobile Form First */}
        <div className="block md:hidden mb-10">
          <div className="bg-blue-800 text-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Apply for 2025 Intake
            </h2>
            <p className="text-center mb-6">
              Limited seats available at top universities
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="university" className="block mb-1">
                  Preferred University*
                </label>
                <select
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select University</option>
                  <option value="NOSMA">
                    North Ossetian State Medical Academy
                  </option>
                  <option value="Kadyrov">
                    Kadyrov Chechen State University
                  </option>
                  <option value="PSMU">Pacific State Medical University</option>
                  <option value="North Caucasian">
                    North Caucasian State University
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold shadow-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Get Admission Details"
                )}
              </button>
            </form>
            <div className="mt-4 text-sm text-blue-100">
              <p>
                By submitting this form, you agree to our privacy policy and
                consent to receive updates via WhatsApp/Email.
              </p>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-10 items-start">
          {/* Left Side Content */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                Pursue Your MBBS in Russia – Affordable, Globally Recognized,
                and NMC/WHO Approved!
              </h2>
              <p className="text-lg text-gray-700">
                Dreaming of becoming a doctor? Study MBBS in Russia at top
                medical universities under ₹20 Lakhs with English-medium
                programs recognized worldwide.
              </p>
              <ul className="mt-6 space-y-3 text-gray-700 list-none pl-0">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Affordable Fees
                  – Complete your MBBS under ₹20 Lakhs
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Globally
                  Recognized Degrees – Approved by NMC, WHO, and UNESCO
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Hands-On
                  Clinical Training – Gain practical experience in top hospitals
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Cultural
                  Comfort – Halal food, Indian mess, and welcoming environment
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Exploring MBBS in Russia: A Comprehensive Guide for Aspiring
                Doctors
              </h2>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    How Long Does MBBS in Russia Take?
                  </h3>
                  <p>
                    The MBBS program in Russia typically spans 6 years,
                    including 5 years of academic training and 1 year of
                    practical internship. This duration equips students with
                    both theoretical knowledge and hands-on clinical experience.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Language of MBBS Education in Russia
                  </h3>
                  <p>
                    Most Russian medical universities offer MBBS programs in
                    English, especially for international students. However,
                    some institutions teach in Russian, and learning basic
                    Russian is often encouraged to interact with patients during
                    clinical practice.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Are Russian Medical Universities Globally Recognized?
                  </h3>
                  <p>
                    Top Russian medical universities are approved by major
                    international bodies like the World Health Organization
                    (WHO), the National Medical Commission of India (NMC), and
                    UNESCO. This ensures that graduates can practice medicine
                    worldwide after clearing relevant licensing exams.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Eligibility Criteria for MBBS in Russia
                  </h3>
                  <p>To enroll, students typically need the following:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>
                      A minimum of 50% in Physics, Chemistry, and Biology in
                      their 12th-grade exams (40% for reserved categories in
                      India).
                    </li>
                    <li>
                      Qualification in the NEET exam (mandatory for Indian
                      students).
                    </li>
                    <li>
                      Age between 17 and 25 years at the time of admission.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Essential Documents for MBBS Admission in Russia
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      10th & 12th Mark Sheets
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      NEET Scorecard
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      Valid Passport
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      Passport Photos
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      Medical Certificate
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      Invitation Letter
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Top Medical Universities in Russia for 2025 Intake
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {/* University 1 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={img1}
                    alt="North Ossetian State Medical Academy"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-blue-700">
                      North Ossetian State Medical Academy (NOSMA)
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Vladikavkaz, Russia | Established 1939
                    </p>
                    <p className="mt-2 text-gray-700">
                      Affordable fees starting under ₹15 Lakhs. Recognized by
                      NMC, WHO, and MCI with excellent clinical exposure.
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        NMC Approved
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium ml-2">
                        WHO Listed
                      </span>
                    </div>
                  </div>
                </div>

                {/* University 2 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={img2}
                    alt="Kadyrov Chechen State University"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-blue-700">
                      Kadyrov Chechen State University
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Grozny, Russia | Established 1938
                    </p>
                    <p className="mt-2 text-gray-700">
                      World-class medical education under ₹20 Lakhs. Modern
                      campus with American-style curriculum.
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        NMC Approved
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium ml-2">
                        WHO Listed
                      </span>
                    </div>
                  </div>
                </div>

                {/* University 3 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={img3}
                    alt="Pacific State Medical University"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-blue-700">
                      Pacific State Medical University
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Vladivostok, Russia | Established 1958
                    </p>
                    <p className="mt-2 text-gray-700">
                      Led by Prof. Valentin B. Shumatov with strong
                      international collaborations and research focus.
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        NMC Approved
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium ml-2">
                        WHO Listed
                      </span>
                    </div>
                  </div>
                </div>

                {/* University 4 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={img4}
                    alt="North Caucasian State University"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-blue-700">
                      North Caucasian State University
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Stavropol, Russia | Established 1930
                    </p>
                    <p className="mt-2 text-gray-700">
                      Popular among Indian students for its multicultural
                      environment and Indian food options.
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        NMC Approved
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium ml-2">
                        WHO Listed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                MBBS in Russia vs India: A Quick Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-2 px-4 border">Factor</th>
                      <th className="py-2 px-4 border">Russia</th>
                      <th className="py-2 px-4 border">India</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border">Total Cost</td>
                      <td className="py-2 px-4 border">₹15-25 Lakhs</td>
                      <td className="py-2 px-4 border">₹50L-1Cr (Private)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border">Admission Criteria</td>
                      <td className="py-2 px-4 border">50% in PCB + NEET</td>
                      <td className="py-2 px-4 border">NEET 550+ (Govt)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">Global Recognition</td>
                      <td className="py-2 px-4 border">WHO/NMC Approved</td>
                      <td className="py-2 px-4 border">NMC Approved</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2 px-4 border">Duration</td>
                      <td className="py-2 px-4 border">6 Years</td>
                      <td className="py-2 px-4 border">5.5 Years</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border">
                        Medium of Instruction
                      </td>
                      <td className="py-2 px-4 border">English</td>
                      <td className="py-2 px-4 border">English/Regional</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Application Timeline for 2025 Intake
              </h2>
              <div className="relative">
                <div className="border-l-2 border-blue-500 absolute h-full left-4"></div>
                <div className="space-y-8 pl-10">
                  <div className="relative">
                    <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      1
                    </div>
                    <h3 className="font-semibold">January - April 2025</h3>
                    <p className="text-gray-600">
                      University research and shortlisting
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      2
                    </div>
                    <h3 className="font-semibold">May - July 2025</h3>
                    <p className="text-gray-600">
                      Document preparation and application submission
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      3
                    </div>
                    <h3 className="font-semibold">August 2025</h3>
                    <p className="text-gray-600">
                      Receive invitation letter and apply for student visa
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      4
                    </div>
                    <h3 className="font-semibold">September 2025</h3>
                    <p className="text-gray-600">
                      Travel to Russia and complete university registration
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Career After MBBS in Russia
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    In India
                  </h3>
                  <p className="text-gray-700">
                    Clear FMGE exam → Complete internship → Register with State
                    Medical Council → Practice or pursue PG
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Abroad Options
                  </h3>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      USMLE for USA
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      PLAB for UK
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      AMC for Australia
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                      Practice in CIS
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Higher Education
                  </h3>
                  <p className="text-gray-700">
                    Pursue MD/MS in Russia or other countries. Many universities
                    offer direct PG admission to their graduates.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side Form - Hidden on mobile */}
          <div className="hidden md:block sticky top-32">
            <div className="bg-blue-800 text-white p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Apply for 2025 Intake
              </h2>
              <p className="text-center mb-6">
                Limited seats available at top universities
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name-md" className="block mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name-md"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email-md" className="block mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email-md"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone-md" className="block mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone-md"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="university-md" className="block mb-1">
                    Preferred University*
                  </label>
                  <select
                    id="university-md"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 text-black"
                  >
                    <option value="">Select University</option>
                    <option value="NOSMA">
                      North Ossetian State Medical Academy
                    </option>
                    <option value="Kadyrov">
                      Kadyrov Chechen State University
                    </option>
                    <option value="PSMU">
                      Pacific State Medical University
                    </option>
                    <option value="North Caucasian">
                      North Caucasian State University
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Get Admission Details"
                  )}
                </button>
              </form>
              <div className="mt-4 text-sm text-blue-100">
                <p>
                  By submitting this form, you agree to our privacy policy and
                  consent to receive updates via WhatsApp/Email.
                </p>
              </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Quick Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-1 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <div>
                    <p className="font-medium">Admission Helpline</p>
                    <p className="text-gray-600">+91 8050575767</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-1 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-gray-600">
                      mbbsadmissionsinabroad@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-1 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  <div>
                    <p className="font-medium">Office Hours</p>
                    <p className="text-gray-600">Mon-Sat: 10AM to 7PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
