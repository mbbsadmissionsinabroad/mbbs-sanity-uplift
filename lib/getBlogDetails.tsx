interface BlogDetails {
  data: any;
  faq: any;
  youtubeEmbedRes: any;
  notFound: boolean;
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "xz1irwuo";
const directSanityApiHost = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/production?query=`;

function getQueryResult(payload: any) {
  if (Array.isArray(payload?.result)) return payload.result;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

async function fetchQuery(apiHost: string, query: string) {
  const response = await fetch(apiHost + query, {
    next: { revalidate: 60 },
  });
  const json = await response.json();
  return getQueryResult(json);
}

export async function getBlogDetails(routeURL: string): Promise<BlogDetails> {
  const preferredApiHost =
    process.env.NEXT_PUBLIC_API_HOST || directSanityApiHost;
  const query = encodeURIComponent(
    `*[ _type == "pages" && slug.current == "${routeURL}" ]`
  );
  let result = await fetchQuery(preferredApiHost, query);

  if (result.length === 0 && preferredApiHost !== directSanityApiHost) {
    result = await fetchQuery(directSanityApiHost, query);
  }

  const data = result[0];

  if (!data) {
    return {
      data: null,
      faq: null,
      youtubeEmbedRes: null,
      notFound: true,
    };
  }

  const faqId =
    data.hasOwnProperty("frequentlyAskedQuestion") &&
    data.frequentlyAskedQuestion.map((id: any) => "'" + id._ref + "'").join();
  const faqQuery = faqId
    ? encodeURIComponent(`*[_type == "faq" && _id in [${faqId}]]`)
    : "";
  const faq = faqQuery ? await fetchQuery(directSanityApiHost, faqQuery) : [];

  const youtubeId =
    data.hasOwnProperty("youtubeEmbedUrl") &&
    data.youtubeEmbedUrl.map((id: any) => "'" + id._ref + "'").join();
  const youtubeEmbedQuery = youtubeId
    ? encodeURIComponent(`*[_type == "youtubeEmbed" && _id in [${youtubeId}]]`)
    : "";
  const youtubeEmbedRes = youtubeEmbedQuery
    ? await fetchQuery(directSanityApiHost, youtubeEmbedQuery)
    : [];

  return {
    data,
    faq,
    youtubeEmbedRes,
    notFound: false,
  };
}
