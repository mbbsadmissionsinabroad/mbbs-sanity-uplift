const redirectTargets: Record<string, string> = {
  "/fee-of-mbbs-in-russia-from-mci-approved-universities-for-2024-admission":
    "/mbbs-in-russia",
  "/list-of-nmc-approved-medical-universities-in-kazakhstan":
    "/mbbs-in-kazakhstan",
  "/russia-temperature": "/mbbs-in-russia",
};

const notFoundSlugs = new Set<string>([
  "/final-blog-newlife-shibi-2-50-5",
]);

export const offTopicIndianCollegeSlugs: string[] = [
  "/2024-mbbs-fee-structure-in-india-and-abroad",
  "/best-medical-colleges-in-tamil-nadu",
  "/lady-hardinge-medical-college",
  "/list-of-mbbs-colleges-in-delhi",
  "/list-of-mci-approved-colleges-in-india",
  "/list-of-medical-colleges-in-gujarat",
  "/list-of-medical-colleges-in-kerala",
  "/list-of-medical-colleges-in-maharashtra",
  "/list-of-medical-colleges-in-madhya-pradesh",
  "/list-of-medical-colleges-in-rajasthan",
  "/list-of-medical-colleges-in-uttar-pradesh",
  "/list-of-medical-colleges-mysore",
  "/medical-colleges-in-karnataka",
  "/top-10-medical-colleges-in-india",
  "/top-10-medical-colleges-in-tamilnadu-for-mbbs-admission",
];

// ============================================================
// TIER 2 — Dead blog posts (0 clicks, <100 impressions in GSC)
// Source: GSC Performance export May 5 2026
// Action: noindex,follow — remove from sitemap and blog index
// ============================================================
export const deadBlogSlugs: string[] = [
  "/complete-list-of-mbbs-courses-abroad-with-fee-structure-2026-country-wise-tuition-hidden-costs-career-roi-for-indian-students",
  "/mbbs-in-bangladesh-2026-closest-cheapest-and-most-familiar-the-complete-strategic-guide-for-indian-students",
  "/katowice-medical-university-poland",
  "/mbbs-in-abroad-2026-27-the-complete-strategic-guide-for",
  "/are-there-any-disadvantages-to-studying-in-russia-15-brutal-truths-every-international-student-must-know-in-2026",
  "/1500-indian-mbbs-students-stranded-iran",
  "/mbbs-admission-in-belize",
  "/radiology-courses",
  "/first-moscow-state-medical-university-sechenov-university-2025-26-the-complete-academic-financial-admission-guide-for-indian-medical-aspirants",
  "/list-of-mbbs-courses-abroad-with-fee-structure-2026",
  "/how-to-apply-for-mbbs-abroad-in-2026-the-exact-9-step-process-complete-document-checklist-and-scam-proof-verification-guide-for-indian-students",
  "/neet-pg-2026-date-august-30-officially-confirmed-by-nbems-next-deferred-section-locking-survival-guide-internship-deadline-complete-month-by-month-preparation-roadmap",
  "/mbbs-in-finland-in-2026-a-professional-reality-based-guide-for-international-and-indian-students",
  "/what-can-you-do-about-study-mbbs-abroad-right-now",
  "/russia-vs-georgia-vs-kazakhstan-which-is-the-best-country-for-mbbs-for-indian-students-in-2026",
  "/syktyvkar-state-university",
  "/mbbs-abroad-2026-top-universities-complete-fees-structure-nmc-compliance-and-the-strategic-selection-framework-indian-families-actually-need",
  "/rupees-to-rubles-the-complete-mbbs-russia-living-expenses-guide-for-indian-students-and-parents-in-2026",
  "/mbbs-abroad-top-nmc-compliant-universities-in-2026-the-verified-selection-guide-for-indian-students",
  "/mbbs-admission-philippines-davao-medical-school",
  "/government-medical-colleges-in-delhi-2026-seats-fees-cut-offs-bonds-and-strategic-guidance",
  "/medical-entrance-exam-neet-2020-preparation",
  "/mbbs-abroad-for-indian-students-in-2026-complete-guide-to-nmc-compliance-real-fees-top-countries-next-exam-strategy-career-roadmap",
  "/is-russia-safe-for-mbbs-in-2026-honest-professional-verdict-73-9-complaints-per-10-000-indian-students-highest-globally-february-7-2026-bsmu-stabbing-4-indian-students-one-critical-mea-200-complaints-57-of-global-diplomatic-divergence-indian-embassy-no-security-reasons-vs-us-australia-do-not-travel-document-signature-trap-over-enrollment-expulsion-risk-digital-surveillance-banking-grey-market-fraud-5-layer-safety-protocol-and-how-newlife-overseas-delivers-risk-mitigated-university-selection-and-student-safety-advisory-for-neet-2026-aspirants",
  "/kemerovo-state-medical-college",
  "/thomas-jefferson-university",
  "/mbbs-abroad-in-english-medium-universities-2026-the-definitive-nmc-compliant-guide-for-indian-medical-aspirants",
  "/geomedi-medical-university",
  "/how-to-plan-for-ukraine-mbbs-transfer-to-kazakhstan",
  "/mbbs-in-azerbaijian",
  "/mbbs-fees-in-russia-2026-the-complete-year-wise-cost-breakdown-tuition-hidden-charges-city-wise-living-costs-and-the-roi-analysis-that-changes-how-indian-families-plan-this-investment",
  "/medical-university-transfers-from-ukraine-to-philippines",
  "/moscow-state-medical-university",
  "/ryazan-state-medical-university",
  "/petrozavodsk-state-university",
  "/karaganda-medical-university-your-gateway-to-success-in-the-medical-field",
  "/fergana-institute-of-state-medical-health",
  "/semey-state-medical-university-of-kazakhstan",
  "/iisa-2023",
  "/neet-chemistry-syllabus-2026-complete-official-professional-guide-physical-inorganic-and-organic-all-3-sections-mapped-nmc-confirmed-deleted-chapters-chapter-wise-weightage-table-ncert-bible-strategy-air-topper-3-branch-cognitive-method-volatility-index-60-day-study-plan-and-newlife-overseas-complete-score-to-seat-advisory",
  "/how-do-choose-an-indian-nursing-recruitment-agency-for-abroad",
  "/batumi-shota-rustaveli-state-university",
  "/university-of-georgia",
  "/ulyanovsk-state-medical-university-usmu",
  "/comprehensive-guide-to-medical-education-in-russia",
  "/ivane-javakhishvili-tbilisi-state-university",
];

