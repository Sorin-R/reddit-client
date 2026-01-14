import { useEffect, useState } from "react";
import Header from "./components/Header";
import CategoryTabs from "./components/CategoryTabs";
import PostList from "./components/PostList";
import { categories } from "./data/categories";
import {
  fetchJson,
  buildRedditUrl,
  mapPosts,
} from "./services/redditApi";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");

  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const [cache, setCache] = useState({});

  const cacheKey = `${activeCategory}|${searchTerm}`;

  useEffect(() => {
    async function loadPosts() {
      // Use cache if available
      if (cache[cacheKey]) {
        setPosts(cache[cacheKey]);
        setStatus("success");
        return;
      }

      try {
        setStatus("loading");
        setError(null);

        const url = buildRedditUrl({
          category: activeCategory,
          searchTerm,
        });

        const json = await fetchJson(url);
        const mappedPosts = mapPosts(json);

        setPosts(mappedPosts);

        // Save successful result in cache
        setCache((prev) => ({
          ...prev,
          [cacheKey]: mappedPosts,
        }));

        setStatus("success");
      } catch (err) {
        console.error("Failed to load posts:", err);
        setStatus("error");
        setError(err.message);
      }
    }

    loadPosts();
  }, [activeCategory, searchTerm, cacheKey, cache]);

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div style={{ margin: "1rem 0" }}>
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {status === "loading" && <p>Loading posts...</p>}

      {status === "error" && (
        <div>
          <p>
            {error === "RATE_LIMIT"
              ? "Reddit is rate limiting requests. Please wait a moment and try again."
              : "Something went wrong while loading posts."}
          </p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {status === "success" && <PostList posts={posts} />}
    </div>
  );
}