import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");

      // If no token or role is 'admin', redirect to the admin page
      if (!token) {
        navigate("/login");
        return;
      } else if (role === "admin") {
        navigate("/admin");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserName(data.name); // Assuming the response contains a "name" field
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("authToken"); // Clear token if fetching fails
        navigate("/login"); // Redirect to login on failure
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Remove the auth token and role from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Welcome {userName ? userName : "to the Home Page"}
        </h1>
        <button
          onClick={handleLogout}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
