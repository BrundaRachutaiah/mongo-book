const Book = require('../models/book.model');

// @desc    Create a new book
// @route   POST /api/books
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all books
// @route   GET /api/books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a book by title
// @route   GET /api/books/title/:title
exports.getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all books by an author
// @route   GET /api/books/author/:author
exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No books found for this author',
      });
    }
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all books by genre
// @route   GET /api/books/genre/:genre
exports.getBooksByGenre = async (req, res) => {
  try {
    const books = await Book.find({ genre: req.params.genre });
    
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No books found for this genre',
      });
    }
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all books by published year
// @route   GET /api/books/year/:year
exports.getBooksByYear = async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: req.params.year });
    
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No books found for this year',
      });
    }
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a book's rating by ID
// @route   PUT /api/books/:id/rating
exports.updateBookRatingById = async (req, res) => {
  try {
    const { rating } = req.body;
    
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book does not exist',
      });
    }
    
    res.status(200).json({
      success: true,
      data: { rating: book.rating },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a book's details by title
// @route   PUT /api/books/title/:title
exports.updateBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book does not exist',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        publishedYear: book.publishedYear,
        rating: book.rating,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a book by ID
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};