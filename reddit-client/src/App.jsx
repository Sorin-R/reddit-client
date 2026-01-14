import { useState } from "react";
import Header from "./components/Header";
import CategoryTabs from "./components/CategoryTabs";
import PostList from "./components/PostList";
import { mockPosts } from "./data/mockPosts";
import { categories } from "./data/categories";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "popular" || post.subreddit === activeCategory;

    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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

      <PostList posts={filteredPosts} />
    </div>
  );
}