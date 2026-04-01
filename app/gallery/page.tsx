import Image from "next/image";
import { galleryImages } from "@/app/data/siteContent";

export const metadata = {
  title: "Gallery | MBBS Admission in Abroad",
  description: "A visual look at our MBBS abroad guidance and student support.",
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
                <h2 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Student-focused counseling moments, study-abroad guidance,
                  and visual references from the site.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
