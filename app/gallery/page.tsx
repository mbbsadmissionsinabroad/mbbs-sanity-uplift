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
  description:
    "Explore New-Lyf gallery images featuring MBBS abroad counselling, student support moments, and visual snapshots from our study abroad guidance work.",
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
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            A gallery like this also helps parents and students understand what
            kind of guidance environment they are dealing with. Instead of
            reading only claims, they can see the visual style, the student
            focus, and the kind of support context presented across the site.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Visual pages also support trust in a simple way. They help users
            connect the service promise with real-looking support scenes,
            student-facing material, and brand consistency. For many families,
            that extra context makes the next step feel more understandable
            than reading text alone.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            A gallery can also help families prepare better questions. Instead
            of asking only general questions, they can move toward more useful
            topics like counselling quality, document support, destination fit,
            and the kind of student follow-up that happens after the first
            call. That makes the page more practical than a simple image wall.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            In that sense, this gallery supports the rest of the website. It
            adds visual proof, more context, and a clearer sense of tone. That
            helps users connect the service pages, enquiry pages, and student
            stories into one more understandable journey.
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

        <section className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            How this page supports the rest of the site
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            This gallery also works as a support page for the wider website.
            Many students move between country guides, enquiry forms, nursing
            pages, Germany pages, and student stories before they decide
            whether to call or submit a consultation request. A visual page
            adds context to that journey without forcing the user into another
            long sales page.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            Parents often use visual pages in a practical way. They want to see
            if the brand feels consistent, if the student-facing tone looks
            serious, and if the overall presentation supports the claims made
            elsewhere on the site. That is why this page carries more value
            than a plain image archive.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            When the gallery is read together with the country and contact
            pages, it gives a more complete picture of tone, support, and
            guidance style. That helps users connect the enquiry path, the
            student stories, and the planning pages into one understandable
            journey.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            Another reason this page matters is simple. Many users do not move
            from homepage to form in one straight line. They compare countries,
            open support pages, look for student proof, and then return later to
            the contact page. A stronger gallery helps that middle stage because
            it gives visual reassurance without forcing users into more complex
            claims or long sales language.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            In practical terms, this page supports MBBS abroad decision-making by
            showing the counselling environment, the style of communication, and
            the kind of student-facing presentation used across the site. That
            context matters for trust. Families often look for small signals of
            seriousness before they decide whether an enquiry call is worth
            taking.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
            So this page is not only about images. It is about helping the rest
            of the website feel more complete. When visual proof, service pages,
            country guides, and enquiry forms all feel connected, the website
            becomes easier to understand and easier to trust.
          </p>
        </section>
      </div>
    </main>
  );
}
