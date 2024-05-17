// Importaciones necesarias para el funcionamiento de la aplicación
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Body/Home/Home';
import Items from './components/Body/Items/Items';
import Details from './components/Body/Details/Details';
import Login from './components/Body/Login/Login';
import Cart from './components/Body/Cart/Cart';

/**
 * Componente principal de la aplicación.
 * @component
 * @returns {JSX.Element} - JSX que representa la estructura de la aplicación.
 */
const App = () => {
  // Estado para manejar la información del usuario
  const [user, setUser] = useState(null);
  // Estado para manejar la visibilidad del footer
  const [isFooterVisible] = useState(true);
  // Estado para manejar la apertura del modal de login
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para manejar los items del carrito
  const [cartItems, setCartItems] = useState([]);

  /**
   * Función para manejar el inicio de sesión.
   * @param {Object} userData - Datos del usuario.
   */
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsModalOpen(false); // Cierra el modal después de iniciar sesión
  };

  /**
   * Función para manejar el cierre de sesión.
   */
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  /**
   * Función para añadir un item al carrito.
   * @param {Object} item - El item a añadir al carrito.
   */
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  /**
   * Función para remover un item del carrito.
   * @param {number} id - El id del item a remover.
   */
  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <Router>
      {/* Componente Header, pasamos el estado del usuario y funciones de abrir modal y cerrar sesión */}
      <Header user={user} onOpenModal={() => setIsModalOpen(true)} onLogout={handleLogout} />
      <Routes>
        {/* Rutas de la aplicación */}
        <Route path="/" element={<Home />} />
        <Route path="/Items" element={<Items user={user} />} />
        <Route path="/Details/:id" element={<Details user={user} onAddToCart={handleAddToCart} />} />
        <Route path="/Cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} user={user} />} />
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
      </Routes>
      {/* Footer, visible dependiendo del estado */}
      {isFooterVisible ? (
        <Footer className="footer static-footer" />
      ) : (
        <Footer className="footer scrollable-footer" />
      )}
      {/* Modal de Login, se muestra si isModalOpen es true */}
      {isModalOpen && (
        <Login
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </Router>
  );
};

export default App;
