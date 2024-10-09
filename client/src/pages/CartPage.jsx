import React from 'react';
import { useCart } from '../CartContext'; 
import axios from 'axios'; 
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart(); 
  const navigate = useNavigate(); 
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0); 

  const confirmOrder = async () => {
    try {
      const bookIds = cartItems.map(item => item._id); 
      await axios.post('http://localhost:5000/api/confirm-order', { bookIds }); 
      clearCart(); 
      alert('Order confirmed!');
      navigate('/');
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
    
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((book, index) => (
            <div key={index} className="cart-item">
              <img src={`http://localhost:5000${book.image}`} alt={book.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{book.title}</h3>
                <h5>by {book.author}</h5>
                <p className="cart-item-price">Price: ₹{book.price.toFixed(2)}</p>
                
                <button 
                  className="remove-button" 
                  onClick={() => removeFromCart(book._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      
      <div className="total">
        <p className="total-price">Total Price: ₹{totalPrice.toFixed(2)}</p>
        <button onClick={confirmOrder} className="checkout-button">Confirm Order</button> 
      </div>
    </div>
  );
};

export default CartPage;

