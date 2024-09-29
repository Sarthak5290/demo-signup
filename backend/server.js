const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Make sure to require cors
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require('./routes/adminRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express(); // Declare app before using it

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON request bodies

// Define routes
app.use("/api/users", userRoutes);
// app.use('/api/admin', adminRoutes);

// Set the port for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
