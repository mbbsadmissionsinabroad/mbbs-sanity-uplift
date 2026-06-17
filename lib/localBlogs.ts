import rawLocalBlogs from "./localBlogsData.generated.json";
import localBlogsSupplement from "./localBlogsSupplement";

const SITE_URL = "https://www.mbbsadmissionsinabroad.com";

interface LinkTarget {
  country: string;
  href: string;
  keywords: string[];
}

const LINK_TARGETS: LinkTarget[] = [
  {
    country: "Russia",
    href: "/mbbs-in-russia",
    keywords: ["Study MBBS in Russia", "MBBS admission in Russia", "MBBS in Russia", "Russia"],
  },
  {
    country: "Georgia",
    href: "/mbbs-in-georgia",
    keywords: ["Study MBBS in Georgia", "MBBS admission in Georgia", "MBBS in Georgia", "Georgia"],
  },
  {
    country: "Germany",
    href: "/mbbs-admission-in-germany-for-indian-students",
    keywords: ["Study MBBS in Germany", "MBBS admission in Germany", "MBBS in Germany", "Germany"],
  },
  {
    country: "Kazakhstan",
    href: "/mbbs-in-kazakhstan",
    keywords: ["Study MBBS in Kazakhstan", "MBBS admission in Kazakhstan", "MBBS in Kazakhstan", "Kazakhstan"],
  },
  {
    country: "Uzbekistan",
    href: "/mbbs-in-uzbekistan",
    keywords: ["Study MBBS in Uzbekistan", "MBBS admission in Uzbekistan", "MBBS in Uzbekistan", "Uzbekistan"],
  },
  {
    country: "Bosnia",
    href: "/mbbs-in-bosnia",
    keywords: ["Study MBBS in Bosnia", "MBBS admission in Bosnia", "MBBS in Bosnia and Herzegovina", "MBBS in Bosnia", "Bosnia and Herzegovina", "Bosnia"],
  },
  {
    country: "Malaysia",
    href: "/mbbs-admission-in-malaysia-for-indian-students",
    keywords: ["Study MBBS in Malaysia", "MBBS admission in Malaysia", "MBBS in Malaysia", "Malaysia"],
  },
  {
    country: "Vietnam",
    href: "/mbbs-in-vietnam",
    keywords: ["Study MBBS in Vietnam", "MBBS admission in Vietnam", "MBBS in Vietnam", "Vietnam"],
  },
  {
    country: "Kyrgyzstan",
    href: "/mbbs-in-kyrgyzstan",
    keywords: ["Study MBBS in Kyrgyzstan", "MBBS admission in Kyrgyzstan", "MBBS in Kyrgyzstan", "Kyrgyzstan"],
  },
  {
    country: "Armenia",
    href: "/mbbs-in-armenia",
    keywords: ["Study MBBS in Armenia", "MBBS admission in Armenia", "MBBS in Armenia", "Armenia"],
  },
  {
    country: "Europe",
    href: "/mbbs-admission-in-europe-from-mci-approved-university",
    keywords: ["Study MBBS in Europe", "MBBS admission in Europe", "MBBS in Europe", "Europe"],
  },
];

interface CompiledKeyword {
  keyword: string;
  regex: RegExp;
  target: LinkTarget;
}

const COMPILED_KEYWORDS: CompiledKeyword[] = [];
for (const target of LINK_TARGETS) {
  for (const keyword of target.keywords) {
    const escaped = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    COMPILED_KEYWORDS.push({
      keyword,
      regex,
      target,
    });
  }
}
COMPILED_KEYWORDS.sort((a, b) => b.keyword.length - a.keyword.length);

function injectInternalLinks(html: string): string {
  const linkedCountries = new Set<string>();
  const tokens = html.split(/(<[^>]+>)/g);
  let inLink = 0;
  let inSkipTag = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (i % 2 === 1) {
      // tag token
      const lowerToken = token.toLowerCase();
      if (lowerToken.startsWith("<a ") || lowerToken.startsWith("<a>")) {
        inLink++;
      } else if (lowerToken.startsWith("</a>")) {
        inLink = Math.max(0, inLink - 1);
      } else if (
        lowerToken.startsWith("<h2") ||
        lowerToken.startsWith("<h3") ||
        lowerToken.startsWith("<th") ||
        lowerToken.startsWith("<thead>")
      ) {
        inSkipTag++;
      } else if (
        lowerToken.startsWith("</h2>") ||
        lowerToken.startsWith("</h3>") ||
        lowerToken.startsWith("</th>") ||
        lowerToken.startsWith("</thead>")
      ) {
        inSkipTag = Math.max(0, inSkipTag - 1);
      }
    } else {
      // text token
      if (inLink === 0 && inSkipTag === 0) {
        let text = token;
        let result = "";
        let currentIndex = 0;
        
        while (currentIndex < text.length) {
          let earliestMatchIndex = -1;
          let selectedKeyword: CompiledKeyword | null = null;
          
          for (const kw of COMPILED_KEYWORDS) {
            if (linkedCountries.has(kw.target.country)) {
              continue;
            }
            
            const slice = text.slice(currentIndex);
            const match = kw.regex.exec(slice);
            if (match) {
              const matchIndex = currentIndex + match.index;
              if (earliestMatchIndex === -1 || matchIndex < earliestMatchIndex) {
                earliestMatchIndex = matchIndex;
                selectedKeyword = kw;
              }
            }
          }
          
          if (selectedKeyword && earliestMatchIndex !== -1) {
            result += text.slice(currentIndex, earliestMatchIndex);
            const matchedText = text.slice(earliestMatchIndex, earliestMatchIndex + selectedKeyword.keyword.length);
            result += `<a href="${selectedKeyword.target.href}" class="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-800">${matchedText}</a>`;
            linkedCountries.add(selectedKeyword.target.country);
            currentIndex = earliestMatchIndex + selectedKeyword.keyword.length;
          } else {
            result += text.slice(currentIndex);
            break;
          }
        }
        tokens[i] = result;
      }
    }
  }

  return tokens.join("");
}

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
  bodyHtml: string;
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

