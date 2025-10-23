const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db.connect');
const bookController = require('./controllers/bookController');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Routes ---

// @desc    Create a new book
// @route   POST /api/books
app.post('/api/books', bookController.createBook);

// @desc    Get all books
// @route   GET /api/books
app.get('/api/books', bookController.getAllBooks);

// @desc    Get a book by title
// @route   GET /api/books/title/:title
app.get('/api/books/title/:title', bookController.getBookByTitle);

// @desc    Get all books by an author
// @route   GET /api/books/author/:author
app.get('/api/books/author/:author', bookController.getBooksByAuthor);

// @desc    Get all books by genre
// @route   GET /api/books/genre/:genre
app.get('/api/books/genre/:genre', bookController.getBooksByGenre);

// @desc    Get all books by published year
// @route   GET /api/books/year/:year
app.get('/api/books/year/:year', bookController.getBooksByYear);

// @desc    Update a book's rating by ID
// @route   PUT /api/books/:id/rating
app.put('/api/books/:id/rating', bookController.updateBookRatingById);

// @desc    Update a book's details by title
// @route   PUT /api/books/title/:title
app.put('/api/books/title/:title', bookController.updateBookByTitle);

// @desc    Delete a book by ID
// @route   DELETE /api/books/:id
app.delete('/api/books/:id', bookController.deleteBook);

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

// --- Error Handling ---

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// --- Server Start ---

// Only start server if not in a production environment like Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
}

// Export app for Vercel
module.exports = app;