// ============================================================
// TIER 3 — Low-impression slugs (0 clicks, 100–500 impressions)
// Action: noindex,follow — safe to suppress
// ============================================================
export const lowBlogSlugs: string[] = [
  "/2024-mbbs-fee-in-philippines-for-indian-students",
  "/how-can-i-study-mbbs-in-germany",
  "/mbbs-admission-philippines-ama-school-of-medicine",
  "/mbbs-in-abroad-under-15-lakhs",
  "/calicut-university",
  "/far-eastern-federal-university",
  "/volgograd-state-medical-university",
  "/yerevan-state-medical-university-in-armenia",
  "/top-medical-universities-russia",
  "/jahurul-islam-medical-college",
  "/lomonosov-moscow-state-university",
  "/irkutsk-state-medical-university",
  "/medical-university-transfers-from-ukraine-to-germany",
  "/pursuing-mbbs-abroad",
  "/asian-medical-institute-kyrgyzstan-in-2025",
  "/moscow-state-university",
  "/top-10-mbbs-colleges-in-ukraine-for-2024-admission",
  "/samarkand-state-medical-institute",
  "/kyrgyz-russian-slavic",
  "/uv-gullas-college-of-medicine-in-philippines",
  "/dagestan-state-medical-university",
  "/saratov-state-university",
  "/pirogov-russian-national-research-medical-university",
  "/nizhny-novgorod-state-medical-university",
  "/jalal-abad-state-university",
  "/saint-louis-university",
  "/top-russian-medical-universities-for-indian-students",
  "/rostov-state-medical-university",
  "/novosibirsk-state-medical-university",
  "/top-mbbs-college-in-india",
  "/tbilisi-state-medical-university",
];

function normalizeSlugPath(slug: string) {
  if (!slug) {
    return "/";
  }

  const normalized = slug.startsWith("/") ? slug : `/${slug}`;
  return normalized.replace(/\/+$/, "") || "/";
}

export function getContentCleanupRedirect(slug: string) {
  return redirectTargets[normalizeSlugPath(slug)] ?? null;
}

export function shouldReturnNotFoundForSlug(slug: string) {
  return notFoundSlugs.has(normalizeSlugPath(slug));
}

export function isNoIndexSlug(slug: string): boolean {
  const normalized = normalizeSlugPath(slug);
  return (
    offTopicIndianCollegeSlugs.includes(normalized) ||
    deadBlogSlugs.includes(normalized) ||
    lowBlogSlugs.includes(normalized)
  );
}

export function shouldNoindexBlogSlug(slug: string) {
  return isNoIndexSlug(slug);
}

export function shouldExposeBlogSlug(slug: string) {
  const normalized = normalizeSlugPath(slug);

  return (
    !shouldReturnNotFoundForSlug(normalized) &&
    !getContentCleanupRedirect(normalized) &&
    !isNoIndexSlug(normalized)
  );
}