export type LocalBlogSummary = Omit<LocalBlogEntry, "pageContent" | "faq" | "bodyHtml">;

const rawBlogs = [
  ...(rawLocalBlogs as RawLocalBlog[]),
  ...(localBlogsSupplement as RawLocalBlog[]),
];
const rawBlogsBySlug = new Map(
  rawBlogs.map((blog) => [blog.slug.toLowerCase(), blog])
);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHref(value: string) {
  const href = normalizeWhitespace(value);
  if (!href) {
    return "#";
  }

  if (
    href.startsWith("/") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  return "#";
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

function createHeadingId(text: string) {
  return normalizeWhitespace(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "_");
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

function isTableRow(line: string) {
  return line.startsWith("|");
}

function isTableDividerLine(line: string) {
  return /^\|?[\s:\-|]+\|?$/.test(line) && line.includes("-");
}

function splitTableCells(line: string) {
  return line
    .split("|")
    .map((cell) => normalizeWhitespace(cell))
    .filter(Boolean);
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

function renderInlineHtml(text: string) {
  const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let html = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    const [fullMatch, label, rawHref] = match;
    const start = match.index;
    const safeHref = escapeHtml(sanitizeHref(rawHref));
    const safeLabel = escapeHtml(label);
    const isExternal = /^https?:\/\//.test(rawHref);

    html += escapeHtml(text.slice(lastIndex, start));
    html += `<a href="${safeHref}" class="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-800"`;
    if (isExternal) {
      html += ` target="_blank" rel="noopener noreferrer"`;
    }
    html += `>${safeLabel}</a>`;

    lastIndex = start + fullMatch.length;
  }

  html += escapeHtml(text.slice(lastIndex));
  return html;
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

    if (isTableRow(line)) {
      while (i < lines.length && isTableRow(lines[i].trim())) {
        const current = lines[i].trim();
        if (!isTableDividerLine(current)) {
          const cells = splitTableCells(current);
          if (cells.length > 0) {
            blocks.push(createBlock(cells.join(" | "), index));
            index += 1;
          }
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
      continue;
    }

    i += 1;
  }

  return blocks;
}

function renderHeadingHtml(text: string, level: "h2" | "h3") {
  const tag = level;
  const className =
    level === "h2"
      ? "text-black text-3xl font-bold mt-5 mb-2"
      : "text-black text-2xl font-bold mt-5 mb-2";
  const id = createHeadingId(text);
  return `<${tag} id="${id}" class="${className}">${escapeHtml(text)}</${tag}>`;
}

function renderParagraphHtml(text: string) {
  return `<p class="text-gray-800 leading-relaxed">${renderInlineHtml(text)}</p>`;
}

function renderBulletListHtml(items: string[]) {
  const renderedItems = items
    .filter(Boolean)
    .map(
      (item) =>
        `<li class="pb-2 list-disc">${renderInlineHtml(item)}</li>`
    )
    .join("");

  return `<ul class="list-disc">${renderedItems}</ul>`;
}

function renderTableHtml(lines: string[]) {
  const rows = lines
    .filter((line) => !isTableDividerLine(line))
    .map(splitTableCells)
    .filter((cells) => cells.length > 0);

  if (rows.length === 0) {
    return "";
  }

  const [headerRow, ...bodyRows] = rows;
  const headerHtml = headerRow
    .map(
      (cell) =>
        `<th class="border border-slate-200 bg-slate-100 px-3 py-2 text-left text-sm font-semibold text-slate-900">${renderInlineHtml(cell)}</th>`
    )
    .join("");
  const bodyHtml = bodyRows
    .map((row) => {
      const cells = row
        .map(
          (cell) =>
            `<td class="border border-slate-200 px-3 py-2 align-top text-sm text-slate-700">${renderInlineHtml(cell)}</td>`
        )
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `<div class="my-6 overflow-x-auto"><table class="min-w-full border-collapse rounded-2xl border border-slate-200 bg-white"><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
}

function renderPlainContentHtml(source: string) {
  const lines = source.split(/\r?\n/);
  const parts: string[] = [];
  const paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    const paragraph = joinWrappedLines(paragraphBuffer);
    if (paragraph) {
      parts.push(renderParagraphHtml(paragraph));
    }
    paragraphBuffer.length = 0;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || isRule(line)) {
      flushParagraph();
      continue;
    }

    const headingStyle = headingStyleForLine(line);
    if (headingStyle) {
      flushParagraph();
      const headingText = stripHeadingPrefix(line);
      if (headingStyle === "h2" || headingStyle === "h3") {
        parts.push(renderHeadingHtml(headingText, headingStyle));
      } else {
        parts.push(renderParagraphHtml(headingText));
      }
      continue;
    }

    if (isBullet(line)) {
      flushParagraph();
      parts.push(renderBulletListHtml([line.slice(2).trim()]));
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  return parts.join("");
}

function renderMarkdownContentHtml(source: string) {
  const lines = source.split(/\r?\n/);
  const parts: string[] = [];

  for (let i = 0; i < lines.length; ) {
    const line = lines[i].trim();

    if (!line || isRule(line)) {
      i += 1;
      continue;
    }

    const headingStyle = headingStyleForLine(line);
    if (headingStyle) {
      const headingText = stripHeadingPrefix(line);
      if (headingStyle === "h2" || headingStyle === "h3") {
        parts.push(renderHeadingHtml(headingText, headingStyle));
      } else {
        parts.push(renderParagraphHtml(headingText));
      }
      i += 1;
      continue;
    }

    if (isBullet(line)) {
      const bulletItems: string[] = [];
      while (i < lines.length && isBullet(lines[i].trim())) {
        const bulletLine = lines[i].trim().slice(2).trim();
        if (bulletLine) {
          bulletItems.push(bulletLine);
        }
        i += 1;
      }
      parts.push(renderBulletListHtml(bulletItems));
      continue;
    }

    if (isTableRow(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && isTableRow(lines[i].trim())) {
        tableLines.push(lines[i].trim());
        i += 1;
      }
      const renderedTable = renderTableHtml(tableLines);
      if (renderedTable) {
        parts.push(renderedTable);
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
      parts.push(renderParagraphHtml(paragraph));
      continue;
    }

    i += 1;
  }

  return parts.join("");
}

function renderBodyHtml(source: string, format: RawLocalBlog["format"]) {
  const rawHtml = format === "plain"
    ? renderPlainContentHtml(source)
    : renderMarkdownContentHtml(source);
  return injectInternalLinks(rawHtml);
}

function renderFaqAnswerHtml(lines: string[], format: RawLocalBlog["format"]) {
  if (format === "plain") {
    return lines
      .map((line) => normalizeWhitespace(line))
      .filter(Boolean)
      .map((line) => `<p>${renderInlineHtml(line)}</p>`)
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
      parts.push(`<ul><li>${renderInlineHtml(line.slice(2).trim())}</li></ul>`);
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

function buildBaseLocalBlogEntry(rawBlog: RawLocalBlog): LocalBlogSummary {
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

function toLocalBlogEntry(rawBlog: RawLocalBlog): LocalBlogEntry {
  return {
    ...buildBaseLocalBlogEntry(rawBlog),
    bodyHtml: renderBodyHtml(rawBlog.bodySource, rawBlog.format),
    pageContent: [],
    faq: rawBlog.faq.map((item) => ({
      question: item.question,
      answer: renderFaqAnswerHtml(item.answerLines, rawBlog.format),
    })),
  };
}

export const localBlogs: LocalBlogSummary[] = rawBlogs.map(buildBaseLocalBlogEntry);
const localBlogSummariesBySlug = new Map(
  localBlogs.map((blog) => [blog.slug.current.toLowerCase(), blog])
);
const localBlogEntriesBySlug = new Map<string, LocalBlogEntry>();

export function getLocalBlogSummaryBySlug(slug: string) {
  const normalizedSlug = slug.replace(/^\/+/, "").toLowerCase();
  return localBlogSummariesBySlug.get(normalizedSlug);
}

export function getLocalBlogBySlug(slug: string) {
  const normalizedSlug = slug.replace(/^\/+/, "").toLowerCase();
  const existingEntry = localBlogEntriesBySlug.get(normalizedSlug);
  if (existingEntry) {
    return existingEntry;
  }

  const rawBlog = rawBlogsBySlug.get(normalizedSlug);
  if (!rawBlog) {
    return undefined;
  }

  const entry = toLocalBlogEntry(rawBlog);
  localBlogEntriesBySlug.set(normalizedSlug, entry);
  return entry;
}
