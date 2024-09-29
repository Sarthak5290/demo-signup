import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("role");

      if (!token || role !== "admin") {
        navigate("/login");
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
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Welcome {userName ? userName : "to the Admin Page"} as Admin
        </h1>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
