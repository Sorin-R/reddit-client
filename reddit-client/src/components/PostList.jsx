import PostCard from "./PostCard";

export default function PostList({ posts }) {
  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}