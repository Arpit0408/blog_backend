// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');
const mailRoutes = require('./routes/mailRoutes.js');

const path = require('path'); // ✅ this is the missing line

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://indus-orcin.vercel.app',
  credentials: true,  // if you need to send cookies/auth headers
}));app.use(express.json());

// Serve uploads folder statically so images are accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/', (req, res) => {
  res.send('Connected');
});
// Routes
app.use('/api/blogs', blogRoutes);

app.use('/api/mail', mailRoutes);
// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
