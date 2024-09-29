import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [direction, setDirection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsTransitioning(false);
    }, 50);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        adminSecret: isAdmin ? adminSecret : "",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      if (isAdmin && data.role !== "admin") {
        setErrorMessage("Incorrect admin secret password.");
        return;
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setErrorMessage(data.message || "Login failed. Please try again.");
    }
  };

  const handleSignupRedirect = () => {
    setDirection("left");
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/signup");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 to-blue-300 overflow-hidden">
      <div
        className={`w-full max-w-md bg-white p-8 rounded-lg shadow-md transition-transform duration-500 ${
          isTransitioning
            ? direction === "left"
              ? "-translate-x-full"
              : "translate-x-full"
            : "translate-x-0"
        }`}
      >
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Login
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="text-sm text-gray-700">Log in as admin</label>
          </div>

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin Secret Password
              </label>
              <input
                type="password"
                placeholder="Enter admin secret password"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={handleSignupRedirect}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
