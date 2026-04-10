import { defineField, defineType } from "sanity";

const sectionOptions = [
  { title: "MBBS Abroad", value: "mbbs-abroad" },
  { title: "Medical PG", value: "medical-pg" },
  { title: "Nursing Jobs", value: "nursing-jobs" },
  { title: "Learn German", value: "learn-german" },
  { title: "Ausbildung", value: "ausbildung" },
];

export const staticSeoPage = defineType({
  name: "staticSeoPage",
  title: "Static SEO Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page label",
      type: "string",
      description: "Editor-facing label for this coded website page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "route",
      title: "Route",
      type: "string",
      description: "Exact website path, for example /mbbs-in-georgia",
      validation: (rule) =>
        rule
          .required()
          .regex(/^\/[a-z0-9-/]+$/, { name: "route" })
          .warning("Use the live route path starting with /."),
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "string",
      options: { list: sectionOptions },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      validation: (rule) => rule.required().min(30).max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(80).max(170),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "route",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
