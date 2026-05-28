import { localBlogs } from "./localBlogs";

export async function getBlogData(id?: string, keywords?: string) {
  const query = encodeURIComponent(`*[ _type == "pages" && isBlog == true]`);
  try {
    const response = await fetch(
      "https://xz1irwuo.api.sanity.io/v2021-10-21/data/query/production?query=" +
        query
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
