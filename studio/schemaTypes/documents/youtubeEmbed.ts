import { defineField, defineType } from "sanity";

export const youtubeEmbed = defineType({
  name: "youtubeEmbed",
  title: "YouTube embed",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url", validation: (rule) => rule.required() }),
  ],
});
