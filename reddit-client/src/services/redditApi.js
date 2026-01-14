let controller = null;

export async function fetchJson(url) {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  const response = await fetch(url, {
    signal: controller.signal,
  });

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
    return `https://www.reddit.com/r/${category}/search.json?q=${encodeURIComponent(
      searchTerm
    )}&restrict_sr=1&limit=25`;
  }

  return `https://www.reddit.com/r/${category}.json?limit=25`;
}

export function mapPosts(json) {
  return json.data.children.map((child) => {
    const data = child.data;

    return {
      id: data.id,
      title: data.title,
      subreddit: data.subreddit,
      author: data.author,
      score: data.score,
      numComments: data.num_comments,
      thumbnail: data.thumbnail?.startsWith("http")
        ? data.thumbnail
        : null,
      permalink: data.permalink,
    };
  });
}