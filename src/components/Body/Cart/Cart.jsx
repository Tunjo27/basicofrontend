import React, { useState } from 'react';
import LoginAlertModal from '../Login/LoginAlertModal/LoginAlertModal'; // Importa el componente LoginAlertModal
import './Cart.css'; // Importa los estilos CSS asociados

/**
 * Componente funcional que representa el carrito de compras.
 * 
 * Props:
 * - cartItems: Array de objetos representando los elementos en el carrito.
 * - onRemoveFromCart: Función para eliminar un elemento del carrito.
 * - user: Objeto que representa al usuario actual.
 * 
 * @param {Object} props Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que representa el carrito de compras.
 */
const Cart = ({ cartItems, onRemoveFromCart, user }) => {
  // Calcula el total del carrito sumando los precios por la cantidad de cada elemento
  const total = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  
  // Estado para controlar si se muestra la alerta de inicio de sesión
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(!user);

  // Si no hay usuario, muestra el componente LoginAlertModal
  if (!user) {
    return (
      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onRequestClose={() => setIsLoginAlertOpen(false)}
      />
    );
  }

  // Renderiza el componente del carrito de compras
  return (
    <div className="cart">
      <h1>Carrito de Compras</h1>
      <ul>
        {/* Mapea los elementos del carrito y renderiza cada uno */}
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={process.env.PUBLIC_URL + '/images/' + item.imageSrc} alt={item.title} />
            <div className="cart-item-details">
              <h2>{item.title}</h2>
              <p>Precio: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Muestra el total del carrito */}
      <div className="cart-total">
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
