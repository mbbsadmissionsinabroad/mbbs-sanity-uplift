export type SiteLink = {
  title: string;
  href: string;
};

export type CountryLink = SiteLink & {
  flagCode: string;
};

export const mainNavLinks: SiteLink[] = [
  { title: "Home", href: "/" },
  { title: "Nursing Jobs in Abroad", href: "/contact?interest=nursing-jobs-in-abroad" },
  { title: "PG in Abroad", href: "/contact?interest=pg-in-abroad" },
  { title: "Ausbildung", href: "/ausbildung" },
  { title: "Learn German", href: "/learn-german-language-course-in-bangalore" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

export const mbbsAbroadCountries: CountryLink[] = [
  {
    title: "Armenia",
    href: "/mbbs-in-armenia",
    flagCode: "AM",
  },
  {
    title: "Bosnia",
    href: "/mbbs-in-bosnia",
    flagCode: "BA",
  },
  {
    title: "Georgia",
    href: "/mbbs-in-georgia",
    flagCode: "GE",
  },
  {
    title: "Austria",
    href: "/mbbs-admission-in-austria-for-indian-students",
    flagCode: "AT",
  },
  {
    title: "Azerbaijan",
    href: "/mbbs-in-azerbaijan",
    flagCode: "AZ",
  },
  {
    title: "Bangladesh",
    href: "/mbbs-admission-in-bangladesh-for-indian-students",
    flagCode: "BD",
  },
  {
    title: "Belarus",
    href: "/mbbs-in-belarus-for-indian-students",
    flagCode: "BY",
  },
  {
    title: "Belize",
    href: "/mbbs-admission-in-belize",
    flagCode: "BZ",
  },
  {
    title: "Bulgaria",
      href: "/mbbs-admission-in-bulgaria-for-indian-students",
    flagCode: "BG",
  },
  {
    title: "Denmark",
    href: "/mbbs-admission-in-denmark-for-indian-students",
    flagCode: "DK",
  },
  {
    title: "France",
    href: "/mbbs-in-france",
    flagCode: "FR",
  },
  {
    title: "Finland",
        href: "/mbbs-admission-in-finland-from-mci-approved-universities",
    flagCode: "FI",
  },
  {
    title: "Germany",
    href: "/mbbs-admission-in-germany-for-indian-students",
    flagCode: "DE",
  },
  {
    title: "Europe",
    href: "/mbbs-admission-in-europe-from-mci-approved-university",
    flagCode: "EU",
  },
  {
    title: "Hungary",
    href: "/mbbs-in-hungary",
    flagCode: "HU",
  },
  {
    title: "Italy",
    href: "/mbbs-in-italy",
    flagCode: "IT",
  },
  {
    title: "Ireland",
    href: "/mbbs-in-ireland-for-indian-students",
    flagCode: "IE",
  },
  {
    title: "Kazakhstan",
    href: "/mbbs-in-kazakhstan",
    flagCode: "KZ",
  },
  {
    title: "Kyrgyzstan",
    href: "/mbbs-in-kyrgyzstan",
    flagCode: "KG",
  },
  {
    title: "Russia",
    href: "/mbbs-in-russia",
    flagCode: "RU",
  },
  {
    title: "Krasnoyarsk State Medical University Russia",
    href: "/krasnoyarsk-state-medical-university-russia",
    flagCode: "RU",
  },
  {
    title: "Malaysia",
    href: "/mbbs-admission-in-malaysia-for-indian-students",
    flagCode: "MY",
  },
  {
    title: "Netherlands",
    href: "/mbbs-admission-in-netherlands-for-indian-students",
    flagCode: "NL",
  },
  {
    title: "Romania",
        href: "/mbbs-admission-in-romania-for-indian-students",
    flagCode: "RO",
  },
  {
    title: "Philippines",
    href: "/mbbs-in-philippines",
    flagCode: "PH",
  },
  {
    title: "Lithuania",
    href: "/mbbs-admission-in-lithuania",
    flagCode: "LT",
  },
  {
    title: "Sweden",
    href: "/mbbs-admission-in-sweden-for-indian-students",
    flagCode: "SE",
  },
  {
    title: "Spain",
        href: "/mbbs-admission-in-spain-for-indian-students",
    flagCode: "ES",
  },
  {
    title: "Norway",
    href: "/mbbs-admission-in-norway-for-indian-students",
    flagCode: "NO",
  },
  {
    title: "Nepal",
    href: "/mbbs-admission-in-nepal-for-indian-students",
    flagCode: "NP",
  },
  {
    title: "Poland",
    href: "/mbbs-admission-in-poland-for-indian-students",
    flagCode: "PL",
  },
  {
    title: "Uzbekistan",
        href: "/mbbs-in-uzbekistan",
    flagCode: "UZ",
  },
  {
    title: "MBBS IN INDIA",
    href: "/mbbs-in-india",
    flagCode: "IN",
  },
  {
    title: "Vietnam",
    href: "/mbbs-in-vietnam",
    flagCode: "VN",
  },
];

export const nursingJobCountries: CountryLink[] = [
  {
    title: "Canada",
    href: "/nursing-jobs-in-canada",
    flagCode: "CA",
  },
  {
    title: "Denmark",
    href: "/nursing-jobs-in-denmark",
    flagCode: "DK",
  },
  {
    title: "Germany",
        href: "/nursing-job-in-germany",
    flagCode: "DE",
  },
  {
    title: "Lithuania",
    href: "/nursing-jobs-in-lithuania",
    flagCode: "LT",
  },
  {
    title: "Netherlands",
    href: "/nursing-jobs-in-netherlands",
    flagCode: "NL",
  },
];

export const pgAbroadCountries: CountryLink[] = [
  {
    title: "Germany",
    href: "/medical-pg-in-germany",
    flagCode: "DE",
  },
  {
    title: "Europe",
        href: "/medical-pg-in-europe-for-indian-students",
    flagCode: "EU",
  },
  {
    title: "United Kingdom Medical Licensing Assessment (UKMLA)",
    href: "/united-kingdom-medical-licensing-assessment-ukmla",
    flagCode: "GB",
  },
];

export const footerLinkColumns: SiteLink[][] = [
  [
    { title: "MBBS in Russia", href: "/mbbs-in-russia" },
    { title: "MBBS in Bosnia", href: "/mbbs-in-bosnia" },
    { title: "MBBS in Georgia", href: "/mbbs-in-georgia" },
    { title: "MBBS in Armenia", href: "/mbbs-in-armenia" },
  ],
  [
    { title: "MBBS in Kyrgyzstan", href: "/mbbs-in-kyrgyzstan" },
    { title: "MBBS in Uzbekistan", href: "/mbbs-in-uzbekistan" },
    { title: "MBBS in Kazakhstan", href: "/mbbs-in-kazakhstan" },
    { title: "MBBS in Italy", href: "/mbbs-in-italy" },
  ],
  [
    { title: "MBBS in Germany", href: "/mbbs-admission-in-germany-for-indian-students" },
    { title: "MBBS in Ireland", href: "/mbbs-in-ireland-for-indian-students" },
    { title: "MBBS in Sweden", href: "/mbbs-admission-in-sweden-for-indian-students" },
    { title: "MBBS in Poland", href: "/mbbs-admission-in-poland-for-indian-students" },
    { title: "MBBS in Spain", href: "/mbbs-admission-in-spain-for-indian-students" },
    { title: "MBBS in Malaysia", href: "/mbbs-admission-in-malaysia-for-indian-students" },
  ],
  [
    { title: "Nursing Jobs in Abroad", href: "/contact?interest=nursing-jobs-in-abroad" },
    { title: "PG in Abroad", href: "/contact?interest=pg-in-abroad" },
    { title: "Ausbildung", href: "/ausbildung" },
    { title: "Contact Us", href: "/contact" },
  ],
];

export const homeHeroHighlights = [
  "Code-first admissions pages without Sanity",
  "Country-specific MBBS guides for Indian students",
  "Direct contact via WhatsApp and IVR from every key page",
];

export const studentTestimonials = [
  {
    name: "Ritika Sharma",
    university: "Yerevan State Medical University, Armenia",
    quote:
      "The admissions process was clear, fast, and well-guided. The team helped me understand the fees, documents, and visa steps before I left India.",
    image: "/students.jpeg",
  },
  {
    name: "Aman Gupta",
    university: "University of Sarajevo, Bosnia",
    quote:
      "We compared Bosnia, Armenia, and Georgia, and the counseling helped us pick the right fit. The support was practical and honest from day one.",
    image: "/student2.jpeg",
  },
  {
    name: "Neha Verma",
    university: "University of Traditional Medicine, Armenia",
    quote:
      "The new pages feel much easier to read on mobile, and the enquiry form made it simple to reach out without searching around the site.",
    image: "/assests/who-are-we.jpeg",
  },
  {
    name: "Karan Mehta",
    university: "Banja Luka Medical Faculty, Bosnia",
    quote:
      "The site now feels clean and direct. I could go from country overview to contact in a few clicks, which made the whole experience smoother.",
    image: "/assests/who-are-we-2.jpeg",
  },
];

export const galleryImages = [
  {
    src: "/assests/home-page-banner-1.png",
    alt: "MBBS abroad home banner with counselling desk",
    title: "Guided admissions support",
  },
  {
    src: "/assests/home-page-banner-2.png",
    alt: "MBBS abroad banner showing student support",
    title: "Student-first counseling",
  },
  {
    src: "/students.jpeg",
    alt: "Indian students discussing MBBS abroad",
    title: "Indian student journey",
  },
  {
    src: "/student2.jpeg",
    alt: "Students preparing for MBBS abroad consultation",
    title: "Admission consultation",
  },
  {
    src: "/assests/who-are-we.jpeg",
    alt: "MBBS study abroad assistance team",
    title: "Support team",
  },
  {
    src: "/assests/who-are-we-2.jpeg",
    alt: "Study abroad guidance and counseling team",
    title: "Guidance and visa help",
  },
];
