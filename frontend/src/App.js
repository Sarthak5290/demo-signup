import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireAuth from "./components/RequireAuth"; // Import RequireAuth
import Admin from "./components/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequireAuth element={<Home />} />} />{" "}
        {/* Protect Home Page */}
        <Route
          path="/admin"
          element={<RequireAuth element={<Admin />} />}
        />{" "}
        {/* Protect Home Page */}
        <Route
          path="/signup"
          element={<ProtectedRoute element={<Signup />} />}
        />
        <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
      </Routes>
    </Router>
  );
};

export default App;
