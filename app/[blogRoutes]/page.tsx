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
import { getBlogSummaries } from "../../lib/getBlogSummaries";
import { localBlogs } from "../../lib/localBlogs";
import BlogDetailsPage from "./components/BlogDetailsPage";
import BlogShimmer from "./components/BlogShimmer";
import Notfound from "../not-found";
import { urlFor } from "@/lib/client";

const siteUrl = "https://www.mbbsadmissionsinabroad.com";

type SidebarData = {
  categories: Array<{ name: string; count: number }>;
  latestPosts: Array<{ title: string; href: string; category?: string }>;
};

function getBlogHref(blog: any) {
  return `/${blog?.publicSlug || blog?.slug?.current || ""}`;
}

function getPublishedAtValue(blog: any) {
  const rawDate = blog?.publishedAt || blog?._updatedAt || "";
  const timestamp = rawDate ? Date.parse(rawDate) : NaN;
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function buildSidebarData(blogs: any[], currentRoute: string): SidebarData {
  const normalizedRoute = currentRoute.replace(/^\/+/, "").toLowerCase();
  const categoriesMap = new Map<string, number>();

  blogs.forEach((blog) => {
    const category = blog?.blogCategory || "MBBS Abroad Guidance";
    categoriesMap.set(category, (categoriesMap.get(category) || 0) + 1);
  });

  const categories = Array.from(categoriesMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) =>
      right.count === left.count
        ? left.name.localeCompare(right.name)
        : right.count - left.count,
    );

  const latestPosts = blogs
    .filter((blog) => {
      const slug = (blog?.publicSlug || blog?.slug?.current || "").toLowerCase();
      return Boolean(slug) && slug !== normalizedRoute;
    })
    .sort((left, right) => getPublishedAtValue(right) - getPublishedAtValue(left))
    .slice(0, 5)
    .map((blog) => ({
      title: blog?.cardTitle || blog?.title || "Blog article",
      href: getBlogHref(blog),
      category: blog?.blogCategory || "MBBS Abroad Guidance",
    }));

  return { categories, latestPosts };
}

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
    const title =
      seo.title || data.metaTitle || data.title || "MBBS Admissions in Abroad";
    const description =
      seo.description ||
      data.metaDescription ||
      "Explore MBBS abroad guidance, university details, fees, and admission support.";
    const canonical = seo.canonicalUrl || data.canonical || `${siteUrl}/${route}`;
    const robots = seo.robots || "index,follow";
    const imageSource = seo.ogImage || data.bannerImage || data.mainImage;
    const imageUrl = data.bannerImageUrl
      ? `${siteUrl}${data.bannerImageUrl}`
      : imageSource
        ? urlFor(imageSource).width(1200).height(630).fit("crop").url()
        : undefined;
    const keywordList = Array.isArray(seo.keywords)
      ? seo.keywords
      : typeof data.metaKeywords === "string"
        ? data.metaKeywords
            .split(",")
            .map((keyword: string) => keyword.trim())
            .filter(Boolean)
        : undefined;

    return {
      title,
      description,
      keywords: keywordList,
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
  const route = params?.blogRoutes ?? "";

  let blogDetailsContent;
  let sidebarData: SidebarData = { categories: [], latestPosts: [] };
  try {
    blogDetailsContent = await getBlogDetails(route);

    const sidebarSourceBlogs = blogDetailsContent?.data?.isLocalBlog
      ? localBlogs
      : await getBlogSummaries();

    sidebarData = buildSidebarData(sidebarSourceBlogs || [], route);
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

  return (
    <BlogDetailsPage
      blogDetailsContent={blogDetailsContent}
      sidebarData={sidebarData}
    />
  );
};

export default Page;
