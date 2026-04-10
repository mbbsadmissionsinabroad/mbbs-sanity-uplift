import { defineConfig, definePlugin } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId, title } from "./lib/constants";
import { schemaTypes } from "./schemaTypes";
import { SeoDashboardTool } from "./components/SeoDashboardTool";

const seoDashboardTool = definePlugin({
  name: "seo-dashboard-tool",
  tools: [{ name: "seo-dashboard", title: "SEO Dashboard", component: SeoDashboardTool }],
});

export default defineConfig({
  name: "default",
  title,
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
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
