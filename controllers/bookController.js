const Book = require('../models/book.model');

// @desc    Create a new book
// @route   POST /api/books
exports.createBook = async (req, res) => {
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
};

// @desc    Get all books
// @route   GET /api/books
exports.getAllBooks = async (req, res) => {
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
};

// @desc    Get a book by title
// @route   GET /api/books/title/:title
exports.getBookByTitle = async (req, res) => {
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
};

// @desc    Get all books by an author
// @route   GET /api/books/author/:author
exports.getBooksByAuthor = async (req, res) => {
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
};

// @desc    Get all books by genre
// @route   GET /api/books/genre/:genre
exports.getBooksByGenre = async (req, res) => {
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
};

// @desc    Get all books by published year
// @route   GET /api/books/year/:year
exports.getBooksByYear = async (req, res) => {
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
};

// @desc    Update a book's rating by ID
// @route   PUT /api/books/:id/rating
exports.updateBookRatingById = async (req, res) => {
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
};

// @desc    Update a book's details by title
// @route   PUT /api/books/title/:title
exports.updateBookByTitle = async (req, res) => {
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
};

// @desc    Delete a book by ID
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
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
};