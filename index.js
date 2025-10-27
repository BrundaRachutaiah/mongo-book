const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookByTitle,
  getBooksByAuthor,
  getBooksByGenre,
  getBooksByYear,
  updateBookRatingById,
  updateBookByTitle,
  deleteBook,
} = require("../controllers/bookController");

// 1️⃣ Create a new book
router.post("/", createBook);

// 2️⃣ Get all books
router.get("/", getAllBooks);

// 3️⃣ Get a book by title
router.get("/title/:title", getBookByTitle);

// 4️⃣ Get all books by author
router.get("/author/:author", getBooksByAuthor);

// 5️⃣ Get all books by genre
router.get("/genre/:genre", getBooksByGenre);

// 6️⃣ Get all books by year
router.get("/year/:year", getBooksByYear);

// 7️⃣ Update rating by ID
router.put("/:id/rating", updateBookRatingById);

// 8️⃣ Update details by title
router.put("/title/:title", updateBookByTitle);

// 9️⃣ Delete book by ID
router.delete("/:id", deleteBook);

module.exports = router;