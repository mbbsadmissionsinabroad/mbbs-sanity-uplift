import type { DocumentActionComponent } from "sanity";
import { analyzeSeo, type PageDocument } from "../lib/seoAnalysis";

export const PublishWithSeoValidation: DocumentActionComponent = (props) => {
  if (props.type !== "pages") return null;

  const document = (props.draft || props.published || {}) as PageDocument & { isBlog?: boolean };
  if (!document.isBlog) return null;

  const report = analyzeSeo(document);
  const hasBlockingIssue =
    report.seoScore < 60 ||
    report.readabilityScore < 45 ||
    report.checks.some((check) => check.status === "fail");

  return {
    label: hasBlockingIssue ? "Publish with SEO review" : "Publish",
    tone: hasBlockingIssue ? "caution" : "positive",
    disabled: false,
    title: hasBlockingIssue
      ? `SEO ${report.seoScore}/100, readability ${report.readabilityScore}/100`
      : "Ready to publish",
    onHandle: async () => {
      props.onComplete();
    },
  };
};
