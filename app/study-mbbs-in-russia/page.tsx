"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import Image from "next/image";
import img1 from "@/public/russia-college-1.webp";
import img2 from "@/public/russia-college-2.jpeg";
import img3 from "@/public/russia-college-3.webp";
import img4 from "@/public/russia-college-4.webp";
import hrn from "@/public/brochures/hrn.jpeg";
import tandi from "@/public/brochures/tandi.jpeg";
import patil from "@/public/brochures/patil.jpeg";
import moha from "@/public/brochures/moha.jpeg";
import trupti from "@/public/brochures/trupti.jpeg";
import panigrani from '@/public/brochures/panigrani.jpeg';
import vishnu from '@/public/brochures/vishnu.jpeg';
import nisha from '@/public/brochures/nisha.jpeg';
import alex from "@/public/brochures/alex.jpeg"
import vrada from '@/public/brochures/vrada.jpeg';


interface FormData {
  name: string;
  email: string;
  phone: string;
  university: string;
}

interface University {
  id: number;
  name: string;
  location: string;
  established: number;
  description: string;
  image: any;
  badges: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  university: string;
  review: string;
  rating: number;
  image: any;
}

export default function MBBSInRussia() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    university: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  const testimonialIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Scroll to form with offset for navbar
  const scrollToForm = () => {
    if (formRef.current) {
      const yOffset = -100;
      const y =
        formRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Testimonial carousel auto-rotate
  useEffect(() => {
    startCarousel();
    
    // Show popup after 10 seconds
    const popupTimer = setTimeout(() => {
      setShowPopup(true);
    }, 10000);

    return () => {
      stopCarousel();
      clearTimeout(popupTimer);
    };
  }, []);

  const startCarousel = () => {
    stopCarousel();
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonialIndex(prev => 
        prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1
      );
    }, 10000);
  };

  const stopCarousel = () => {
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
    }
  };

  const handleTestimonialHover = () => {
    stopCarousel();
  };

  const handleTestimonialLeave = () => {
    startCarousel();
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const closeBrochureForm = () => {
    setShowBrochureForm(false);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(prev => 
      prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(prev => 
      prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, isBrochureDownload = false) => {
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
          text: isBrochureDownload 
            ? "Brochure Download: MBBS in Russia Landing Page" 
            : "Lead Source: MBBS in Russia Landing Page",
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
  
      if (response.ok) {
        setIsLoading(false);
        
        if (isBrochureDownload) {
          // Determine which brochure to download based on selected university
          let brochureFile = '';
          switch(formData.university) {
            case 'NOSMA':
              brochureFile = 'nosma-brochure.pdf';
              break;
            case 'Kadyrov':
              brochureFile = 'kadyrov-brochure.pdf';
              break;
            case 'PSMU':
              brochureFile = 'psmu-brochure.pdf';
              break;
            case 'North Caucasian':
              brochureFile = 'north-caucasian-brochure.pdf';
              break;
            default:
              brochureFile = 'general-brochure.pdf';
          }
          
          // Create a temporary link to trigger download
          const link = document.createElement('a');
          link.href = `/brochures/${brochureFile}`;
          link.download = brochureFile;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Close the brochure form
          setShowBrochureForm(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            university: "",
          });
          setShowBrochureForm(false);
          closePopup();
        } else {
          // Regular form submission
          setFormData({
            name: "",
            email: "",
            phone: "",
            university: "",
          });
          router.push("/thank-you");
        }
      } else {
        setIsLoading(false);
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const handleBrochureDownload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.university) {
      toast.error("Please select a university to download the brochure");
      return;
    }
    
    handleSubmit(e, true);
  };

  const universities: University[] = [
    {
      id: 1,
      name: "North Ossetian State Medical Academy (NOSMA)",
      location: "Vladikavkaz, Russia",
      established: 1939,
      description:
        "Affordable fees starting under ₹3.10 Lakhs/year. Recognized by NMC, WHO with excellent clinical exposure.",
      image: img1,
      badges: ["NMC Approved", "WHO Listed", "Lowest Fees"],
    },
    {
      id: 2,
      name: "Kadyrov Chechen State University",
      location: "Grozny, Russia",
      established: 1938,
      description:
        "World-class medical education under ₹3.0 Lakhs/year. Modern campus with excellent curriculum.",
      image: img2,
      badges: ["NMC Approved", "WHO Listed", "Modern Campus"],
    },
    {
      id: 3,
      name: "Pacific State Medical University",
      location: "Vladivostok, Russia",
      established: 1958,
      description:
        "Led by Prof. Valentin B. Shumatov with strong international collaborations and research focus.",
      image: img3,
      badges: ["NMC Approved", "WHO Listed", "Research Focus"],
    },
    {
      id: 4,
      name: "North Caucasian State University",
      location: "Stavropol, Russia",
      established: 1930,
      description:
        "Popular among Indian students for its multicultural environment and food options.",
      image: img4,
      badges: ["NMC Approved", "WHO Listed", "Indian Community"],
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "What are the NEET eligibility requirements?",
      answer:
        "You need to qualify NEET exam and have at least 50% marks in PCB in 12th standard (40% for SC/ST/OBC). NEET qualification is mandatory for Indian students to practice medicine in India after completing MBBS abroad.",
    },
    {
      question: "What is the visa and admission process?",
      answer:
        "The process includes: 1) University application with documents, 2) Receiving invitation letter, 3) Visa application, 4) Travel arrangements. We assist with the entire process from application to arrival in Russia.",
    },
    {
      question: "How is the climate in Russia for Indian students?",
      answer:
        "While winters can be cold (-10°C to -30°C), universities provide well-heated hostels and classrooms. Students adapt quickly with proper winter clothing.",
    },
    {
      question: "What is the FMGE passing rate from Russian universities?",
      answer:
        "Our partnered universities have 45-60% FMGE passing rate, higher than many other countries. We provide special FMGE coaching for returning students.",
    },
    {
      question: "Is learning Russian mandatory?",
      answer:
        "While the course is in English, basic Russian language classes are included to help with patient interaction during clinical practice.",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "TRUPTI BABASAHEB WAGHMARE",
      university: "Kadyrov Chechen State University",
      review: "Studying MBBS at Kadyrov Chechen State University has been a life-changing experience. The faculty is supportive, and the curriculum is well-structured. I highly recommend it to aspiring doctors!",
      rating: 5,
      image: trupti,
    },
    {
      name: "Vishnu Teja",
      university: "Kadyrov Chechen State University",
      review: "The transition to studying in Russia was smooth, thanks to the excellent student support system. The practical exposure here is unmatched, and I feel confident about my medical career.",
      rating: 5,
      image: vishnu,
    },
    {
      name: "MOHAMMAD HAMZAH ALI AHMAD",
      university: "Kadyrov Chechen State University",
      review: "Choosing MBBS in Russia was the best decision I made. The affordable fees and high-quality education at KC State University have exceeded my expectations!",
      rating: 5,
      image: moha,
    },
    // {
    //   name: "SHREYASH DINESH MALI",
    //   university: "Kadyrov Chechen State University",
    //   review: "I was initially hesitant about studying abroad, but the welcoming environment and hands-on clinical training here at KC State University have made my journey exceptional!",
    //   rating: 5,
    //   image: "/students/testimonial4.jpg",
    // },
    {
      name: "VARDA NAAZ",
      university: "Kadyrov Chechen State University",
      review: "The university provides a perfect blend of academics and practical learning. The professors are approachable, and the Indian student community makes it feel like home!",
      rating: 5,
      image:  vrada,
    },
    {
      name: "PATIL VEDANT MAHENDRA",
      university: "Kadyrov Chechen State University",
      review: "I'm grateful for the seamless admission process and excellent facilities at KC. The university is truly committed to producing world-class doctors!",
      rating: 5,
      image: patil,
    },
    {
      name: "TANDI SNEHA",
      university: "NOSMA University",
      review: "From the well-equipped labs to experienced faculty, NOSMA has provided me with the best possible foundation for my medical career!",
      rating: 5,
      image: tandi,
    },
    {
      name: "NISHA",
      university: "NOSMA University",
      review: "NOSMA has exceeded my expectations in terms of education and campus life. The global exposure and diverse student community make learning here truly enriching!",
      rating: 5,
      image: nisha,
    },
    {
      name: "ALEXANDER AARON",
      university: "NOSMA University",
      review: "The university offers great clinical exposure and hands-on training, which is crucial for a medical student. I feel well-prepared for my future career.",
      rating: 5,
      image: alex,
    },
    {
      name: "PANIGRANI SHUBHALAXMI",
      university: "NOSMA University",
      review: "NOSMA University has helped me grow both academically and personally. The curriculum is well-structured, and the professors are always there to guide us!",
      rating: 5,
      image: panigrani,
    },
    {
      name: "HARSH RAJ",
      university: "NOSMA University",
      review: "NOSMA provides a perfect blend of affordability and quality education. The opportunities for practical training and research are outstanding!",
      rating: 5,
      image: hrn,
    },
    // {
    //   name: "DSOUZA NEIL ISSAC",
    //   university: "NOSMA University",
    //   review: "I highly recommend NOSMA to aspiring doctors. The medical training here is comprehensive, and the international student support is excellent!",
    //   rating: 5,
    //   image: "/students/testimonial12.jpg",
    // }
  ];

  return (
    <>
      <Head>
        <title>
          MBBS in Russia 2025 | Direct Admission | NMC Approved Colleges
        </title>
        <meta
          name="description"
          content="Get direct admission in top NMC approved Russian medical universities for 2025 intake. 1000+ Indian students placed. Low fees, English medium, no donation."
        />
        <meta
          name="keywords"
          content="MBBS in Russia 2025, NMC approved medical colleges, low cost MBBS abroad, Russian medical universities, MBBS for Indian students"
        />
        <meta
          property="og:title"
          content="MBBS in Russia 2025 - Direct Admission in Top Medical Colleges"
        />
        <meta
          property="og:description"
          content="Study MBBS in Russia at 1/4th cost of Indian private colleges. English medium, NMC approved universities with 100% visa success."
        />
        <meta
          property="og:image"
          content="https://yourwebsite.com/mbbs-russia-preview.jpg"
        />
        <meta
          property="og:url"
          content="https://yourwebsite.com/mbbs-in-russia"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourwebsite.com/mbbs-in-russia" />
      </Head>

      {/* Popup Modal with Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                Apply for MBBS in Russia 2025
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="popup-name"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="popup-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="popup-email"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="popup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="popup-phone"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="popup-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="popup-university"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Preferred University*
                  </label>
                  <select
                    id="popup-university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
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
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
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
                    "Submit Application"
                  )}
                </button>
                <p className="text-sm text-gray-500">
                  By submitting this form, you agree to our privacy policy and
                  consent to receive updates via WhatsApp/Email.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Brochure Download Form */}
      {showBrochureForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeBrochureForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                Download MBBS in Russia Brochure
              </h3>
              <form onSubmit={handleBrochureDownload} className="space-y-5">
                <div>
                  <label
                    htmlFor="brochure-name"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="brochure-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="brochure-email"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="brochure-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="brochure-phone"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="brochure-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="brochure-university"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Preferred University*
                  </label>
                  <select
                    id="brochure-university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
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
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
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
                    "Download Brochure Now"
                  )}
                </button>
                <p className="text-sm text-gray-500">
                  By submitting this form, you agree to our privacy policy and
                  consent to receive updates via WhatsApp/Email.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Apply Now Button */}
      <button
        onClick={scrollToForm}
        className="fixed bottom-6 right-6 z-40 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label="Apply Now"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="ml-2 hidden sm:inline">Apply Now</span>
      </button>

      {/* Notification Bar */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center pt-8 py-2 px-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">
          Scholarship up to ₹5 Lakh available for first few applicants! Limited
          seats remaining for September 2025 intake!
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Study MBBS in Russia - {" "}<br/>
                <span className="text-orange-400">₹1.30 Lakhs/Semester</span>
                <br/>
                Book Your Seat Now
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Top NMC, WHO Approved Russian Medical Universities for Indian
                Students at ₹2.60 Lakhs/year
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-lg">
                  <span className="bg-green-500 rounded-full p-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Tuition from ₹2.60 Lakhs/year
                </li>
                <li className="flex items-center text-lg">
                  <span className="bg-green-500 rounded-full p-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  100% English medium instruction
                </li>
                <li className="flex items-center text-lg">
                  <span className="bg-green-500 rounded-full p-1 mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  No donation or capitation fees
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToForm}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => setShowBrochureForm(true)}
                  className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Brochure
                </button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src={img1}
                alt="Indian students at Russian medical university"
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-medium">
                    North Ossetian State Medical Academy
                  </p>
                  <h3 className="text-xl font-bold">
                    200+ Indian Students Currently Studying
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} id="apply-form" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-800 text-white p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4">
                  Apply for 2025 Intake
                </h2>
                <p className="text-xl mb-6">
                  Fill this form to get complete admission details
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>No application fees</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>100% visa guidance</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-400 mr-2 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Direct university admission</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Need immediate help?
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>+91 8050575767</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>mbbsadmissionsinabroad@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      placeholder="Enter your WhatsApp number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="university"
                      className="block text-gray-700 font-medium mb-1"
                    >
                      Preferred University*
                    </label>
                    <select
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
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
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg"
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
                  <p className="text-sm text-gray-500">
                    By submitting this form, you agree to our privacy policy and
                    consent to receive updates via WhatsApp/Email.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-blue-700 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-blue-700 mb-2">2000+</div>
              <div className="text-gray-600 font-medium">Students Placed</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-blue-700 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Visa Success</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-4xl font-bold text-blue-700 mb-2">10+</div>
              <div className="text-gray-600 font-medium">
                Partner Universities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Russia */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Indian Students Choose{" "}
              <span className="text-blue-700">MBBS in Russia</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Affordable Fees</h3>
              <p className="text-gray-600">
                Complete your MBBS for ₹15-25 Lakhs compared to ₹50L-1Cr in
                Indian private colleges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">NMC & WHO Approved</h3>
              <p className="text-gray-600">
                Degrees recognized in India and globally. Eligible to practice
                after clearing FMGE.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">No Entrance Exams</h3>
              <p className="text-gray-600">
                Direct admission based on 12th marks. Only NEET qualification
                required for Indians.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Global Exposure</h3>
              <p className="text-gray-600">
                Study with students from 50+ countries. Opportunity for
                international practice.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Indian Hostels</h3>
              <p className="text-gray-600">
                Separate hostels for Indian students with food options
                available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Easy Admission</h3>
              <p className="text-gray-600">
                Simple documentation process. No donation or capitation fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Universities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured{" "}
              <span className="text-blue-700">Medical Universities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Top NMC approved universities for Indian students with excellent
              FMGE passing rates
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {universities.map((univ) => (
              <div
                key={univ.id}
                className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <Image
                      src={univ.image}
                      alt={univ.name}
                      className="w-full h-full object-cover"
                      placeholder="blur"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">{univ.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {univ.location} | Established {univ.established}
                    </p>
                    <p className="text-gray-700 mb-4">{univ.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {univ.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    <button className="text-blue-600 font-medium hover:text-blue-800 transition">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MBBS in <span className="text-blue-700">Russia vs India</span> - A Quick Comparison
            </h2>
            <p className="text-xl text-gray-600">
              MBBS in Russia vs. India – Save ₹70 Lakh on Your Medical Degree
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      Parameter
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      Russia
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      India (Private)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      Total Course Cost
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-green-600 font-semibold">
                      ₹15-25 Lakhs
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      ₹50 Lakhs - 1 Crore
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      Admission Criteria
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      50% in PCB + NEET
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      NEET 550+ Marks
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      Medium of Instruction
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      English
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      English/Regional
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      Clinical Exposure
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      From 2nd Year
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      From 3rd Year
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      International Recognition
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      WHO, NMC, UNESCO
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      NMC Only
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process - Enhanced */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple <span className="text-blue-700">Admission Process</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Eligibility Check",
                description:
                  "50% in PCB (40% for SC/ST/OBC) and NEET qualification",
                duration: "1 Day",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
              {
                step: 2,
                title: "Document Submission",
                description:
                  "10th/12th marksheets, NEET scorecard, passport copy",
                duration: "3 Days",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                step: 3,
                title: "University Application",
                description: "We process your application to top universities",
                duration: "3-5 Days",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                ),
              },
              {
                step: 4,
                title: "Invitation Letter",
                description: "Received from university within 2-4 weeks",
                duration: "2-4 Weeks",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
              },
              {
                step: 5,
                title: "Visa Processing",
                description: "100% success rate with our documentation support",
                duration: "2 Weeks",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
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
                ),
              },
              {
                step: 6,
                title: "Travel to Russia",
                description: "We assist with flight booking and airport pickup",
                duration: "September 2025",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7l4-4m0 0l4 4m-4-4v18m0 0H4m16 0h-4"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold text-blue-700">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">
                    {item.description}
                  </p>
                  <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium w-fit">
                    {item.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-white" id="faq">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-700">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about MBBS in Russia
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 bg-gray-50 hover:bg-gray-100 font-medium flex justify-between items-center transition-colors duration-300"
                >
                  <span>{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                      activeFaq === index ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    activeFaq === index ? "max-h-96 p-5 border-t" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced Carousel */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              📢 Student <span className="text-blue-700">Testimonials</span> – Hear from Our MBBS Scholars!
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div
            className="relative overflow-hidden"
            onMouseEnter={handleTestimonialHover}
            onMouseLeave={handleTestimonialLeave}
          >
            {/* Left Arrow */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition ml-2"
              aria-label="Previous testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition mr-2"
              aria-label="Next testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentTestimonialIndex * 100}%)`,
              }}
            >
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, groupIndex) => (
  <div
    key={groupIndex}
    className="w-full flex-shrink-0 grid md:grid-cols-3 gap-8 px-4"
  >
    {testimonials
      .slice(groupIndex * 3, groupIndex * 3 + 3)
      .map((testimonial: Testimonial, index: number) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-600">
                {testimonial.university}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            &ldquo;{testimonial.review}&rdquo;
          </p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < testimonial.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      ))}
  </div>
))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
  <button
    key={index}
    onClick={() => setCurrentTestimonialIndex(index)}
    className={`w-3 h-3 rounded-full transition-all duration-300 ${
      currentTestimonialIndex === index
        ? "bg-blue-600 w-6"
        : "bg-gray-300"
    }`}
    aria-label={`Go to testimonial group ${index + 1}`}
  />
))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your{" "}
            <span className="text-orange-400">Medical Journey</span>?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Limited seats available for 2025 intake. Book your free counseling
            session today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg text-lg"
            >
              Apply Now
            </button>
            <button
              onClick={() => setShowBrochureForm(true)}
              className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg text-lg flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      <ToastContainer position="bottom-right" />
    </>
  );
}