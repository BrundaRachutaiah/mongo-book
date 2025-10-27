const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");

// ✅ Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// ✅ Get book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

// ✅ Create a new book
router.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ message: "Book added successfully", newBook });
  } catch (error) {
    res.status(400).json({ message: "Error adding book", error: error.message });
  }
});

// ✅ Update book by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error: error.message });
  }
});

// ✅ Delete book by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
});

module.exports = router;
