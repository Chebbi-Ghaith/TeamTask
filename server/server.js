const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: __dirname + "/.env" });

const connectDB = require("./config/db.js");

// Route files
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

//connect to db
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  })
);

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "TeamTask API is running!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
