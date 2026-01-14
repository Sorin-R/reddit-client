import { useState } from "react";

const PLACEHOLDER =
  "https://via.placeholder.com/120x80?text=No+Image";

export default function PostCard({ post }) {
  const [imgError, setImgError] = useState(false);

  const showImage = post.image && !imgError;

  return (
    <article
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <img
        src={showImage ? post.image : PLACEHOLDER}
        alt=""
        width="120"
        height="80"
        onError={() => setImgError(true)}
        style={{
          objectFit: "cover",
          borderRadius: "4px",
          flexShrink: 0,
        }}
      />

      <div>
        <h3 style={{ margin: 0 }}>{post.title}</h3>
        <p style={{ margin: "0.25rem 0", color: "#6b7280" }}>
          r/{post.subreddit} • 👍 {post.score} • 💬 {post.numComments}
        </p>
      </div>
    </article>
  );
}