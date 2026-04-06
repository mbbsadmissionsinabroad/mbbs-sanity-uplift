import Link from "next/link";
import { footerLinkColumns } from "@/app/data/siteContent";

const footerActionLinks = [
  { title: "BLOG", href: "/blog" },
  { title: "AUSBILDUNG", href: "/ausbildung" },
  { title: "GALLERY", href: "/gallery" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-100 text-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Quick Links
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything important in one place
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Browse our core MBBS abroad pages, student resources, and contact
            options without searching through the whole site.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {footerLinkColumns.map((column, index) => (
            <div key={index} className="space-y-3">
              {column.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className="block rounded-xl px-1 py-1 text-sm font-medium text-slate-600 transition hover:text-blue-800"
                >
                  * {link.title}
                </Link>
              ))}
            </div>
          ))}

          <div className="space-y-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              More
            </p>
            {footerActionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="block rounded-2xl bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left sm:px-6 lg:px-8">
          <p className="text-sm text-slate-700">
            © 2024 New-Lyf
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/privacy-policy"
              prefetch={false}
              className="text-sm font-medium text-slate-700 transition hover:text-blue-800"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              prefetch={false}
              className="text-sm font-medium text-slate-700 transition hover:text-blue-800"
            >
              Terms & Conditions
            </Link>
            <a
              href="https://www.instagram.com/mbbsadmissionsinabroad/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-slate-700 transition hover:text-blue-800"
            >
              @mbbsadmissionsinabroad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
