import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const appDir = path.join(rootDir, "app");

const shouldPatchRoute = (route) =>
  route === "/ausbildung" ||
  route === "/learn-german-language-course-in-bangalore" ||
  route === "/pg-in-abroad" ||
  route.startsWith("/medical-pg-") ||
  route.startsWith("/nursing-") ||
  route.startsWith("/mbbs-in-") ||
  route.startsWith("/mbbs-admission-in-") ||
  route === "/study-mbbs-in-russia" ||
  route === "/krasnoyarsk-state-medical-university-russia";

const pageFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name === "page.tsx") {
      pageFiles.push(fullPath);
    }
  }
}

function addImport(content, importLine) {
  return content.includes(importLine) ? content : `${importLine}\n${content}`;
}

function patchMetadata(content, route) {
  if (content.includes("export async function generateMetadata")) return content;

  const metadataBlockRegex = /export const metadata: Metadata = \{[\s\S]*?\n\};\n/;
  if (!metadataBlockRegex.test(content) || !content.includes("metaTitle") || !content.includes("metaDescription")) {
    return content;
  }

  const replacement = `export async function generateMetadata(): Promise<Metadata> {\n  return buildStaticPageMetadata({\n    route: "${route}",\n    fallbackTitle: metaTitle,\n    fallbackDescription: metaDescription,\n    fallbackCanonical: pageUrl,\n  });\n}\n`;

  return content.replace(metadataBlockRegex, `${replacement}\n`);
}

function patchImports(content) {
  content = addImport(content, 'import StaticPageResourceLinks from "@/app/components/StaticPageResourceLinks";');
  content = addImport(content, 'import { buildStaticPageMetadata } from "@/lib/staticPageSeo";');
  return content;
}

function patchLinksSection(content) {
  if (content.includes("<StaticPageResourceLinks")) {
    return content;
  }

  const leadSectionRegex = /(\s+<\w+LeadSection\s*\/>\n)/;
  if (leadSectionRegex.test(content)) {
    return content.replace(
      leadSectionRegex,
      `\n      <StaticPageResourceLinks currentRoute={pageUrl} />\n$1`
    );
  }

  const faqSectionRegex = /(\s+<section id="faq")/;
  if (faqSectionRegex.test(content)) {
    return content.replace(
      faqSectionRegex,
      `\n      <StaticPageResourceLinks currentRoute={pageUrl} />\n\n$1`
    );
  }

  return content;
}

walk(appDir);

let patchedCount = 0;

for (const pageFile of pageFiles) {
  const route = `/${path.basename(path.dirname(pageFile))}`;
  if (!shouldPatchRoute(route)) continue;

  let content = fs.readFileSync(pageFile, "utf8");
  const original = content;

  if (content.includes('redirect("') || content.includes("redirect('")) {
    continue;
  }

  content = patchImports(content);
  content = patchMetadata(content, route);

  if (content.includes("pageUrl")) {
    content = patchLinksSection(content);
  }

  if (content !== original) {
    fs.writeFileSync(pageFile, content);
    patchedCount += 1;
  }
}

console.log(`Patched ${patchedCount} static pages.`);
