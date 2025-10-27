const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true,
  },
  publishedYear: {
    type: Number,
    required: [true, 'Please add a published year'],
  },
  genre: {
    type: [String],
    required: [true, 'Please add at least one genre'],
  },
  language: {
    type: String,
    required: [true, 'Please add a language'],
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 0,
    max: 5,
  },
  summary: {
    type: String,
    required: [true, 'Please add a summary'],
  },
  coverImageUrl: {
    type: String,
    required: [true, 'Please add a cover image URL'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', bookSchema);
