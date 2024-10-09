import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/featured-books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again later.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>; 

  return (
    <div className="homepage">
      <h1>Books</h1>
      <div className="book-list">
        {books.length > 0 ? (
          books.map(book => (
            <div key={book._id} className="book">
              <img src={`http://localhost:5000${book.image}`} alt={book.title} />
              <h3>{book.title}</h3>
              <h4>by {book.author}</h4>
              <p>{book.description}</p>
              <p className="book-price">₹{book.price.toFixed(2)}</p> 
              <h1></h1>
              <Link to={`/book/${book._id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No featured books available.</p> 
        )}
      </div>
    </div>
  );
};

export default HomePage;
