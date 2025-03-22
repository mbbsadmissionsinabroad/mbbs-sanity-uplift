"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        router.push(`/thank-you?title=Mbbs In Russia`);
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
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        as="style"
      />

      <h1 className="text-4xl pt-16 pb-8 font-extrabold bg-blue-900 text-center text-white">
        MBBS in Russia
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
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Side Content */}
          <div>
            <h2 className="text-3xl font-bold text-blue-700">
              Pursue Your MBBS in Russia – Affordable, Globally Recognized, and
              MCI/WHO Approved!
            </h2>
            <p className="text-lg mt-4 text-gray-700">
              Dreaming of becoming a doctor? Study MBBS in Russia at top medical
              universities under ₹20 Lakhs!
            </p>
            <ul className="mt-6 space-y-3 text-gray-700 list-none pl-0">
              <li className="inline-flex">
                ✅ Affordable Fees – Complete your MBBS under ₹20 Lakhs.
              </li>
              <li className="inline-flex">
                ✅ Globally Recognized Degrees – Approved by NMC, WHO, and MCI.
              </li>
              <li className="inline-flex">
                ✅ Hands-On Clinical Training – Gain practical experience in top
                hospitals.
              </li>
              <li className="inline-flex">
                ✅ Cultural Comfort – Halal food, Indian mess, and a welcoming
                environment.
              </li>
            </ul>
            <h2 className="text-2xl font-semibold mt-6">
              Featured Universities:
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  North Ossetian State Medical Academy (NOSMA)
                </h3>
                <p>
                  Affordable fees starting under ₹15 Lakhs. Recognized by NMC,
                  WHO, and MCI.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  Kadyrov Chechen State University
                </h3>
                <p>
                  World-class medical education under ₹20 Lakhs. Approved by NMC
                  and WHO.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  Pacific State Medical University
                </h3>
                <p>
                  Medical education and research center in Russia, led by
                  Professor Valentin B. Shumatov, with an active international
                  student program.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  North Caucasian State University
                </h3>
                <p>
                  Globally recognized degree at an affordable cost. NMC and WHO
                  approved.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Apply Now
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Preferred University</option>
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
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-900"
                disabled={isLoading}
              >
                {isLoading ? "Sending Message" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
