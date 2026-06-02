"use client";
import React from "react";
import { Tabs, Tab } from "./TabComponent";
import BlogsTab from "./BlogsTab";

const BlogSection = ({ blogContent }: { blogContent: any[] }) => {

  return (
    <div>
      <Tabs>
        <Tab label="All">
          <div className="py-4">
            <BlogsTab blogContent={blogContent} tabDetail="All" />
          </div>
        </Tab>
        <Tab label="MBBS Abroad">
          <div className="py-4">
            <BlogsTab blogContent={blogContent} tabDetail="MBBS Abroad" />
          </div>
        </Tab>
        <Tab label="Philippines">
          <div className="py-4">
            <BlogsTab blogContent={blogContent} tabDetail="Philippines" />
          </div>
        </Tab>
        <Tab label="India">
          <div className="py-4">
            <BlogsTab blogContent={blogContent} tabDetail="India" />
          </div>
        </Tab>
        <Tab label="Medical PG">
          <div className="py-4">
            <BlogsTab blogContent={blogContent} tabDetail="Medical PG" />
          </div>
        </Tab>
        <Tab label="Nursing Jobs">
          <div className="py-4">
            <BlogsTab blogContent={blogContent} tabDetail="Nursing Jobs" />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default BlogSection;
