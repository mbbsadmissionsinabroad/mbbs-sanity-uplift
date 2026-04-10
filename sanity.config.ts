"use client";

import { defineConfig, definePlugin } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./studio/schemaTypes";
import { SeoDashboardTool } from "./studio/components/SeoDashboardTool";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xz1irwuo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const seoDashboardTool = definePlugin({
  name: "seo-dashboard-tool",
  tools: [{ name: "seo-dashboard", title: "SEO Dashboard", component: SeoDashboardTool }],
});

export default defineConfig({
  name: "default",
  title: "MBBS Admissions Studio",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S: any) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Blog posts")
              .child(
                S.documentTypeList("pages")
                  .title("Blog posts")
                  .filter('_type == "pages" && isBlog == true')
              ),
            S.listItem()
              .title("Landing pages")
              .child(
                S.documentTypeList("pages")
                  .title("Landing pages")
                  .filter('_type == "pages" && coalesce(isBlog, false) != true')
              ),
            S.listItem()
              .title("Static SEO pages")
              .child(S.documentTypeList("staticSeoPage").title("Static SEO pages")),
            S.divider(),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("youtubeEmbed").title("YouTube embeds"),
          ]),
    }),
    seoDashboardTool(),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
