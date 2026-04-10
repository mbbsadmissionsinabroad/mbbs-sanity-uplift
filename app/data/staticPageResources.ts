export type StaticSeoSection =
  | "mbbs-abroad"
  | "medical-pg"
  | "nursing-jobs"
  | "learn-german"
  | "ausbildung";

export type StaticSeoKind =
  | "mbbs-in"
  | "mbbs-admission"
  | "medical-pg"
  | "nursing"
  | "learn-german"
  | "ausbildung"
  | "other";

export type StaticSeoRegistryEntry = {
  route: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  section: StaticSeoSection;
  kind: StaticSeoKind;
};

export type ResourceLink = {
  label: string;
  href: string;
};

export const externalLinksBySection: Record<StaticSeoSection, ResourceLink[]> = {
  "mbbs-abroad": [
    { label: "NMC foreign medical graduate regulations", href: "https://www.nmc.org.in/MCIRest/open/getDocument?path=/Documents/Public/Portal/LatestNews/Foreign%20Medical%20Graduate%20Licentiate%20Regulations%202021.pdf" },
    { label: "World Directory of Medical Schools", href: "https://search.wdoms.org/" },
    { label: "NTA NEET information", href: "https://neet.nta.nic.in/" },
  ],
  "medical-pg": [
    { label: "Make it in Germany", href: "https://www.make-it-in-germany.com/en/" },
    { label: "German Medical Association", href: "https://www.bundesaerztekammer.de/" },
    { label: "NMC official website", href: "https://www.nmc.org.in/" },
  ],
  "nursing-jobs": [
    { label: "Make it in Germany for professionals", href: "https://www.make-it-in-germany.com/en/working-in-germany/professions-in-demand/nursing" },
    { label: "German Federal Employment Agency", href: "https://www.arbeitsagentur.de/en" },
    { label: "IELTS official website", href: "https://www.ielts.org/" },
  ],
  "learn-german": [
    { label: "Goethe-Institut", href: "https://www.goethe.de/en/index.html" },
    { label: "TestDaF", href: "https://www.testdaf.de/" },
    { label: "telc language tests", href: "https://www.telc.net/en/" },
  ],
  ausbildung: [
    { label: "Make it in Germany Ausbildung guide", href: "https://www.make-it-in-germany.com/en/study-vocational-training/training-in-germany" },
    { label: "German Federal Employment Agency", href: "https://www.arbeitsagentur.de/en" },
    { label: "German Missions in India", href: "https://india.diplo.de/in-en" },
  ],
};
