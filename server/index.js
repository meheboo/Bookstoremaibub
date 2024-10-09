const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect('mongodb://127.0.0.1:27017/bookstoremaibub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, 
  purchased: { type: Boolean, default: false },
});

const Book = mongoose.model('Book', bookSchema);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// API to add a new book
app.post('/api/books', upload.single('image'), async (req, res) => {
  try {
    const { title, author, description, price } = req.body;
    const newBook = new Book({
      title,
      author,
      description,
      price,
      image: req.file ? `/uploads/${req.file.filename}` : null, 
    });
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
});
app.get('/api/featured-books', async (req, res) => {
  try {
    const books = await Book.find({ purchased: false });
    res.json(books);
  } catch (error) {
    console.error('Error fetching featured books:', error);
    res.status(500).json({ message: 'Error fetching featured books' });
  }
});
app.get('/api/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Error fetching book details' });
  }
});
app.post('/api/confirm-order', async (req, res) => {
  const { bookIds } = req.body;
  try {
    await Book.updateMany({ _id: { $in: bookIds } }, { purchased: true });
    res.json({ message: 'Order confirmed' });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ message: 'Error confirming order' });
  }
});
app.listen(5000, () => console.log('Server started on port 5000'));

