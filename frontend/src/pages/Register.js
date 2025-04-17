import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './Register.css';  // Import the CSS file for styling

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "client",  // Default value set to "client"
  });

  const navigate = useNavigate(); // Hook for navigating to different pages

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully!");
        navigate("/login");  // Redirect to login page after successful registration
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="input-field"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
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
            name="phone"
            type="tel"
            placeholder="Phone"
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
          <div>
            <label>Role</label>
            <select
              className="select-field"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
        {/* Button to navigate to Login page */}
        <button className="login-button" onClick={() => navigate("/login")}>
          Already have an account? Login here
        </button>
      </div>
    </div>
  );
}

export default Register;
