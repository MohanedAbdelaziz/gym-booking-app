// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Import the Navbar component

function Dashboard() {
  const [user, setUser] = useState(null); // لتخزين بيانات اليوزر
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token, // إرسال التوكن هنا
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data); // تخزين بيانات اليوزر
        } else {
          alert(data.message || "Error fetching user data");
        }
      } catch (err) {
        alert("Error fetching user data");
      } finally {
        setLoading(false); // إيقاف حالة التحميل
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <div>
      <Navbar /> {/* Add the Navbar component */}
      <div style={styles.dashboardContainer}>
        <h2 style={styles.heading}>Welcome, {user.name}</h2>
        <div style={styles.userInfo}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    padding: "20px",
    marginTop: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  userInfo: {
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "left",
  },
};

export default Dashboard;
