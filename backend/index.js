import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import bookRoute from "./routes/booksRoute.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from 'dotenv'


dotenv.config({
    path:'./.env'
})

const app = express();

// ✅ Middleware for parsing JSON
app.use(express.json());

app.use(
  cors({
    origin:"*", //✅ Allows both 3000 & 5173
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// ✅ Log to confirm routes are loaded
console.log("✅ User routes mounted at /user");

// ✅ Routes
app.use("/books", bookRoute);
app.use("/user", userRoutes); // Make sure userRoutes is correctly imported

// ✅ Connect to MongoDB with better error handling
const port = process.env.PORT || 3001

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process if DB connection fails
  });

// ✅ General route to test the server
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the MERN Stack Tutorial");
});

// ✅ Catch-all 404 Route
app.use((req, res) => {
  return res.status(404).json({ message: "❌ Route not found" });
});

// ✅ Global Error Handling Middleware (Better errors)
app.use((err, req, res, next) => {
  console.error("❌ Error: ", err.stack);
  return res.status(500).json({ message: err.message || "An unexpected error occurred" });
});
