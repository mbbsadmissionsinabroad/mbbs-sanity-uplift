import { localBlogs } from "./localBlogs";

const FETCH_TIMEOUT_MS = 4500;

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getBlogData(id?: string, keywords?: string) {
  const query = encodeURIComponent(`*[ _type == "pages" && isBlog == true]`);
  try {
    const response = await fetchWithTimeout(
      "https://xz1irwuo.api.sanity.io/v2021-10-21/data/query/production?query=" +
        query,
      { next: { revalidate: 3600 } }
    );
    const fetchedData = await response.json();
    const remoteBlogs = Array.isArray(fetchedData?.result)
      ? fetchedData.result
      : [];

    return {
      ...fetchedData,
      result: [...localBlogs, ...remoteBlogs],
    };
  } catch (error) {
    console.error("Failed to fetch remote blog data", error);
    return {
      result: localBlogs,
    };
  }
}
