export const LONG_BLOG_SLUG_THRESHOLD = 80;
export const BLOG_PUBLIC_SLUG_MAX_LENGTH = 72;

type BlogLike = {
  slug?: string | { current?: string | null } | null;
};

function normalizeSlugToken(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBlogSourceSlug(blog: BlogLike) {
  if (typeof blog.slug === "string") {
    return normalizeSlugToken(blog.slug);
  }

  const current = blog.slug?.current;
  return typeof current === "string" ? normalizeSlugToken(current) : "";
}

export function buildTrimmedBlogSlug(
  sourceSlug: string,
  maxLength = BLOG_PUBLIC_SLUG_MAX_LENGTH
) {
  const normalized = normalizeSlugToken(sourceSlug);
  const words = normalized.split("-").filter(Boolean);

  let output = "";
  for (const word of words) {
    const nextValue = output ? `${output}-${word}` : word;
    if (nextValue.length > maxLength) {
      break;
    }
    output = nextValue;
  }

  if (!output) {
    output = normalized.slice(0, maxLength).replace(/-+$/g, "");
  }

  return output || normalized;
}

function buildUniqueAlias(baseAlias: string, usedAliases: Set<string>) {
  if (!usedAliases.has(baseAlias)) {
    return baseAlias;
  }

  let counter = 2;
  while (true) {
    const suffix = `-${counter}`;
    const trimmedBase = baseAlias
      .slice(0, Math.max(1, BLOG_PUBLIC_SLUG_MAX_LENGTH - suffix.length))
      .replace(/-+$/g, "");
    const candidate = `${trimmedBase}${suffix}`;
    if (!usedAliases.has(candidate)) {
      return candidate;
    }
    counter += 1;
  }
}

export function buildBlogSlugAliasMap<T extends BlogLike>(blogs: T[]) {
  const usedAliases = new Set<string>();
  const oldToPublic = new Map<string, string>();
  const publicToOld = new Map<string, string>();

  const normalizedBlogs = blogs
    .map((blog) => getBlogSourceSlug(blog))
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));

  for (const sourceSlug of normalizedBlogs) {
    if (sourceSlug.length <= LONG_BLOG_SLUG_THRESHOLD) {
      usedAliases.add(sourceSlug);
      oldToPublic.set(sourceSlug, sourceSlug);
      publicToOld.set(sourceSlug, sourceSlug);
    }
  }

  for (const sourceSlug of normalizedBlogs) {
    if (sourceSlug.length <= LONG_BLOG_SLUG_THRESHOLD) {
      continue;
    }

    const baseAlias = buildTrimmedBlogSlug(sourceSlug);
    const alias = buildUniqueAlias(baseAlias, usedAliases);
    usedAliases.add(alias);
    oldToPublic.set(sourceSlug, alias);
    publicToOld.set(alias, sourceSlug);
  }

  return {
    oldToPublic,
    publicToOld,
  };
}

export function withPublicBlogSlugs<T extends BlogLike>(blogs: T[]) {
  const { oldToPublic } = buildBlogSlugAliasMap(blogs);

  return blogs.map((blog) => {
    const sourceSlug = getBlogSourceSlug(blog);
    return {
      ...blog,
      publicSlug: oldToPublic.get(sourceSlug) ?? sourceSlug,
    };
  });
}
