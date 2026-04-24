import Image from "next/image";
import type { Metadata } from "next";
import { galleryImages } from "@/app/data/siteContent";
import homeBannerOne from "../../public/assests/home-page-banner-1.png";
import homeBannerTwo from "../../public/assests/home-page-banner-2.webp";
import studentsImage from "../../public/students.jpeg";
import studentTwoImage from "../../public/student2.jpeg";
import whoAreWeImage from "../../public/assests/who-are-we.jpeg";
import whoAreWeTwoImage from "../../public/assests/who-are-we-2.jpeg";

const galleryAssetMap = {
  "/assests/home-page-banner-1.png": homeBannerOne,
  "/assests/home-page-banner-2.webp": homeBannerTwo,
  "/students.jpeg": studentsImage,
  "/student2.jpeg": studentTwoImage,
  "/assests/who-are-we.jpeg": whoAreWeImage,
  "/assests/who-are-we-2.jpeg": whoAreWeTwoImage,
} as const;

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
            This page shows real image assets from the site. It loads fast. It
            gives families a quick feel for the brand, the team, and the kind
            of support students often ask for.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Recent counseling moments and student support snapshots
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            This gallery helps students and parents see the tone of our work.
            You can view counselling scenes, student support moments, and
            simple brand visuals used across the website. It is not just a wall
            of images. It gives real context to the service.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            You will see a mix of call visuals, admission designs, and student
            journey images. Together they show what kind of MBBS abroad,
            nursing, and Germany planning help this site is built to offer.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item) => (
            <article
              key={item.src}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-64 w-full">
                {(() => {
                  const imageAsset =
                    galleryAssetMap[item.src as keyof typeof galleryAssetMap];

                  return (
                <Image
                  src={imageAsset}
                  alt={item.alt}
                  width={imageAsset.width}
                  height={imageAsset.height}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                  );
                })()}
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
            Good visuals do more than fill space. They help users judge tone,
            trust, and fit. They also make the enquiry path feel more real and
            less abstract.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "These images show real support scenes.",
              "They help families see the brand quickly.",
              "They make the enquiry path feel clear.",
              "They add trust before a call or form fill.",
            ].map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
