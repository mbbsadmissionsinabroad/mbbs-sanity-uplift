import { defineField, defineType } from "sanity";
import { SeoInput } from "../../components/seo/SeoInput";

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO dashboard",
  type: "object",
  components: {
    input: SeoInput,
  },
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string" }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 4 }),
    defineField({ name: "focusKeyword", title: "Focus keyword", type: "string" }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url" }),
    defineField({ name: "robots", title: "Robots", type: "string" }),
    defineField({ name: "schemaType", title: "Schema type", type: "string" }),
    defineField({
      name: "ogImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});
