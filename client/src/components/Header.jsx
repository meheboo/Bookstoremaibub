import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../logo/logo.webp'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="BookStore Logo" />
      </div>
        <div className='book-con'>BookStore</div>
      <nav className="nav-con">
        <ul>
          <li><Link to="/" className='a'>Home</Link></li>
          <li><Link to="/cart">Shopping Cart</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


