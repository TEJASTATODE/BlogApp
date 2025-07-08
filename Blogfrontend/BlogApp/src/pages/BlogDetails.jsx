import { Link, useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BlogDetails.css"; // Assuming you have a CSS file for styling



export default function BlogDetails() {
  const { id } = useParams(); // blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://blogapp-9jm4.onrender.com/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Blog not found");
        }
        return res.json();
      })
      .then((data) => setBlog(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p>Loading blog...</p>;
  }
  if (error) return <p>Error: {error}</p>;
  const handleEdit = () => {
    // Navigate to the edit page with the blog ID
    navigate(`/edit/${id}`);
  };
  return (
    <div className="BlogDetails">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <small>Author: {blog.author}</small>
      <div className="update">
        <button onClick={handleEdit}>Edit Blog</button>
      </div>
      </div>

   

  );
}
