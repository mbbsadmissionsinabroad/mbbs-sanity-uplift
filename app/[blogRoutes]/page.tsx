// "use client";
// import React, { useState, useEffect } from "react";
// import { getBlogDetails } from "../../lib/getBlogDetails";
// import BlogDetailsPage from "./components/BlogDetailsPage";
// import BlogShimmer from "./components/BlogShimmer";
// import Notfound from "../not-found";

// interface PageProps {
//   params?: {
//     blogRoutes?: string;
//   };
// }
// interface BlogDetails {
//   data: any;
//   faq: any;
//   youtubeEmbedRes: any;
//   notFound: boolean;
// }

// const Page: React.FC<PageProps> = (props) => {
//   const [blogDetailsContent, setBlogDetailsContent] =
//     useState<BlogDetails | null>(null);

//   useEffect(() => {
//     fetchBlogDetails();
//   }, []);

//   async function fetchBlogDetails() {
//     try {
//       const blogDetails = await getBlogDetails(props?.params?.blogRoutes ?? "");
//       setBlogDetailsContent(blogDetails);
//     } catch (error) {
//       console.error("Error fetching blog details:", error);
//       setBlogDetailsContent({
//         notFound: true,
//         data: null,
//         faq: null,
//         youtubeEmbedRes: null,
//       });
//     }
//   }

//   if (blogDetailsContent === null) {
//     return <BlogShimmer />;
//   }

//   if (blogDetailsContent.notFound) {
//     return <Notfound />;
//   }

//   return (
//     <>
//       {/* Your JSX for rendering blog details */}
//       <BlogDetailsPage blogDetailsContent={blogDetailsContent} />
//     </>
//   );
// };

// export default Page;

import type { Metadata } from "next";
import React from "react";
import { getBlogDetails } from "../../lib/getBlogDetails";
import BlogDetailsPage from "./components/BlogDetailsPage";
import BlogShimmer from "./components/BlogShimmer";
import Notfound from "../not-found";
import { urlFor } from "@/lib/client";

const siteUrl = "https://www.mbbsadmissionsinabroad.com";

export async function generateMetadata({
  params,
}: {
  params: { blogRoutes?: string };
}): Promise<Metadata> {
  const route = params?.blogRoutes ?? "";

  try {
    const blogDetailsContent = await getBlogDetails(route);
    if (!blogDetailsContent || blogDetailsContent.notFound) {
      return {};
    }

    const data = blogDetailsContent.data || {};
    const seo = data.seo || {};
    const title = seo.title || data.metaTitle || data.title || "MBBS Admissions in Abroad";
    const description =
      seo.description ||
      data.metaDescription ||
      "Explore MBBS abroad guidance, university details, fees, and admission support.";
    const canonical = seo.canonicalUrl || data.canonical || `${siteUrl}/${route}`;
    const robots = seo.robots || "index,follow";
    const imageSource = seo.ogImage || data.bannerImage || data.mainImage;
    const imageUrl = imageSource ? urlFor(imageSource).width(1200).height(630).fit("crop").url() : undefined;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        title,
        description,
        url: canonical,
        type: "article",
        images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: data.title || title }] : [],
      },
      twitter: {
        card: imageUrl ? "summary_large_image" : "summary",
        title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return {};
  }
}

const Page = async ({ params }: { params: { blogRoutes?: string } }) => {
  let blogDetailsContent;
  try {
    blogDetailsContent = await getBlogDetails(params?.blogRoutes ?? "");
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return <Notfound />;
  }
  if (!blogDetailsContent || blogDetailsContent.notFound) {
    return <Notfound />;
  }

  if (blogDetailsContent === null) {
    return <BlogShimmer />;
  }

  return <BlogDetailsPage blogDetailsContent={blogDetailsContent} />;
};

export default Page;
