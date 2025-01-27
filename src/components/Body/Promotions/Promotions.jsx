import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoginAlertModal from '../Login/LoginAlertModal/LoginAlertModal';
import database from '../../../database.json';
import './Promotions.css';

/**
 * Componente Promotions
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.user - Información del usuario autenticado.
 * @param {Function} props.onAddToCart - Función para agregar elementos al carrito.
 * 
 * @returns {JSX.Element} El componente Promotions.
 */
const Promotions = ({ user, onAddToCart }) => {
  const { id } = useParams(); // Obtiene el ID del parámetro de la URL
  const product = database.find(product => product.id === parseInt(id)); // Encuentra el artículo correspondiente al ID
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(!user); // Estado para mostrar el modal de alerta de inicio de sesión

  // Efecto para mostrar el modal de alerta si el usuario no está autenticado
  useEffect(() => {
    if (!user) {
      setIsLoginAlertOpen(true);
    }
  }, [user]);

  // Función para agregar el artículo al carrito
  const handleAddToCart = () => {
    if (typeof product.price === 'number') {
      onAddToCart(product); // Llama a la función onAddToCart pasando el artículo como argumento
    } else {
      console.error('El precio del producto no está definido o no es un número.');
    }
  };

  // Renderiza el componente según el estado del usuario y la existencia del artículo
  if (!user) {
    return (
      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onRequestClose={() => setIsLoginAlertOpen(false)}
      />
    );
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  // Renderiza los promociones del artículo
  return (
    <div className="promotion-list">
      <div className="promotion">
        <h1>{product.title}</h1>
        <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} />
        {/* Incluir más descripciones o promciones del artículo aquí si es necesario */}
        <p>Precio: {typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Precio no disponible'}</p>
        <button className="buy-button" onClick={handleAddToCart}>Comprar</button>
      </div>
    </div>
  );
};

export default Promotions;
