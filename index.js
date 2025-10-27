const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/db.connect");
const Book = require("./models/book.model");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB(process.env.MONGO_URI);

// 1️⃣ Create a new book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: "Error creating book", error: error.message });
  }
});

// 2️⃣ Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// 3️⃣ Get a book by title
app.get("/books/title/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

// 4️⃣ Get books by author
app.get("/books/author/:author", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    if (books.length === 0) return res.status(404).json({ message: "No books found for this author" });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books by author", error: error.message });
  }
});

// 5️⃣ Get all books with "Business" genre
app.get("/books/genre/business", async (req, res) => {
  try {
    const books = await Book.find({ genre: "Business" });
    if (books.length === 0) return res.status(404).json({ message: "No Business books found" });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Business books", error: error.message });
  }
});

// 6️⃣ Get books released in 2012
app.get("/books/year/2012", async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: 2012 });
    if (books.length === 0) return res.status(404).json({ message: "No books found from 2012" });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching 2012 books", error: error.message });
  }
});

// 7️⃣ Update book rating by ID
app.put("/books/:id/rating", async (req, res) => {
  try {
    const { rating } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ message: "Book does not exist" });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: "Error updating rating", error: error.message });
  }
});

// 8️⃣ Update book details by title (using findOneAndUpdate)
app.put("/books/title/:title", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ message: "Book does not exist" });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: "Error updating book by title", error: error.message });
  }
});

// 9️⃣ Delete a book by ID
app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("📚 Welcome to the Books API");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));