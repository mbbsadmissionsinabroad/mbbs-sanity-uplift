import { defineArrayMember, defineField, defineType } from "sanity";

export const calloutBlock = defineType({
  name: "calloutBlock",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "info",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Success", value: "success" },
          { title: "Warning", value: "warning" },
          { title: "Danger", value: "danger" },
        ],
      },
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      tone: "tone",
    },
    prepare(value) {
      return {
        title: value.title || "Callout",
        subtitle: value.tone || "info",
      };
    },
  },
});
