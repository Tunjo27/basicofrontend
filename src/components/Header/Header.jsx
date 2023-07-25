import React from 'react';
import './Header.css';
import logo from '../Header/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ onOpenModal }) => {
  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt="Logo" className="logo" />
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/Items">Items</Link>
            <Link to="/Details">Detalles</Link>
            <Link to="/Login" onClick={onOpenModal}>Ingrese</Link>
            <div className='animation start-home'></div>
          </nav>
      </div>
    </header>
  );
};

export default Header;