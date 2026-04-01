import { useMemo } from "react";
import { set, unset, type ObjectInputProps, useFormValue } from "sanity";
import { Box, Card, Flex, Grid, Select, Stack, Text, TextArea, TextInput } from "@sanity/ui";
import { analyzeSeo, type PageDocument } from "../../lib/seoAnalysis";

type SeoValue = {
  title?: string;
  description?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  robots?: string;
  schemaType?: string;
};

const schemaOptions = ["Article", "FAQPage", "WebPage", "LocalBusiness", "MedicalOrganization"];
const robotsOptions = ["index,follow", "index,nofollow", "noindex,follow", "noindex,nofollow"];

function scoreTone(score: number) {
  if (score >= 80) return { tone: "positive" as const, label: "Excellent" };
  if (score >= 60) return { tone: "caution" as const, label: "Good" };
  return { tone: "critical" as const, label: "Needs work" };
}

function updatePatch(props: ObjectInputProps<SeoValue>, nextValue: SeoValue) {
  if (Object.values(nextValue).some(Boolean)) {
    props.onChange(set(nextValue));
  } else {
    props.onChange(unset());
  }
}

export function SeoInput(props: ObjectInputProps<SeoValue>) {
  const value = props.value || {};
  const fallbackDocument = (useFormValue([]) || {}) as PageDocument;

  const draftDocument = useMemo<PageDocument>(
    () => ({
      ...fallbackDocument,
      seo: {
        title: value.title,
        description: value.description,
        focusKeyword: value.focusKeyword,
        canonicalUrl: value.canonicalUrl,
        robots: value.robots,
        schemaType: value.schemaType,
        ogImage: fallbackDocument.seo?.ogImage || fallbackDocument.bannerImage || fallbackDocument.mainImage,
      },
    }),
    [fallbackDocument, value]
  );

  const report = useMemo(() => analyzeSeo(draftDocument), [draftDocument]);
  const seoTone = scoreTone(report.seoScore);
  const readabilityTone = scoreTone(report.readabilityScore);

  const patchField = (field: keyof SeoValue, fieldValue: string) => {
    updatePatch(props, { ...value, [field]: fieldValue || undefined });
  };

  const pageUrl =
    value.canonicalUrl ||
    `https://www.mbbsadmissionsinabroad.com/${fallbackDocument.slug?.current || ""}`;

  return (
    <Stack space={4}>
      <Grid columns={[1, 1, 2]} gap={4}>
        <Card padding={4} radius={3} shadow={1} tone={seoTone.tone}>
          <Stack space={3}>
            <Text size={1} muted>
              SEO score
            </Text>
            <Text size={4} weight="bold">
              {report.seoScore}/100
            </Text>
            <Text size={1}>{seoTone.label}</Text>
          </Stack>
        </Card>
        <Card padding={4} radius={3} shadow={1} tone={readabilityTone.tone}>
          <Stack space={3}>
            <Text size={1} muted>
              Readability
            </Text>
            <Text size={4} weight="bold">
              {report.readabilityScore}/100
            </Text>
            <Text size={1}>
              Flesch score {report.readingEase} • ~{report.readingTimeMinutes} min read
            </Text>
          </Stack>
        </Card>
      </Grid>

      <Card padding={4} radius={3} shadow={1} tone="transparent" border>
        <Stack space={3}>
          <Text size={2} weight="semibold">
            Search preview
          </Text>
          <Text size={1} style={{ color: "#1a0dab", fontWeight: 700 }}>
            {(report.serpTitle || fallbackDocument.title || "Untitled page").slice(0, 60)}
          </Text>
          <Text size={1} muted>
            {pageUrl}
          </Text>
          <Text size={1}>
            {(report.serpDescription || "Add a meta description to control what search users see.").slice(0, 160)}
          </Text>
          <Flex gap={3} wrap="wrap">
            <Text size={1} muted>
              Title: {(value.title || fallbackDocument.metaTitle || fallbackDocument.title || "").length}/60
            </Text>
            <Text size={1} muted>
              Description: {(value.description || fallbackDocument.metaDescription || "").length}/160
            </Text>
            <Text size={1} muted>
              Words: {report.wordCount}
            </Text>
          </Flex>
        </Stack>
      </Card>

      <Grid columns={[1, 1, 2]} gap={4}>
        <Stack space={3}>
          <Box>
            <Text size={1} weight="medium">
              SEO title
            </Text>
            <TextInput
              value={value.title || ""}
              onChange={(event) => patchField("title", event.currentTarget.value)}
            />
          </Box>
          <Box>
            <Text size={1} weight="medium">
              Meta description
            </Text>
            <TextArea
              rows={5}
              value={value.description || ""}
              onChange={(event) => patchField("description", event.currentTarget.value)}
            />
          </Box>
          <Box>
            <Text size={1} weight="medium">
              Focus keyword
            </Text>
            <TextInput
              value={value.focusKeyword || ""}
              onChange={(event) => patchField("focusKeyword", event.currentTarget.value)}
            />
          </Box>
        </Stack>

        <Stack space={3}>
          <Box>
            <Text size={1} weight="medium">
              Canonical URL
            </Text>
            <TextInput
              value={value.canonicalUrl || ""}
              onChange={(event) => patchField("canonicalUrl", event.currentTarget.value)}
            />
          </Box>
          <Box>
            <Text size={1} weight="medium">
              Robots
            </Text>
            <Select
              value={value.robots || "index,follow"}
              onChange={(event) => patchField("robots", event.currentTarget.value)}
            >
              {robotsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Box>
          <Box>
            <Text size={1} weight="medium">
              Schema type
            </Text>
            <Select
              value={value.schemaType || "Article"}
              onChange={(event) => patchField("schemaType", event.currentTarget.value)}
            >
              {schemaOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
      </Grid>

      <Card padding={4} radius={3} shadow={1} tone="transparent" border>
        <Stack space={3}>
          <Text size={2} weight="semibold">
            Optimization checks
          </Text>
          {report.checks.map((check) => (
            <Flex key={check.label} justify="space-between" gap={3}>
              <Stack space={1} flex={1}>
                <Text size={1} weight="medium">
                  {check.label}
                </Text>
                <Text size={1} muted>
                  {check.detail}
                </Text>
              </Stack>
              <Card
                padding={2}
                radius={2}
                tone={check.status === "pass" ? "positive" : check.status === "warn" ? "caution" : "critical"}
              >
                <Text size={1}>{check.status.toUpperCase()}</Text>
              </Card>
            </Flex>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}
