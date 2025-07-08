import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Assuming you have a CSS file for styling

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Successful login
      alert("Login successful");
      console.log("Login successful:", data);
      console.log("User data:", data.user);
      console.log("JWT token:", data.token);
      // Save user data and token in localStorage or context
      localStorage.setItem("user", JSON.stringify(data.user)); // Save user data
      console.log("User saved to localStorage:", data.user);
      localStorage.setItem("userId", data.user._id); // Save user ID
      localStorage.setItem("token", data.token); // Save JWT token
      navigate("/");
    } else {
      alert(data.error || "Login failed");
    }
    console.log("Response status:", response.status);
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}