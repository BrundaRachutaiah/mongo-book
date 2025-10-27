const Book = require("../models/book.model");

// 1️⃣ Create a new book
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ success: true, message: "Book added successfully", data: newBook });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2️⃣ Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3️⃣ Get a book by title
exports.getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4️⃣ Get all books by an author
exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    if (books.length === 0) return res.status(404).json({ success: false, message: "No books found for this author" });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5️⃣ Get all books of "Business" genre
exports.getBooksByGenre = async (req, res) => {
  try {
    const books = await Book.find({ genre: req.params.genre });
    if (books.length === 0) return res.status(404).json({ success: false, message: "No books found for this genre" });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6️⃣ Get all books published in a given year
exports.getBooksByYear = async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: req.params.year });
    if (books.length === 0) return res.status(404).json({ success: false, message: "No books found for this year" });
    res.status(200).json({ success: true, count: books.length, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7️⃣ Update a book’s rating by ID
exports.updateBookRatingById = async (req, res) => {
  try {
    const { rating } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, { rating }, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: "Book does not exist" });
    res.status(200).json({ success: true, message: "Book rating updated successfully", data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 8️⃣ Update book details by title
exports.updateBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ title: req.params.title }, req.body, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ success: false, message: "Book does not exist" });
    res.status(200).json({ success: true, message: "Book updated successfully", data: book });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 9️⃣ Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.status(200).json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
