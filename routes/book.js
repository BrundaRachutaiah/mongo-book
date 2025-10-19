const express = require('express');
const {
  createBook,
  getAllBooks,
  getBookByTitle,
  getBooksByAuthor,
  getBooksByGenre,
  getBooksByYear,
  updateBookRatingById,
  updateBookByTitle,
  deleteBook
} = require('../controllers/bookController');

const router = express.Router();

// Create a new book
router.post('/', createBook);

// Get all books
router.get('/', getAllBooks);

// Get a book by title
router.get('/title/:title', getBookByTitle);

// Get all books by an author
router.get('/author/:author', getBooksByAuthor);

// Get all books by genre
router.get('/genre/:genre', getBooksByGenre);

// Get all books by published year
router.get('/year/:year', getBooksByYear);

// Update a book's rating by ID
router.put('/:id/rating', updateBookRatingById);

// Update a book's details by title
router.put('/title/:title', updateBookByTitle);

// Delete a book by ID
router.delete('/:id', deleteBook);

module.exports = router;