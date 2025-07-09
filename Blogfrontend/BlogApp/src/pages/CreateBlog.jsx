import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css"; // Optional styling

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://blogapp-9jm4.onrender.com/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, author }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.warn("⚠️ No JSON body returned from backend.");
        data = {};
      }

      if (!response.ok) {
        alert("❌ Error creating blog: " + (data?.error || data?.message || "Unknown error"));
        return;
      }

      alert("✅ Blog created successfully!");
      navigate("/");
    } catch (error) {
      console.error("🚨 Network or server error while creating blog:", error);
      alert("An error occurred while creating the blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="CreateBlog">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
