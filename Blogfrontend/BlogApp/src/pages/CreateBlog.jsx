import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css"; // Assuming you have a CSS file for styling
// const token = localStorage.getItem("token");



export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
const token = localStorage.getItem("token"); // or however you store it
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch("http://localhost:5000/api/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, author }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    
    alert("Error creating blog: " + (errorData.error || errorData.message));
    return;
  }
  const data = await response.json();
  console.log("Blog created successfully:", data);
  alert("Blog created successfully!");
  navigate("/");
   
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
        <button onClick={handleSubmit}>Create Blog</button>
      </form>
    </div>
  );
}