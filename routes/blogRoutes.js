const express = require('express');
const Blog = require('../models/Blog');
const upload = require('../middleware/upload'); // For image upload
const router = express.Router();

// @route   GET /api/blogs
// @desc    Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Server error while fetching blogs.' });
  }
});

// @route   GET /api/blogs/:id
// @desc    Get a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error('Error fetching blog by ID:', err);
    res.status(400).json({ message: 'Invalid blog ID' });
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog post (with optional image upload)
router.post('/', upload.single('image'), async (req, res) => {
  const { title, body, author } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    if (!title || !body) {
      return res.status(400).json({ message: 'Title and body are required.' });
    }

    const newBlog = new Blog({
      title,
      body,
      author: author || 'Anonymous',
      image: imagePath
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update a blog post (with optional image upload)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, body, author } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (title) blog.title = title;
    if (body) blog.body = body;
    if (author) blog.author = author;
    if (imagePath) blog.image = imagePath;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(400).json({ message: 'Invalid blog ID' });
  }
});

module.exports = router;
