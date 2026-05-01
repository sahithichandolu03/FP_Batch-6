const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config();

// Import DB connection
const connectDB = require("./config/database");

// Import routes
const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.send("API working");
});

// Global Error Handler (optional but good)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});