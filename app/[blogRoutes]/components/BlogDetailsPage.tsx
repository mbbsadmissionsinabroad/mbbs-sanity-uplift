"use client";
import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/client";
import Assist from "@/app/components/Assist";
import TextSerializer from "./TextSerializers";
import dynamic from "next/dynamic";
import Link from "next/link";
import BlogSidebar from "./BlogSidebar";

// const TOC = dynamic(() => import("./TOC"), { ssr: false });
const Modal = dynamic(() => import("./Modal"), { ssr: false });
// const TextSerializer = dynamic(() => import("./TextSerializers"), {
//   ssr: false,
// });
// 
// import Modal from "./Modal";

const siteUrl = "https://www.mbbsadmissionsinabroad.com";

const BlogDetailsPage = (props: any) => {
  const data = props?.blogDetailsContent?.data;
  const faq = props?.blogDetailsContent?.faq || [];
  const sidebarData = props?.sidebarData || { categories: [], latestPosts: [] };
  const bannerSrc = data?.bannerImageUrl
    ? data.bannerImageUrl
    : data?.bannerImage
      ? urlFor(data.bannerImage).format("webp").url()
      : null;
  const canonicalPath =
    data?.canonical ||
    data?.seo?.canonicalUrl ||
    `${siteUrl}/${data?.publicSlug || data?.slug?.current || ""}`;
  const imageUrl = data?.bannerImageUrl
    ? `${siteUrl}${data.bannerImageUrl}`
    : data?.bannerImage
      ? urlFor(data.bannerImage).width(1200).height(630).fit("crop").url()
      : undefined;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data?.title,
        item: canonicalPath,
      },
    ],
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data?.title,
    description: data?.metaDescription || data?.seo?.description,
    mainEntityOfPage: canonicalPath,
    datePublished: data?.publishedAt,
    dateModified: data?._updatedAt || data?.publishedAt,
    image: imageUrl ? [imageUrl] : undefined,
    author: {
      "@type": "Organization",
      name: "Newlyf Overseas",
    },
    publisher: {
      "@type": "Organization",
      name: "MBBS Admissions in Abroad",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/new-lyf-logo.webp`,
      },
    },
  };
  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item: any) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
            },
          })),
        }
      : null;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <section className="text-white body-font bg-blue-800 bg-gradient-to-r">
        <div className="container py-12 mx-auto">
          <h1 className="text-4xl font-large font-extrabold title-font text-center text-white">
            {data?.title}
          </h1>
        </div>
      </section>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <article className="min-w-0 text-justify">
            {bannerSrc ? (
              <Image
                src={bannerSrc}
                className="h-auto max-w-full rounded-[28px] object-cover"
                width={1350}
                height={700}
                alt={data?.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1350px"
                priority
                loading="eager"
              />
            ) : null}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span className="font-medium text-slate-900">Category:</span>{" "}
              {data?.blogCategory || "MBBS Abroad Guidance"}
            </div>

            <TextSerializer
              data={data?.pageContent}
              className="serializerTitle mt-6"
            />
            {Array.isArray(data?.relatedLinks) && data.relatedLinks.length > 0 ? (
              <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Related Guidance
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {data.relatedLinks.map((link: any) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-blue-700 underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          <BlogSidebar
            categories={sidebarData.categories}
            latestPosts={sidebarData.latestPosts}
            currentCategory={data?.blogCategory}
          />
        </div>
      </div>

      {faq.length > 0 && (
        <Assist
          summary=""
          data={faq}
          title={data?.title}
        />
      )}
      <Modal />
    </div>
  );
};

export default BlogDetailsPage;
