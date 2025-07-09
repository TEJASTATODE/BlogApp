import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css"; // Optional styling

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://blogapp-9jm4.onrender.com/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, author }),
      });

      const data = await response.json();

      if (response.status !== 200 && response.status !== 201) {
      alert("Error creating blog: " + (data?.error || data?.message || "Unknown error"));
      return;
    }

      alert("Blog created successfully!");
      // Delay navigation to ensure alert shows first
      
        navigate("/");
    } 

    catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred while creating the blog. Please try again.");
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
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
