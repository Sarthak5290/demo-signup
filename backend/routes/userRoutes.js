const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUserProfile);
router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

module.exports = router;
