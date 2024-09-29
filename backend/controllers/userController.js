const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  
  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({ name, email, password, role: "user" }); // Default role: "user"
  
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role), // Include role in token
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const loginUser = async (req, res) => {
  const { email, password, adminSecret } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Default role is 'user'
    let role = "user";

    // Check if admin secret matches
    if (adminSecret && adminSecret === process.env.ADMIN_SECRET_PASSWORD) {
      role = "admin"; // Assign admin role if secret is correct
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role, // Return the user's role
      token: generateToken(user._id, role), // Include role in token
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // Exclude password
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Send role in profile
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
