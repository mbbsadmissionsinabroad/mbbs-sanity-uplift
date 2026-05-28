import rawLocalBlogs from "./localBlogsData.generated.json";

const SITE_URL = "https://www.mbbsadmissionsinabroad.com";

type RawLocalBlog = {
  slug: string;
  title: string;
  cardTitle?: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  keywordSynonyms: string[];
  bodySource: string;
  faq: Array<{
    question: string;
    answerLines: string[];
  }>;
  format: "plain" | "markdown";
  blogCategory: string;
  bannerImageUrl: string;
  publishedAt: string;
  relatedLinks?: Array<{
    href: string;
    label: string;
  }>;
};

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3";
  markDefs: [];
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: [];
  }>;
  listItem?: "bullet";
  level?: number;
};

export type LocalBlogEntry = {
  isLocalBlog: true;
  title: string;
  cardTitle: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  focusKeyword: string;
  keywordSynonyms: string[];
  slug: {
    current: string;
  };
  publicSlug: string;
  blogCategory: string;
  bannerImageUrl: string;
  pageContent: PortableTextBlock[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    robots: string;
    keywords: string[];
  };
  canonical: string;
  publishedAt: string;
  _updatedAt: string;
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

const rawBlogs = rawLocalBlogs as RawLocalBlog[];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function createSpan(text: string, index: number) {
  return {
    _type: "span" as const,
    _key: `span-${index}`,
    text,
    marks: [] as [],
  };
}

function createBlock(
  text: string,
  index: number,
  style: "normal" | "h2" | "h3" = "normal",
  listItem?: "bullet"
): PortableTextBlock {
  const block: PortableTextBlock = {
    _type: "block",
    _key: `block-${index}`,
    style,
    markDefs: [],
    children: [createSpan(text, index)],
  };

  if (listItem) {
    block.listItem = listItem;
    block.level = 1;
  }

  return block;
}

function isRule(line: string) {
  return line === "---";
}

function isBullet(line: string) {
  return line.startsWith("- ");
}

function headingStyleForLine(line: string) {
  if (line.startsWith("### ")) {
    return "h3" as const;
  }

  if (line.startsWith("## ") || line.startsWith("# ")) {
    return "h2" as const;
  }

  if (/^\d+\.\d+\s+/.test(line)) {
    return "h3" as const;
  }

  if (/^\d+\.\s+/.test(line)) {
    return "h2" as const;
  }

  return null;
}

function stripHeadingPrefix(line: string) {
  return line.replace(/^#{1,3}\s+/, "").trim();
}

function isStructuralLine(line: string) {
  return Boolean(
    headingStyleForLine(line) ||
      isBullet(line) ||
      isRule(line) ||
      line.startsWith("|")
  );
}

function joinWrappedLines(lines: string[]) {
  let output = "";

  for (const line of lines) {
    const value = normalizeWhitespace(line);
    if (!value) {
      continue;
    }

    if (!output) {
      output = value;
      continue;
    }

    if (output.endsWith("-")) {
      output = `${output.slice(0, -1)}${value}`;
      continue;
    }

    output = `${output} ${value}`;
  }

  return normalizeWhitespace(output);
}

function parsePlainContent(source: string) {
  const lines = source.split(/\r?\n/);
  const blocks: PortableTextBlock[] = [];
  let index = 0;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || isRule(line)) {
      continue;
    }

    const headingStyle = headingStyleForLine(line);
    if (headingStyle) {
      blocks.push(
        createBlock(stripHeadingPrefix(line), index, headingStyle)
      );
      index += 1;
      continue;
    }

    if (isBullet(line)) {
      blocks.push(createBlock(line.slice(2).trim(), index, "normal", "bullet"));
      index += 1;
      continue;
    }

    blocks.push(createBlock(line, index));
    index += 1;
  }

  return blocks;
}

function parseMarkdownContent(source: string) {
  const lines = source.split(/\r?\n/);
  const blocks: PortableTextBlock[] = [];
  let index = 0;

  for (let i = 0; i < lines.length; ) {
    const line = lines[i].trim();

    if (!line || isRule(line)) {
      i += 1;
      continue;
    }

    const headingStyle = headingStyleForLine(line);
    if (headingStyle) {
      blocks.push(
        createBlock(stripHeadingPrefix(line), index, headingStyle)
      );
      index += 1;
      i += 1;
      continue;
    }

    if (isBullet(line)) {
      while (i < lines.length && isBullet(lines[i].trim())) {
        const bulletLine = lines[i].trim().slice(2).trim();
        if (bulletLine) {
          blocks.push(createBlock(bulletLine, index, "normal", "bullet"));
          index += 1;
        }
        i += 1;
      }
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const current = lines[i].trim();
      if (!current || isStructuralLine(current)) {
        break;
      }
      paragraphLines.push(current);
      i += 1;
    }

    const paragraph = joinWrappedLines(paragraphLines);
    if (paragraph) {
      blocks.push(createBlock(paragraph, index));
      index += 1;
    }
  }

  return blocks;
}

