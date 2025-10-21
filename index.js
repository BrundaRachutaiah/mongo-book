const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db/db.connect');
const Book = require('./models/book.model');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// @desc    Create a new book
// @route   POST /api/books
app.post('/api/books', async (req, res) => {
  try {
    console.log('Creating book with data:', req.body);
    const book = await Book.create(req.body);
    console.log('Book created successfully:', book);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Get all books
// @route   GET /api/books
app.get('/api/books', async (req, res) => {
  try {
    console.log('Fetching all books');
    const books = await Book.find();
    console.log(`Found ${books.length} books`);
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Get a book by title
// @route   GET /api/books/title/:title
app.get('/api/books/title/:title', async (req, res) => {
  try {
    console.log(`Fetching book with title: ${req.params.title}`);
    const book = await Book.findOne({ title: req.params.title });
    
    if (!book) {
      console.log('Book not found');
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    console.log('Book found:', book);
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('Error fetching book by title:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Get all books by an author
// @route   GET /api/books/author/:author
app.get('/api/books/author/:author', async (req, res) => {
  try {
    console.log(`Fetching books by author: ${req.params.author}`);
    const books = await Book.find({ author: req.params.author });
    
    if (books.length === 0) {
      console.log('No books found for this author');
      return res.status(404).json({
        success: false,
        message: 'No books found for this author',
      });
    }
    
    console.log(`Found ${books.length} books by this author`);
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books by author:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Get all books by genre
// @route   GET /api/books/genre/:genre
app.get('/api/books/genre/:genre', async (req, res) => {
  try {
    console.log(`Fetching books by genre: ${req.params.genre}`);
    const books = await Book.find({ genre: req.params.genre });
    
    if (books.length === 0) {
      console.log('No books found for this genre');
      return res.status(404).json({
        success: false,
        message: 'No books found for this genre',
      });
    }
    
    console.log(`Found ${books.length} books for this genre`);
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books by genre:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Get all books by published year
// @route   GET /api/books/year/:year
app.get('/api/books/year/:year', async (req, res) => {
  try {
    console.log(`Fetching books by year: ${req.params.year}`);
    const books = await Book.find({ publishedYear: req.params.year });
    
    if (books.length === 0) {
      console.log('No books found for this year');
      return res.status(404).json({
        success: false,
        message: 'No books found for this year',
      });
    }
    
    console.log(`Found ${books.length} books for this year`);
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error('Error fetching books by year:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Update a book's rating by ID
// @route   PUT /api/books/:id/rating
app.put('/api/books/:id/rating', async (req, res) => {
  try {
    console.log(`Updating rating for book ID: ${req.params.id}`);
    const { rating } = req.body;
    
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true, runValidators: true }
    );
    
    if (!book) {
      console.log('Book not found');
      return res.status(404).json({
        success: false,
        message: 'Book does not exist',
      });
    }
    
    console.log('Book rating updated successfully:', book);
    res.status(200).json({
      success: true,
      data: { rating: book.rating },
    });
  } catch (error) {
    console.error('Error updating book rating:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Update a book's details by title
// @route   PUT /api/books/title/:title
app.put('/api/books/title/:title', async (req, res) => {
  try {
    console.log(`Updating book with title: ${req.params.title}`);
    const book = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      console.log('Book not found');
      return res.status(404).json({
        success: false,
        message: 'Book does not exist',
      });
    }
    
    console.log('Book updated successfully:', book);
    res.status(200).json({
      success: true,
      data: {
        publishedYear: book.publishedYear,
        rating: book.rating,
      },
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Delete a book by ID
// @route   DELETE /api/books/:id
app.delete('/api/books/:id', async (req, res) => {
  try {
    console.log(`Deleting book with ID: ${req.params.id}`);
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      console.log('Book not found');
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    console.log('Book deleted successfully');
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Health check
app.get('/api/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

// Export for Vercel
module.exports = app;