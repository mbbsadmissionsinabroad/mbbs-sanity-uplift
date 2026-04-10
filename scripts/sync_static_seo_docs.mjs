import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const rootDir = process.cwd();
const registryPath = path.join(rootDir, "app", "data", "staticSeoRegistry.ts");

const token =
  process.env.SANITY_WRITE_TOKEN ||
  process.env.NEXT_PUBLIC_SANITY_TOKEN ||
  process.env.SANITY_TOKEN;

if (!token) {
  console.error("Missing Sanity write token in environment.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xz1irwuo",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const fileContent = fs.readFileSync(registryPath, "utf8");
const jsonMatch = fileContent.match(/=\s*(\[[\s\S]*\])\s+as const;/);

if (!jsonMatch) {
  console.error("Could not parse static SEO registry.");
  process.exit(1);
}

const pages = JSON.parse(jsonMatch[1]);

const mutations = pages.map((page) => ({
  createOrReplace: {
    _id: `staticSeoPage.${page.route.replace(/\//g, "_").replace(/^_/, "")}`,
    _type: "staticSeoPage",
    title: page.title,
    route: page.route,
    section: page.section,
    seoTitle: page.metaTitle,
    metaDescription: page.metaDescription,
  },
}));

async function run() {
  for (let index = 0; index < mutations.length; index += 100) {
    const chunk = mutations.slice(index, index + 100);
    await client.mutate(chunk);
  }
  console.log(`Synced ${mutations.length} static SEO documents to Sanity.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
