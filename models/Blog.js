const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters long']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-_]+$/, 'Slug can only contain lowercase letters, numbers, hyphens, and underscores']
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
      type: String,
      default: '',
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Blog', blogSchema);
