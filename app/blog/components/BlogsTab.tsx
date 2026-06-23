"use client";
import Cards from "./Cards";
import React, { useState, useEffect } from "react";

const BlogsTab = ({ blogContent, tabDetail }: any) => {
  const [blogDetailsForCurrentTab, setBlogDetailsForCurrentTab] =
    useState(blogContent);

  useEffect(() => {
    if (tabDetail !== "All") {
      const result = blogContent.filter((val: any) => {
        return val.blogCategory === tabDetail;
      });
      setBlogDetailsForCurrentTab(result);
    } else {
      setBlogDetailsForCurrentTab(blogContent);
    }
  }, [tabDetail, blogContent]);

  return (
    <div className="flex-1 w-full grid-cols-3">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          {blogDetailsForCurrentTab && blogDetailsForCurrentTab.length > 0 ? (
            <div className="flex flex-wrap -m-4">
              {blogDetailsForCurrentTab.map((blog: any, index: number) => (
                <Cards blog={blog} key={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 px-4 max-w-xl mx-auto">
              <svg
                className="mx-auto h-12 w-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No matching articles
              </h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                We couldn't find any articles matching your search query in this category. Try typing a different keyword!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsTab;
