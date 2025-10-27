const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db.connect");
const bookRoutes = require("./routes/book.routes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/books", bookRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Book API!");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));