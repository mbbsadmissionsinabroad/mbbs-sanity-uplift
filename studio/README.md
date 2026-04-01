# MBBS Sanity Studio

This Studio connects to:

- Project: `xz1irwuo`
- Dataset: `production`

## Run locally

```bash
cd studio
npm install
npm run dev
```

Open `http://localhost:3333`.

## Included

- Existing `pages` documents connected from Sanity project `xz1irwuo`
- Blog-focused content desk with blog posts, landing pages, FAQs, and YouTube embeds
- SEO command center field with:
  - live SEO score
  - live readability score
  - search snippet preview
  - focus keyword guidance
  - canonical, robots, and schema controls
- Dashboard tool for blog SEO health across the dataset
- Publish-time validation warnings for weak SEO and readability
- Flexible content blocks for rich text, inline images with alt text, callouts, and inline FAQ items

## Current frontend compatibility

- The website still supports legacy fields like `metaTitle`, `metaDescription`, `metaKeywords`, and `canonical`.
- The blog route now generates dynamic metadata from `seo.*` first, then falls back to the legacy fields.
- A local fallback was added for Sanity blog detail fetching so blog pages work without a missing `NEXT_PUBLIC_API_HOST` env var.

## Next extensions

- Send me the exact custom blocks you want and I can add them into the Studio schema.
- If you want, I can also add migration scripts for bulk backfilling `seo.*` across all existing blog documents.
