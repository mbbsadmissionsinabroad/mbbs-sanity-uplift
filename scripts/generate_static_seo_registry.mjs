import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const appDir = path.join(rootDir, "app");
const outputFile = path.join(appDir, "data", "staticSeoRegistry.ts");

const pageFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") {
      continue;
    }

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

function readExport(content, name) {
  const regex = new RegExp(`export const ${name}\\s*=\\s*([\\\`"'])([\\s\\S]*?)\\1;`, "m");
  const match = content.match(regex);
  return match?.[2]?.replace(/\s+/g, " ").trim() ?? "";
}

function getSection(folderName) {
  if (folderName === "ausbildung") return "ausbildung";
  if (folderName === "learn-german-language-course-in-bangalore") return "learn-german";
  if (folderName.startsWith("medical-pg-") || folderName === "pg-in-abroad") return "medical-pg";
  if (folderName.startsWith("nursing-") || folderName === "bsc-nursing") return "nursing-jobs";
  return "mbbs-abroad";
}

function getKind(folderName) {
  if (folderName === "ausbildung") return "ausbildung";
  if (folderName === "learn-german-language-course-in-bangalore") return "learn-german";
  if (folderName.startsWith("medical-pg-") || folderName === "pg-in-abroad") return "medical-pg";
  if (folderName.startsWith("nursing-") || folderName === "bsc-nursing") return "nursing";
  if (folderName.startsWith("mbbs-in-") || folderName === "study-mbbs-in-russia") return "mbbs-in";
  if (folderName.startsWith("mbbs-admission-in-")) return "mbbs-admission";
  return "other";
}

function resolvePageDataPath(pageFileContent, pageFilePath) {
  const importMatch = pageFileContent.match(/from\s+["'](.+pageData)["']/);
  if (!importMatch) {
    return null;
  }

  const importPath = importMatch[1];
  const absolutePath = path.resolve(path.dirname(pageFilePath), `${importPath}.ts`);
  return fs.existsSync(absolutePath) ? absolutePath : null;
}

function getManualEntry(route) {
  if (route === "/pg-in-abroad") {
    return {
      route,
      title: "PG Abroad for Indian Doctors",
      metaTitle: "PG Abroad for Indian Doctors - Guidance and Counselling",
      metaDescription:
        "Explore PG abroad options for Indian doctors with guidance on eligibility, country options, licensing pathways, and counselling support.",
      section: "medical-pg",
      kind: "medical-pg",
    };
  }

  if (route === "/nursing-jobs-in-abroad") {
    return {
      route,
      title: "Nursing Jobs Abroad for Indian Nurses",
      metaTitle: "Nursing Jobs Abroad for Indian Nurses - Country Guidance",
      metaDescription:
        "Explore nursing jobs abroad for Indian nurses with country comparisons, eligibility guidance, language requirements, and process support.",
      section: "nursing-jobs",
      kind: "nursing",
    };
  }

  if (route === "/nursing-jobs-in-germany") {
    return {
      route,
      title: "Nursing Jobs in Germany for Indian Nurses",
      metaTitle: "Nursing Jobs in Germany for Indian Nurses - Complete Guide",
      metaDescription:
        "Explore nursing jobs in Germany for Indian nurses with salary, recognition, language requirements, documentation, and relocation guidance.",
      section: "nursing-jobs",
      kind: "nursing",
    };
  }

  if (route === "/medical-pg-in-europe") {
    return {
      route,
      title: "Medical PG in Europe for Indian Doctors",
      metaTitle: "Medical PG in Europe for Indian Doctors - Complete Guide",
      metaDescription:
        "Explore medical PG in Europe for Indian doctors with country comparisons, licensing pathways, salary outlook, and residency planning support.",
      section: "medical-pg",
      kind: "medical-pg",
    };
  }

  if (route === "/study-mbbs-in-russia") {
    return {
      route,
      title: "Study MBBS in Russia for Indian Students",
      metaTitle: "Study MBBS in Russia 2026 - Complete Guide for Indian Students",
      metaDescription:
        "Study MBBS in Russia with guidance on universities, fees, NMC relevance, admissions, hostel life, and India-return planning for Indian students.",
      section: "mbbs-abroad",
      kind: "mbbs-in",
    };
  }

  return null;
}

walk(appDir);

const pages = pageFiles
  .map((pageFilePath) => {
    const route = `/${path.basename(path.dirname(pageFilePath))}`;
    const folderName = path.basename(path.dirname(pageFilePath));
    const pageFileContent = fs.readFileSync(pageFilePath, "utf8");
    const pageDataPath = resolvePageDataPath(pageFileContent, pageFilePath);

    if (!pageDataPath) {
      return getManualEntry(route);
    }

    const pageDataContent = fs.readFileSync(pageDataPath, "utf8");
    const title = readExport(pageDataContent, "pageTitle") || readExport(pageDataContent, "metaTitle") || folderName;
    const metaTitle = readExport(pageDataContent, "metaTitle") || title;
    const metaDescription = readExport(pageDataContent, "metaDescription");

    return {
      route,
      title,
      metaTitle,
      metaDescription,
      section: getSection(folderName),
      kind: getKind(folderName),
    };
  })
  .filter((page) => page && page.metaTitle && page.metaDescription)
  .sort((a, b) => a.route.localeCompare(b.route));

const output = `import type { StaticSeoRegistryEntry } from "./staticPageResources";

export const staticSeoPages: StaticSeoRegistryEntry[] = ${JSON.stringify(pages, null, 2)} as const;
`;

fs.writeFileSync(outputFile, output);
console.log(`Generated ${pages.length} static SEO entries at ${outputFile}`);
