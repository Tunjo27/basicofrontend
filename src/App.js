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
  const [cartProducts, setCartProducts] = useState([]);
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
  const handleAddToCart = (product) => {
    setCartProducts((prevProducts) => {
      const existingProduct = prevProducts.find((cartProduct) => cartProduct.id === product.id);
      if (existingProduct) {
        return prevProducts.map((cartProduct) =>
          cartProduct.id === product.id
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
        );
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  /**
   * Función para remover un producto del carrito.
   * @param {number} id - El id del producto a remover.
   */
  const handleRemoveFromCart = (id) => {
    setCartProducts((prevProducts) =>
      prevProducts
        .map((product) => (product.id === id ? { ...product, quantity: product.quantity - 1 } : product))
        .filter((product) => product.quantity > 0)
    );
  };

  return (
    <Router>
      {/* Componente Header, pasamos el estado del usuario y funciones de abrir modal y cerrar sesión */}
      <Header user={user} onOpenModal={() => setIsModalOpen(true)} onLogout={handleLogout} />
      <Routes>
        {/* Rutas de la aplicación */}
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Promotions/:id" element={<Promotions onAddToCart={handleAddToCart} />} />
        <Route path="/Cart" element={<Cart cartProducts={cartProducts} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/ManagementProducts" element={<Login onLogin={handleLogin} />} />
        <Route path="/ManagementPromotions" element={<Login onLogin={handleLogin} />} />
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
