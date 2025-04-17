import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './Login.css';  // Import the CSS file for styling

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Hook for navigating to different pages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/"); // Redirect to home page or dashboard
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="input-field"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className="submit-button" type="submit">
            Login
          </button>
        </form>
        <button className="register-button" onClick={() => navigate("/register")}>
          Don't have an account? Register here
        </button>
      </div>
    </div>
  );
}

export default Login;
