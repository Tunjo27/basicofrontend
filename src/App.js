// Importaciones necesarias para el funcionamiento de la aplicación
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Body/Home/Home';
import Products from './components/Body/Products/Products';
import Promotions from './components/Body/Promotions/Promotions';
import Cart from './components/Body/Cart/Cart';
import Login from './components/Body/Login/Login';
import ProductManagement from './components/Body/Management/ProductManagement';
import PromotionsManagement from './components/Body/Management/PromotionsManagement';

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
  // Estado para manejar los productos del carrito
  const [cart, setCart] = useState([]);
  // Estado para manejar la apertura del modal de login
  const [isModalOpen, setIsModalOpen] = useState(false);

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
   * Función para añadir un producto al carrito.
   * @param {Object} product - El producto a añadir al carrito.
   */
  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.type === item.type);

    if (existingItemIndex > -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        setCart(updatedCart);
    } else {
        setCart([...cart, item]);
    }
  };

  /**
   * Función para remover un producto del carrito.
   * @param {number} id - El id del producto a remover.
   */
  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  }

  return (
    <Router>
      {/* Componente Header, pasamos el estado del usuario y funciones de abrir modal y cerrar sesión */}
      <Header user={user} onOpenModal={() => setIsModalOpen(true)} onLogout={handleLogout} />
      <Routes>
        {/* Rutas de la aplicación */}
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products onAddToCart={handleAddToCart} />} />
        <Route path="/Promotions" element={<Promotions onAddToCart={handleAddToCart} />} />
        <Route path="/Cart" element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} onClearCart={handleClearCart} onUpdateCart={handleUpdateCart} />} />
        <Route path="/ManagementProducts" element={<ProductManagement />} />
        <Route path="/ManagementPromotions" element={<PromotionsManagement />} />
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
