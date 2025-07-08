import { Link } from "react-router-dom";
import  "./Navbar.css"; // Assuming you have a CSS file for styling

export default function Navbar() {
  return (
    <nav>
        <Link className="navbar-brand" to="/">BlogApp</Link>
        <div className="navbar-links">
            <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link " to="/create">Create</Link>
      <Link className="nav-link" to="/login">Login</Link>
      <Link className="nav-link" to="/register">Register</Link>
      {/* <Link className="nav-link" to="/edit/1">Edit Blog</Link> */}
        </div>
    </nav>
     
    
  );
}