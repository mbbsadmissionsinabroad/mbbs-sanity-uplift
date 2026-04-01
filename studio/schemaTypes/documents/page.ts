import { defineArrayMember, defineField, defineType } from "sanity";
import { analyzeSeo, type PageDocument } from "../../lib/seoAnalysis";

export const page = defineType({
  name: "pages",
  title: "Pages",
  type: "document",
  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "editorial",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "isBlog", title: "Blog post", type: "boolean", group: "settings", initialValue: true }),
    defineField({
      name: "blogCategory",
      title: "Blog category",
      type: "string",
      group: "settings",
      options: { list: ["MBBS Abroad", "Philippines", "India", "Medical PG", "Nursing Jobs"] },
    }),
    defineField({
      name: "bannerImage",
      title: "Banner image",
      type: "image",
      group: ["editorial", "seo"],
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "pageContent",
      title: "Page content",
      type: "array",
      group: "editorial",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                title: "Link",
                type: "object",
                fields: [defineField({ name: "href", title: "URL", type: "url" })],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (rule) => rule.required().warning("Alt text helps both SEO and accessibility."),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
        defineArrayMember({ type: "calloutBlock" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO command center",
      type: "seoFields",
      group: "seo",
      validation: (rule) => [
        rule.custom((_, context) => {
          const document = context.document as PageDocument & { isBlog?: boolean };
          if (!document?.isBlog) return true;
          const report = analyzeSeo(document);
          const missingCritical = report.checks.filter(
            (check) =>
              check.status === "fail" &&
              ["SEO title length", "Meta description", "Focus keyword coverage"].includes(check.label)
          );
          if (missingCritical.length > 0) {
            return `Resolve critical SEO issues before publishing: ${missingCritical
              .map((check) => check.label)
              .join(", ")}.`;
          }
          return true;
        }),
        rule.custom((_, context) => {
          const document = context.document as PageDocument & { isBlog?: boolean };
          if (!document?.isBlog) return true;
          const report = analyzeSeo(document);
          if (report.seoScore < 60) {
            return `SEO score is ${report.seoScore}/100. Improve optimization before publishing.`;
          }
          if (report.readabilityScore < 45) {
            return `Readability score is ${report.readabilityScore}/100. The article is hard to scan.`;
          }
          return true;
        }).warning(),
      ],
    }),
    defineField({ name: "metaTitle", title: "Legacy meta title", type: "string", group: "seo", readOnly: true }),
    defineField({ name: "metaDescription", title: "Legacy meta description", type: "text", rows: 3, group: "seo", readOnly: true }),
    defineField({ name: "metaKeywords", title: "Legacy meta keywords", type: "string", group: "seo", readOnly: true }),
    defineField({ name: "canonical", title: "Legacy canonical URL", type: "url", group: "seo", readOnly: true }),
    defineField({
      name: "frequentlyAskedQuestion",
      title: "FAQs",
      type: "array",
      group: "editorial",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
    }),
    defineField({
      name: "inlineFaq",
      title: "Inline FAQ blocks",
      type: "array",
      group: "editorial",
      of: [defineArrayMember({ type: "faqItem" })],
    }),
    defineField({
      name: "youtubeEmbedUrl",
      title: "YouTube embeds",
      type: "array",
      group: "editorial",
      of: [defineArrayMember({ type: "reference", to: [{ type: "youtubeEmbed" }] })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "bannerImage" },
  },
});
