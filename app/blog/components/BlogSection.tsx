"use client";

import React, { useState, useMemo } from "react";
import { Tabs, Tab } from "./TabComponent";
import BlogsTab from "./BlogsTab";

const BlogSection = ({ blogContent }: { blogContent: any[] }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogContent = useMemo(() => {
    if (!searchQuery.trim()) return blogContent;
    const query = searchQuery.toLowerCase().trim();
    return blogContent.filter((blog: any) => {
      const title = (blog.cardTitle || blog.title || "").toLowerCase();
      const description = (blog.metaDescription || "").toLowerCase();
      const category = (blog.blogCategory || "").toLowerCase();
      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    });
  }, [searchQuery, blogContent]);

  return (
    <div className="w-full">
      {/* Interactive Search Bar */}
      <div className="max-w-xl mx-auto mb-10 px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles by title, description, or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-full border border-slate-300 bg-white text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-base shadow-sm"
          />
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition"
              aria-label="Clear search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-slate-500 text-center">
            Found {filteredBlogContent.length} {filteredBlogContent.length === 1 ? "article" : "articles"} matching your search
          </p>
        )}
      </div>

      <Tabs>
        <Tab label="All">
          <div className="py-4">
            <BlogsTab blogContent={filteredBlogContent} tabDetail="All" />
          </div>
        </Tab>
        <Tab label="MBBS Abroad">
          <div className="py-4">
            <BlogsTab blogContent={filteredBlogContent} tabDetail="MBBS Abroad" />
          </div>
        </Tab>
        <Tab label="Philippines">
          <div className="py-4">
            <BlogsTab blogContent={filteredBlogContent} tabDetail="Philippines" />
          </div>
        </Tab>
        <Tab label="India">
          <div className="py-4">
            <BlogsTab blogContent={filteredBlogContent} tabDetail="India" />
          </div>
        </Tab>
        <Tab label="Medical PG">
          <div className="py-4">
            <BlogsTab blogContent={filteredBlogContent} tabDetail="Medical PG" />
          </div>
        </Tab>
        <Tab label="Nursing Jobs">
          <div className="py-4">
            <BlogsTab blogContent={filteredBlogContent} tabDetail="Nursing Jobs" />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default BlogSection;
