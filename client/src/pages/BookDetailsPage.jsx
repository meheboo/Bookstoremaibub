import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetailsPage.css';
import { useCart } from '../CartContext';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/book/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(book);
    alert(`${book.title} added to cart!`);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="book-details">
      <img src={`http://localhost:5000${book.image}`} alt={book.title} className="book-image" />
      <div className="book-info">
        <h1>{book.title}</h1>
        <h3>by {book.author}</h3>
        <p className="book-price">Price: ₹{book.price.toFixed(2)}</p>
        <p>{book.description}</p>
        <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
        <button onClick={() => navigate('/cart')} className="go-to-cart-button">Go to Cart</button>
      </div>
    </div>
  );
};

export default BookDetailsPage;