function renderFaqAnswerHtml(lines: string[], format: RawLocalBlog["format"]) {
  if (format === "plain") {
    return lines
      .map((line) => normalizeWhitespace(line))
      .filter(Boolean)
      .map((line) => `<p>${escapeHtml(line)}</p>`)
      .join("");
  }

  const parts: string[] = [];
  let buffer: string[] = [];

  const flushParagraph = () => {
    const paragraph = joinWrappedLines(buffer);
    if (paragraph) {
      parts.push(`<p>${escapeHtml(paragraph)}</p>`);
    }
    buffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || isRule(line)) {
      flushParagraph();
      continue;
    }

    if (isBullet(line)) {
      flushParagraph();
      parts.push(`<ul><li>${escapeHtml(line.slice(2).trim())}</li></ul>`);
      continue;
    }

    buffer.push(line);
  }

  flushParagraph();
  return parts.join("");
}

function sanitizeCardTitle(rawBlog: RawLocalBlog) {
  const cleanedMetaTitle = rawBlog.metaTitle
    .replace(/\s+\|\s+2026 Guide$/i, "")
    .replace(/\s+\|\s+Free 24\/7 Support$/i, "")
    .replace(/\s+\(Professional Guide by Newlyf\s+Overseas\)$/i, "")
    .replace(/\s+\(Expert Guide by Newlyf\s+Overseas\)$/i, "")
    .trim();

  if (!rawBlog.cardTitle) {
    return cleanedMetaTitle || rawBlog.title;
  }

  if (
    rawBlog.cardTitle.length < Math.max(28, Math.floor(cleanedMetaTitle.length * 0.7))
  ) {
    return cleanedMetaTitle || rawBlog.title;
  }

  return rawBlog.cardTitle;
}

function toLocalBlogEntry(rawBlog: RawLocalBlog): LocalBlogEntry {
  const canonical = `${SITE_URL}/${rawBlog.slug}`;
  const keywords = [rawBlog.focusKeyword, ...rawBlog.keywordSynonyms].filter(Boolean);
  const metaKeywords = keywords.join(", ");
  const bannerImageUrl =
    rawBlog.bannerImageUrl && rawBlog.bannerImageUrl !== "/home-counselling.jpg"
      ? rawBlog.bannerImageUrl
      : "/students.jpeg";

  return {
    isLocalBlog: true,
    title: rawBlog.title,
    cardTitle: sanitizeCardTitle(rawBlog),
    metaTitle: rawBlog.metaTitle,
    metaDescription: rawBlog.metaDescription,
    metaKeywords,
    focusKeyword: rawBlog.focusKeyword,
    keywordSynonyms: rawBlog.keywordSynonyms,
    slug: {
      current: rawBlog.slug,
    },
    publicSlug: rawBlog.slug,
    blogCategory: rawBlog.blogCategory,
    bannerImageUrl,
    pageContent:
      rawBlog.format === "plain"
        ? parsePlainContent(rawBlog.bodySource)
        : parseMarkdownContent(rawBlog.bodySource),
    faq: rawBlog.faq.map((item) => ({
      question: item.question,
      answer: renderFaqAnswerHtml(item.answerLines, rawBlog.format),
    })),
    seo: {
      title: rawBlog.metaTitle,
      description: rawBlog.metaDescription,
      canonicalUrl: canonical,
      robots: "index,follow",
      keywords,
    },
    canonical,
    publishedAt: rawBlog.publishedAt,
    _updatedAt: rawBlog.publishedAt,
    relatedLinks: rawBlog.relatedLinks || [],
  };
}

export const localBlogs: LocalBlogEntry[] = rawBlogs.map(toLocalBlogEntry);

export function getLocalBlogBySlug(slug: string) {
  const normalizedSlug = slug.replace(/^\/+/, "").toLowerCase();
  return localBlogs.find(
    (blog) => blog.slug.current.toLowerCase() === normalizedSlug
  );
}
