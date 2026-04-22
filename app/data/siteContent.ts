export type SiteLink = {
  title: string;
  href: string;
};

export type CountryLink = SiteLink & {
  flagCode: string;
};

export const mainNavLinks: SiteLink[] = [
  { title: "Home", href: "/" },
  { title: "Nursing Jobs Abroad", href: "/contact?interest=nursing-jobs-in-abroad" },
  { title: "PG Abroad", href: "/contact?interest=pg-in-abroad" },
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
    href: "/mbbs-in-belize",
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
    { title: "Nursing Jobs Abroad", href: "/contact?interest=nursing-jobs-in-abroad" },
    { title: "PG Abroad", href: "/contact?interest=pg-in-abroad" },
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
    name: "Nikita Lokande",
    university: "Hebei Medical University (China)",
    quote:
      "Thanks New-Lyf for helping me in choosing the Hebei Medical University to study Medicine. I feel happy here. I made friends with many other Indian medicos here.",
    image: "/students.jpeg",
  },
  {
    name: "Sidharth",
    university: "Manipal University (Malaysia)",
    quote:
      "I was not getting admission to my own country to study medicince, so I approached New-Lyf consultants. They told me about the Manipal University in Malaysia. I took no time to think again for i wanted to become a doctor.",
    image: "/student2.jpeg",
  },
  {
    name: "Ithiga",
    university: "Akaki Tsereteli State University (Georgia)",
    quote:
      "New-Lyf Consultants have given us a beautiful exposure to the Akaki Tsereteli State University. I'm really enjoying the immaculate ambiance and friendly people here in Georgia.",
    image: "/assests/who-are-we.jpeg",
  },
  {
    name: "Firoza",
    university: "University of Georgia (Georgia)",
    quote:
      "I had a dream to become a doctor and study abroad for that...both my dreams are being fulfilled by New-Lyf consultants. They were very helpful and I had no difficulty to reach my destination, I'm living my dream here in Georgia!!!",
    image: "/assests/who-are-we-2.jpeg",
  },
  {
    name: "Sam Rohith",
    university: "Manipal University (Malaysia)",
    quote:
      "New-Lyf consultants have given us a whole new exposure to studying abroad, otherwise in our city we had no clue we can go to study abroad. The best education consultants facilitated everything for us in Malaysia. Thanks u so much for your guidence...",
    image: "/students.jpeg",
  },
  {
    name: "Dr.Genuka",
    university: "PG Residency in Dusseldorf (Germany)",
    quote:
      "Studying in another country was a big concern for me and my parents, but New-Lyf consultants removed all our doubts by assuring us for safety and explained to us as to how much Germany.",
    image: "/student2.jpeg",
  },
  {
    name: "Dr.Aaditya",
    university: "PG Residency in Berlin (Germany)",
    quote:
      "Being a single child of my parents, it was really difficult for me to convince my parents to send me abroad. But after having talks with New-Lyf consultants my parents allowed me to study PG Residency in Germany.",
    image: "/assests/who-are-we.jpeg",
  },
  {
    name: "Atul Tiwari",
    university: "Nicolaus Copernicus University (Poland)",
    quote:
      "I am studying MBBS in Poland at Nicolaus Copernicus University. I was referred to Dr. Vineet of New Lyf Overseas by a doctor in India. I was very afraid of the admission processes. but, New Lyf overseas really made it so easy that it was like a dream. Finally I am here and happy. I wish New lyf team a very best future..",
    image: "/assests/who-are-we-2.jpeg",
  },
  {
    name: "Rajiv Ayappa Kandanda",
    university: "PG Residency in Koblenz in germany (Germany)",
    quote:
      "I've just begun my PG Residency program in Koblenz, and it's already clear that this experience is exceptional. The education I'm receiving is outstanding, and the experience has been truly memorable. I am confident that the skills and knowledge I'm acquiring here will lay a strong foundation for my future career. I wholeheartedly recommend this program to anyone looking for a premier residency experience in a beautiful and inspiring setting",
    image: "/students.jpeg",
  },
  {
    name: "Shefali Gautam",
    university: "PG Residency in Koblenz, Germany (Germany)",
    quote:
      "Having recently started my PG Residency program in Koblenz, I can already attest to the exceptional quality of education and the unforgettable experiences it offers. The program is providing me with invaluable skills and knowledge that I am confident will serve as a strong foundation for my future career. I wholeheartedly recommend this residency to anyone seeking a top-tier educational experience in a stunning and inspiring location.",
    image: "/student2.jpeg",
  },
  {
    name: "Pearl",
    university: "Ulyanovsk State Medical University (Russia)",
    quote:
      "Ulyanovsk State Medical University, I can confidently say that the quality of education here is exceptional. The professors are highly knowledgeable and approachable, making complex subjects easier to understand. The campus facilities are modern, and the library is well-stocked with the latest medical literature",
    image: "/assests/who-are-we.jpeg",
  },
  {
    name: "Ranjitha",
    university: "St.Martin's Hospital (Germany)",
    quote:
      "Thanks to New-Lyf, I have a fantasitc job where, I can work hours to suit my busy life. I have enjoyed working in many areas of the aged care and disability industry.",
    image: "/assests/who-are-we-2.jpeg",
  },
  {
    name: "Sarik Khan",
    university: "Yerevan State Medical University (Armenia)",
    quote:
      "New-Lyf not only guided me for admission but also helped me and my family throughout in visa processing in very minimal time. Their team helped us all the way round in.",
    image: "/students.jpeg",
  },
  {
    name: "Usha",
    university: "St.Anna Hospital (Germany)",
    quote:
      "My personal experience with New-Lyf has always been positive. They are professional, caring and considerate.",
    image: "/student2.jpeg",
  },
  {
    name: "Lavanya Reddy",
    university: "AMA School of Medicine (Philippines)",
    quote:
      "I am studying 1st year MBBS in Philippines. New Lyf overseas made my life easy in securing admission. I am very grateful. Guys trust me New lyf Overseas is the best for mbbs admission",
    image: "/assests/who-are-we.jpeg",
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
