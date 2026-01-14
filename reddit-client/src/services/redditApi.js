const IS_PROD = import.meta.env.PROD;
const ALL_ORIGINS = "https://api.allorigins.win/get?url=";

export async function fetchJson(url) {
  let finalUrl = url;

  // ✅ Production → proxy through AllOrigins JSON API
  if (IS_PROD) {
    finalUrl = `${ALL_ORIGINS}${encodeURIComponent(url)}`;
  }

  const response = await fetch(finalUrl);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("RATE_LIMIT");
    }
    throw new Error("NETWORK_ERROR");
  }

  // ✅ Production: AllOrigins wraps response inside { contents }
  if (IS_PROD) {
    const wrapped = await response.json();

    try {
      return JSON.parse(wrapped.contents);
    } catch {
      throw new Error("INVALID_JSON");
    }
  }

  // ✅ Local dev: direct JSON
  return response.json();
}

export function buildRedditUrl({ category, searchTerm }) {
  // ✅ Local dev uses Vite proxy
  const base = IS_PROD
    ? `https://www.reddit.com/r/${category}`
    : `/api/r/${category}`;

  if (searchTerm) {
    return `${base}/search.json?q=${encodeURIComponent(
      searchTerm
    )}&restrict_sr=1&limit=25`;
  }

  return `${base}.json?limit=25`;
}

export function mapPosts(json) {
  return json.data.children.map((child) => {
    const data = child.data;

    const previewImage =
      data.preview?.images?.[0]?.source?.url?.replaceAll("&amp;", "&");

    const thumbnail =
      data.thumbnail?.startsWith("http") ? data.thumbnail : null;

    return {
      id: data.id,
      title: data.title,
      subreddit: data.subreddit,
      author: data.author,
      score: data.score,
      numComments: data.num_comments,
      image: previewImage || thumbnail,
      permalink: data.permalink,
    };
  });
}