// Importaciones necesarias para el componente Header
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

/**
 * Componente de encabezado de la aplicación.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario autenticado.
 * @param {Function} props.onOpenModal - Función para abrir el modal de inicio de sesión.
 * @param {Function} props.onLogout - Función para manejar el cierre de sesión.
 * @returns {JSX.Element} - JSX que representa el encabezado de la aplicación.
 */
const Header = ({ user, onOpenModal, onLogout }) => {
  // Verifica si el usuario está autenticado
  const isLoggedIn = !!user;

  return (
    <header className="header">
      <div className="container">
        {/* Logo de la aplicación */}
        <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="Logo" className="logo" />
        {/* Navegación principal */}
        <nav className="nav">
          {/* Enlaces de navegación */}
          <Link to="/">Home</Link>
          <Link to="/Products">Productos</Link>
          <Link to="/Promotions">Promociones</Link>
          <Link to="/Cart">Carrito</Link>
          {/* Mostrar enlaces si el usuario ha iniciado sesión */}
          <div className={`management-links ${isLoggedIn ? 'visible' : 'hidden'}`}> 
            <Link to="/ManagementProducts">G. Productos</Link>
            <Link to="/ManagementPromotions">G. Promociones</Link>
          </div>  
          {/* Condicional para mostrar "Ingresar" o "Cerrar sesión" */}
          {isLoggedIn ? (
            <Link to="/" onClick={onLogout}>Cerrar sesión</Link>
          ) : (
            <Link to="/Login" onClick={onOpenModal}>Ingresar</Link>
          )}
          {/* Animación de navegación */}
          <div className='animation start-home'></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
