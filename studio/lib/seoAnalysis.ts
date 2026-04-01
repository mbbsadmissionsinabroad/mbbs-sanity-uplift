export type PortableTextChild = {
  _type?: string;
  text?: string;
};

export type PortableTextBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  alt?: string;
  caption?: string;
  children?: PortableTextChild[];
  markDefs?: Array<{ _type?: string; href?: string }>;
};

export type PageDocument = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonical?: string;
  bannerImage?: unknown;
  mainImage?: unknown;
  seo?: {
    title?: string;
    description?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
    robots?: string;
    schemaType?: string;
    ogImage?: unknown;
  };
  pageContent?: PortableTextBlock[];
};

export type SeoCheck = {
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

export type SeoReport = {
  seoScore: number;
  readabilityScore: number;
  readingEase: number;
  wordCount: number;
  readingTimeMinutes: number;
  checks: SeoCheck[];
  serpTitle: string;
  serpDescription: string;
  focusKeyword: string;
};

const sentencePattern = /[.!?]+/g;
const wordPattern = /[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g;
const internalDomainPattern = /mbbsadmissionsinabroad\.com/i;

function normalizeText(value?: string) {
  return (value || "").replace(/\s+/g, " ").trim();
}

function extractPortableText(blocks: PortableTextBlock[] = []) {
  const paragraphs: string[] = [];
  const headings: string[] = [];
  const links: string[] = [];
  let imageCount = 0;
  let missingAltCount = 0;
  let h1Count = 0;

  for (const block of blocks) {
    if (block._type === "block") {
      const text = normalizeText(
        (block.children || [])
          .map((child) => (child._type === "span" ? child.text || "" : ""))
          .join("")
      );

      if (text) paragraphs.push(text);
      if (block.style === "h1") {
        h1Count += 1;
        if (text) headings.push(text);
      }
      if (block.style && /^h[2-6]$/.test(block.style) && text) headings.push(text);

      for (const mark of block.markDefs || []) {
        if (mark._type === "link" && mark.href) links.push(mark.href);
      }
    }

    if (block._type === "image") {
      imageCount += 1;
      if (!normalizeText(block.alt)) missingAltCount += 1;
    }
  }

  return {
    text: normalizeText(paragraphs.join(" ")),
    headings,
    links,
    imageCount,
    missingAltCount,
    h1Count,
  };
}

function countWords(text: string) {
  return text.match(wordPattern)?.length || 0;
}

function countSentences(text: string) {
  return Math.max(1, text.split(sentencePattern).filter(Boolean).length);
}

function countSyllables(word: string) {
  const normalized = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!normalized) return 0;
  if (normalized.length <= 3) return 1;

  const stripped = normalized
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
    .replace(/^y/, "");
  const groups = stripped.match(/[aeiouy]{1,2}/g);
  return Math.max(1, groups?.length || 0);
}

function fleschReadingEase(text: string) {
  const words = text.match(wordPattern) || [];
  const wordCountValue = Math.max(1, words.length);
  const sentenceCount = countSentences(text);
  const syllableCount = words.reduce((total, word) => total + countSyllables(word), 0);
  return 206.835 - 1.015 * (wordCountValue / sentenceCount) - 84.6 * (syllableCount / wordCountValue);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function readabilityBand(score: number) {
  if (score >= 75) return 100;
  if (score >= 65) return 85;
  if (score >= 55) return 72;
  if (score >= 45) return 58;
  if (score >= 35) return 46;
  return 30;
}

function getSeoFields(document: PageDocument) {
  const seo = document.seo || {};

  return {
    title: normalizeText(seo.title || document.metaTitle || document.title),
    description: normalizeText(seo.description || document.metaDescription),
    focusKeyword: normalizeText(seo.focusKeyword || document.metaKeywords),
    canonicalUrl: normalizeText(seo.canonicalUrl || document.canonical),
    robots: normalizeText(seo.robots || "index,follow"),
    schemaType: normalizeText(seo.schemaType || "Article"),
    ogImage: seo.ogImage || document.bannerImage || document.mainImage,
  };
}

export function analyzeSeo(document: PageDocument): SeoReport {
  const body = extractPortableText(document.pageContent || []);
  const seo = getSeoFields(document);
  const checks: SeoCheck[] = [];
  let score = 0;

  const titleLength = seo.title.length;
  if (titleLength >= 30 && titleLength <= 60) {
    score += 18;
    checks.push({ label: "SEO title length", status: "pass", detail: `${titleLength} characters is in the ideal range.` });
  } else if (titleLength > 0) {
    score += 8;
    checks.push({ label: "SEO title length", status: "warn", detail: `${titleLength} characters. Aim for 30-60.` });
  } else {
    checks.push({ label: "SEO title length", status: "fail", detail: "Add an SEO title." });
  }

  const descriptionLength = seo.description.length;
  if (descriptionLength >= 120 && descriptionLength <= 160) {
    score += 16;
    checks.push({ label: "Meta description", status: "pass", detail: `${descriptionLength} characters is strong for search snippets.` });
  } else if (descriptionLength > 0) {
    score += 7;
    checks.push({ label: "Meta description", status: "warn", detail: `${descriptionLength} characters. Aim for 120-160.` });
  } else {
    checks.push({ label: "Meta description", status: "fail", detail: "Add a meta description." });
  }

  if (seo.focusKeyword) {
    const keyword = seo.focusKeyword.toLowerCase();
    const titleHit = seo.title.toLowerCase().includes(keyword);
    const descriptionHit = seo.description.toLowerCase().includes(keyword);
    const bodyHit = body.text.toLowerCase().includes(keyword);
    const headingHit = body.headings.some((heading) => heading.toLowerCase().includes(keyword));
    const hitCount = [titleHit, descriptionHit, bodyHit, headingHit].filter(Boolean).length;

    if (hitCount >= 3) {
      score += 18;
      checks.push({ label: "Focus keyword coverage", status: "pass", detail: "The focus keyword appears in the key SEO surfaces." });
    } else if (hitCount >= 1) {
      score += 10;
      checks.push({ label: "Focus keyword coverage", status: "warn", detail: "Use the focus keyword in the title, description, headings, and body." });
    } else {
      checks.push({ label: "Focus keyword coverage", status: "fail", detail: "The focus keyword is not reflected in the content." });
    }
  } else {
    checks.push({ label: "Focus keyword coverage", status: "fail", detail: "Set a focus keyword to guide optimization." });
  }

  if (body.h1Count === 1) {
    score += 10;
    checks.push({ label: "Heading structure", status: "pass", detail: "Exactly one H1 is present." });
  } else if (body.h1Count === 0) {
    checks.push({ label: "Heading structure", status: "fail", detail: "Add a single H1 heading." });
  } else {
    checks.push({ label: "Heading structure", status: "warn", detail: `Found ${body.h1Count} H1 headings. Use only one.` });
  }

  if (body.headings.length >= 2) {
    score += 8;
    checks.push({ label: "Heading depth", status: "pass", detail: "The article has supporting section headings." });
  } else {
    checks.push({ label: "Heading depth", status: "warn", detail: "Add H2/H3 headings to make the article easier to scan." });
  }

  if (body.imageCount === 0) {
    checks.push({ label: "Images and alt text", status: "warn", detail: "No inline images found in the article body." });
  } else if (body.missingAltCount === 0) {
    score += 8;
    checks.push({ label: "Images and alt text", status: "pass", detail: "All article images include alt text." });
  } else {
    score += 3;
    checks.push({ label: "Images and alt text", status: "warn", detail: `${body.missingAltCount} image(s) are missing alt text.` });
  }

  const internalLinks = body.links.filter((href) => internalDomainPattern.test(href)).length;
  const externalLinks = body.links.length - internalLinks;
  if (internalLinks >= 1 && externalLinks >= 1) {
    score += 8;
    checks.push({ label: "Link profile", status: "pass", detail: "The article includes both internal and external links." });
  } else if (body.links.length > 0) {
    score += 4;
    checks.push({ label: "Link profile", status: "warn", detail: "Add both internal and external links where relevant." });
  } else {
    checks.push({ label: "Link profile", status: "fail", detail: "Add useful internal and external links." });
  }

  if (seo.canonicalUrl) {
    score += 5;
    checks.push({ label: "Canonical URL", status: "pass", detail: "Canonical URL is set." });
  } else {
    checks.push({ label: "Canonical URL", status: "warn", detail: "Set a canonical URL to reduce duplicate-content risk." });
  }

  if (seo.ogImage) {
    score += 5;
    checks.push({ label: "Open Graph image", status: "pass", detail: "Social share image is available." });
  } else {
    checks.push({ label: "Open Graph image", status: "warn", detail: "Add an OG image for stronger social sharing previews." });
  }

  if (seo.schemaType) {
    score += 4;
    checks.push({ label: "Structured data", status: "pass", detail: `${seo.schemaType} schema is selected.` });
  } else {
    checks.push({ label: "Structured data", status: "warn", detail: "Choose a schema type." });
  }

  const wordCountValue = countWords(body.text);
  if (wordCountValue >= 600) {
    score += 8;
    checks.push({ label: "Content depth", status: "pass", detail: `${wordCountValue} words gives the article useful depth.` });
  } else if (wordCountValue >= 300) {
    score += 4;
    checks.push({ label: "Content depth", status: "warn", detail: `${wordCountValue} words. Consider adding more detail.` });
  } else {
    checks.push({ label: "Content depth", status: "fail", detail: `${wordCountValue} words is thin for an SEO article.` });
  }

  const readingEase = fleschReadingEase(body.text || seo.description || seo.title);
  const readabilityScore = readabilityBand(readingEase);
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCountValue / 220));

  return {
    seoScore: clamp(Math.round(score), 0, 100),
    readabilityScore,
    readingEase: Math.round(readingEase),
    wordCount: wordCountValue,
    readingTimeMinutes,
    checks,
    serpTitle: seo.title,
    serpDescription: seo.description,
    focusKeyword: seo.focusKeyword,
  };
}
