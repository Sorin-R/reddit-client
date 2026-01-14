export default function PostCard({ post }) {
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
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt=""
          width="120"
          height="80"
          style={{ objectFit: "cover", borderRadius: "4px" }}
        />
      )}

      <div>
        <h3 style={{ margin: 0 }}>{post.title}</h3>
        <p style={{ margin: "0.25rem 0", color: "#6b7280" }}>
          r/{post.subreddit} • 👍 {post.score} • 💬 {post.numComments}
        </p>
      </div>
    </article>
  );
}