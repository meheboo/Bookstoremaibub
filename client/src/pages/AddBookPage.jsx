import React, { useState } from 'react';
import axios from 'axios';
import './AddBookPage.css'; 
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    image: ''
  });
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('description', book.description);
    formData.append('price', book.price);
    formData.append('image', book.image);

    try {
      const response = await axios.post('http://localhost:5000/api/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Book added successfully!');
      navigate('/');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="add-book-page">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={book.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;


