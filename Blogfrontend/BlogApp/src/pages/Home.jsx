import { useState,useEffect } from "react";
import BlogCard from "../components/BlogCard";
import "./Home.css"; // Assuming you have a CSS file for styling



export default function Home() {
  const [blogs, setBlogs] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/api/blogs", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => setBlogs(data))
    .catch((error) => {
      console.error('Error fetching blogs:', error);
    });
}, []);
  

  return (
    <div className="home-container">
      {/* <h2>Home Page</h2> */}
      <div className="blog-list">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}


// Note: Ensure that the API endpoint and data structure match your backend implementation.
// The above code fetches the list of blogs from the backend and displays them using the Blog
// Card component. Adjust the API URL and data structure as needed based on your backend setup.
// Make sure to handle any errors that may occur during the fetch operation.
// You can also add loading states or error handling as needed for better user experience.
// This code assumes that you have a backend API running at `http://localhost:5000/api/blogs`
// that returns a list of blogs in JSON format. Adjust the URL and data structure as necessary
// based on your backend implementation.
// This code is a simple React component that fetches a list of blogs from a backend API
// and displays them using a `BlogCard` component. It uses the `useEffect` hook to fetch
// the data when the component mounts and stores the blogs in the `blogs` state variable.
// The `BlogCard` component is used to render each individual blog card.
// Make sure to adjust the API endpoint and data structure based on your backend implementation.
// You can also add error handling and loading states for better user experience.   
// This code is a simple React component that fetches a list of blogs from a backend API
// and displays them using a `BlogCard` component. It uses the `useEffect`
// hook to fetch the data when the component mounts and stores the blogs in the `blogs`
// state variable. The `BlogCard` component is used to render each individual blog card.  
// Make sure to adjust the API endpoint and data structure based on your backend implementation.
// You can also add error handling and loading states for better user experience.

