import { useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { Box, Card, Flex, Grid, Spinner, Stack, Text } from "@sanity/ui";
import { analyzeSeo, type PageDocument } from "../lib/seoAnalysis";

type BlogRow = PageDocument & {
  _id?: string;
  _updatedAt?: string;
  blogCategory?: string;
};

const dashboardQuery = `
  *[_type == "pages" && isBlog == true] | order(_updatedAt desc){
    _id,
    _updatedAt,
    title,
    blogCategory,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords,
    canonical,
    bannerImage,
    mainImage,
    seo,
    pageContent
  }
`;

function average(values: number[]) {
  if (!values.length) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function SeoDashboardTool() {
  const client = useClient({ apiVersion: "2024-10-01" });
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch<BlogRow[]>(dashboardQuery)
      .then((docs) => {
        if (!cancelled) {
          setBlogs(docs);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [client]);

  const reports = useMemo(
    () => blogs.map((blog) => ({ blog, report: analyzeSeo(blog) })),
    [blogs]
  );

  const weakPosts = reports.filter((item) => item.report.seoScore < 60);
  const avgSeo = average(reports.map((item) => item.report.seoScore));
  const avgReadability = average(reports.map((item) => item.report.readabilityScore));

  if (loading) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: "60vh" }}>
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Text size={4} weight="bold">
          SEO Command Center
        </Text>
        <Grid columns={[1, 1, 3]} gap={4}>
          <Card padding={4} radius={3} shadow={1} tone="primary">
            <Stack space={2}>
              <Text size={1}>Tracked blog posts</Text>
              <Text size={4} weight="bold">
                {reports.length}
              </Text>
            </Stack>
          </Card>
          <Card padding={4} radius={3} shadow={1} tone={avgSeo >= 70 ? "positive" : "caution"}>
            <Stack space={2}>
              <Text size={1}>Average SEO score</Text>
              <Text size={4} weight="bold">
                {avgSeo}/100
              </Text>
            </Stack>
          </Card>
          <Card padding={4} radius={3} shadow={1} tone={avgReadability >= 70 ? "positive" : "caution"}>
            <Stack space={2}>
              <Text size={1}>Average readability</Text>
              <Text size={4} weight="bold">
                {avgReadability}/100
              </Text>
            </Stack>
          </Card>
        </Grid>

        <Card padding={4} radius={3} shadow={1} tone={weakPosts.length ? "caution" : "positive"}>
          <Stack space={3}>
            <Text size={2} weight="semibold">
              Posts needing attention
            </Text>
            {weakPosts.length === 0 ? (
              <Text size={1}>All tracked blogs are currently above the warning threshold.</Text>
            ) : (
              weakPosts.slice(0, 12).map(({ blog, report }) => (
                <Flex key={blog._id} justify="space-between" gap={3}>
                  <Stack space={1} flex={1}>
                    <Text size={1} weight="medium">
                      {blog.title || "Untitled"}
                    </Text>
                    <Text size={1} muted>
                      {blog.blogCategory || "Uncategorized"} • {blog.slug?.current || "no-slug"}
                    </Text>
                  </Stack>
                  <Text size={1}>
                    SEO {report.seoScore}/100 • Readability {report.readabilityScore}/100
                  </Text>
                </Flex>
              ))
            )}
          </Stack>
        </Card>

        <Card padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            <Text size={2} weight="semibold">
              Fresh content health
            </Text>
            {reports.slice(0, 10).map(({ blog, report }) => (
              <Flex key={blog._id} justify="space-between" gap={3}>
                <Stack space={1} flex={1}>
                  <Text size={1} weight="medium">
                    {blog.title || "Untitled"}
                  </Text>
                  <Text size={1} muted>
                    Updated {blog._updatedAt ? new Date(blog._updatedAt).toLocaleDateString() : "unknown"}
                  </Text>
                </Stack>
                <Text size={1}>
                  SEO {report.seoScore}/100 • {report.wordCount} words
                </Text>
              </Flex>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
