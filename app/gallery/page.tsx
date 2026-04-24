import Image from "next/image";
import type { Metadata } from "next";
import { galleryImages } from "@/app/data/siteContent";

export const metadata: Metadata = {
  title: "Gallery | MBBS Admission in Abroad",
  description: "A visual look at our MBBS abroad guidance and student support.",
  alternates: {
    canonical: "https://www.mbbsadmissionsinabroad.com/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
            Gallery
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Visual stories from the MBBS abroad journey
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            This section is now fully coded, fast to load, and no longer depends
            on Sanity for rendering.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Recent counseling moments and student support snapshots
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            This gallery is meant to give students and parents a more grounded
            feel for how New-Lyf presents MBBS abroad guidance, destination
            support, counseling touchpoints, and student-first communication.
            Instead of acting like a decorative image wall, it supports the
            broader site experience by showing real visual context around the
            kind of study-abroad assistance families are actually exploring.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            You will see a mix of consultation imagery, admission-themed
            creatives, and student journey references used across the website.
            Together they help explain the brand style, the counseling
            environment, and the type of overseas medical education pathways
            the site focuses on, from MBBS admissions to nursing and Germany
            planning routes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item) => (
            <article
              key={item.src}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Student-focused counseling moments, study-abroad guidance,
                  and visual references from the site.
                </p>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
            Why this gallery matters
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            For international education websites, strong visuals do more than
            make the layout feel complete. They help students understand the
            tone of the counseling brand, the seriousness of the service, and
            the kind of destinations, campuses, and support moments they can
            expect to encounter as they move deeper into the enquiry process.
          </p>
        </section>
      </div>
    </main>
  );
}
