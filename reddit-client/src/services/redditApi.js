export async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("RATE_LIMIT");
    }
    throw new Error("NETWORK_ERROR");
  }

  return response.json();
}

export function buildRedditUrl({ category, searchTerm }) {
  if (searchTerm) {
    return `/api/r/${category}/search.json?q=${encodeURIComponent(
      searchTerm
    )}&restrict_sr=1&limit=25`;
  }

  return `/api/r/${category}.json?limit=25`;
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