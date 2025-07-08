import { useState,useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom";
import "./EditBlog.css"; // Assuming you have a CSS file for styling
export default function EditBlog() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const[title, setTitle] = useState("");
  const[content, setContent] = useState("");
  const[author, setAuthor] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      });
  }
  , [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ title, content, author }),
    });
    navigate(`/`); // Redirect to the blog details page after successful update
  };
  

 
  return(
    <div className="EditBlog">
      <h2>Edit Blog</h2>
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
        <button type="submit">Update Blog</button>
      </form>
    </div>
  )
}