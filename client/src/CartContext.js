
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  
  const addToCart = (book) => {
    setCartItems((prevItems) => [...prevItems, book]);
    console.log('Added to cart:', book);
  };

  
  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== bookId));
    console.log('Removed from cart:', bookId);
  };


  const clearCart = () => {
    setCartItems([]); 
    console.log('Cart cleared');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


