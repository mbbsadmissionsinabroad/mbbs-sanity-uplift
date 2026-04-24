import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MBBS Admissions in Abroad",
  description:
    "Read the Privacy Policy for VST NEW-LYF PRARAMBHA PVT. LTD and the use of mbbsadmissionsinabroad.com.",
  alternates: {
    canonical: "https://www.mbbsadmissionsinabroad.com/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "Introduction",
    body: [
      "VST NEW-LYF PRARAMBHA PVT. LTD respects your privacy and is committed to protecting the personal information you share with us through mbbsadmissionsinabroad.com, our enquiry forms, and related communication channels.",
      "This Privacy Policy explains what information we collect, how we use it, when we may share it, and the choices you have in relation to your personal data.",
    ],
  },
  {
    title: "Information We Collect",
    body: [
      "We may collect personal information that you provide directly to us, including your name, email address, phone number, city, country, course preferences, and any information you include when submitting an enquiry or contacting our team.",
      "We may also collect technical data such as IP address, browser type, device information, referring pages, and basic usage analytics to help us improve the website and understand visitor behavior.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information we collect to respond to enquiries, guide students about study-abroad options, provide counselling support, improve our services, maintain website security, and communicate relevant updates about our services.",
      "We may also use your information to contact you by email, phone, WhatsApp, or other communication channels you have shared with us in relation to admissions guidance and support.",
    ],
  },
  {
    title: "Cookies and Analytics",
    body: [
      "Our website may use cookies, pixels, and similar technologies to remember preferences, measure traffic, improve functionality, and understand how users engage with the site.",
      "Third-party analytics or marketing tools may also collect limited information based on your interaction with the website, subject to their own privacy policies.",
    ],
  },
  {
    title: "Sharing of Information",
    body: [
      "We do not sell your personal information. We may share information with trusted service providers, CRM tools, analytics providers, communication tools, or technology partners only when required to operate our website, respond to your enquiry, or deliver our services.",
      "We may also disclose information when required by law, regulation, legal process, or to protect our rights, users, staff, or operations.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We retain personal information for as long as reasonably necessary to provide our services, respond to enquiries, maintain internal records, comply with legal obligations, and resolve disputes.",
      "When data is no longer required, we may delete, anonymize, or securely archive it in line with operational and legal requirements.",
    ],
  },
  {
    title: "Data Security",
    body: [
      "We take reasonable administrative, technical, and organizational measures to protect personal information from unauthorized access, misuse, alteration, disclosure, or destruction.",
      "However, no website, platform, or data transmission method can be guaranteed to be completely secure, and you provide information at your own risk.",
    ],
  },
  {
    title: "Third-Party Links",
    body: [
      "Our website may contain links to third-party websites, universities, platforms, or services. We are not responsible for the privacy practices, content, or policies of those third-party websites.",
      "We encourage you to review the privacy policies of any external websites you visit through links provided on our site.",
    ],
  },
  {
    title: "Children's Privacy",
    body: [
      "Our services are intended for students, parents, and applicants seeking education guidance. We do not knowingly collect personal information from children in violation of applicable law.",
      "If you believe that personal information of a minor has been provided improperly, please contact us so we can review and take appropriate action.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "Depending on applicable law, you may have the right to request access to the personal information we hold about you, request correction of inaccurate information, request deletion of certain information, or object to certain uses of your data.",
      "To exercise any such rights, you can contact us using the details listed below.",
    ],
  },
  {
    title: "Updates to This Policy",
    body: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal obligations, or services. When we do, we will update the effective date on this page.",
      "Your continued use of the website after changes are posted will indicate your acceptance of the updated Privacy Policy.",
    ],
  },
  {
    title: "Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how your data is handled, you can contact us using the details below.",
      "Email: ceo@new-lyf.com",
      "Website: https://www.mbbsadmissionsinabroad.com/contact",
      "Company: VST NEW-LYF PRARAMBHA PVT. LTD",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
            Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            VST NEW-LYF PRARAMBHA PVT. LTD
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Updated at: April 6, 2026
          </p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
            This policy explains how we collect, use, and protect personal
            information shared through{" "}
            <Link
              href="https://www.mbbsadmissionsinabroad.com/"
              className="font-semibold text-blue-700 underline underline-offset-4"
            >
              https://www.mbbsadmissionsinabroad.com/
            </Link>
            .
          </p>
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              In simple terms
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
              We collect the details you send us, such as your name, phone
              number, email, city, and study interest. We use them to reply,
              guide you, and improve the site.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              We do not sell your data. We may share it with tools or partners
              only when needed to run the site, answer your enquiry, or give
              support.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
              If you want to ask about your data, correct it, or request
              deletion where the law allows, you can contact us.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "You send details. We use them to reply.",
                "We keep only the data we need.",
                "We do not sell your data.",
                "You can ask us questions about your data.",
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-white bg-white px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <h3 className="text-2xl font-semibold text-slate-900">
            Policy Sections
          </h3>
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-900">
                {section.title}
              </h3>
              {section.body.map((paragraph, index) => (
                <p
                  key={`${section.title}-${index}`}
                  className="text-sm leading-7 text-slate-700 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
