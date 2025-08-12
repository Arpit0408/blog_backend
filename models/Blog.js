// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters long']
    },
    body: {
      type: String,
      required: [true, 'Blog content (body) is required'],
      minlength: [20, 'Blog body must be at least 20 characters long']
    },
    author: {
      type: String,
      default: 'Anonymous',
      trim: true
    },
    image: {
      type: String, // URL or file path
      default: '',
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Blog', blogSchema);
