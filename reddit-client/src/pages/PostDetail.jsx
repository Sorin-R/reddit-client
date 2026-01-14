import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchJson } from "../services/redditApi";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setStatus("loading");

        // We don't know permalink yet — search post by ID
        const response = await fetchJson(`/api/comments/${id}.json`);
        const postData = response[0].data.children[0].data;
        const commentsData = response[1].data.children;

        setPost(postData);

        setComments(
          commentsData
            .filter((c) => c.kind === "t1")
            .map((c) => c.data)
        );

        setStatus("success");
      } catch (err) {
        console.error(err);
        setError("Failed to load post");
        setStatus("error");
      }
    }

    loadPost();
  }, [id]);

  if (status === "loading") {
    return <p>Loading post...</p>;
  }

  if (status === "error") {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>

      <h2>{post.title}</h2>
      <p>
        r/{post.subreddit} • 👍 {post.score}
      </p>

      {post.selftext && <ReactMarkdown>{post.selftext}</ReactMarkdown>}

      <hr />

      <h3>Comments</h3>

      {comments.map((comment) => (
        <div
          key={comment.id}
          style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}
        >
          <strong>{comment.author}</strong>
          <ReactMarkdown>{comment.body}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}