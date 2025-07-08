import { Link,useNavigate } from "react-router-dom";
import  "./BlogCard.css"; // Assuming you have a CSS file for styling



export default function BlogCard({ blog }) {
  

 
  return (
    <div className="blog-card">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>Author: {blog.author}</p>
      <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>
      
    </div>
  );
}