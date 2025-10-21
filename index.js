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

// Routes (same as in api/index.js)

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

// ... (copy all the other routes from api/index.js)

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

// Export for local development
module.exports = app;