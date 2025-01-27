import React, { useState } from 'react';
import LoginAlertModal from '../Login/LoginAlertModal/LoginAlertModal'; // Importa el componente LoginAlertModal
import './Cart.css'; // Importa los estilos CSS asociados

/**
 * Componente funcional que representa el carrito de compras.
 * 
 * Props:
 * - cartProducts: Array de objetos representando los elementos en el carrito.
 * - onRemoveFromCart: Función para eliminar un elemento del carrito.
 * - user: Objeto que representa al usuario actual.
 * 
 * @param {Object} props Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que representa el carrito de compras.
 */
const Cart = ({ cartProducts, onRemoveFromCart, user }) => {
  // Calcula el total del carrito sumando los precios por la cantidad de cada elemento
  const total = cartProducts.reduce((acc, product) => acc + (product.price || 0) * product.quantity, 0);
  
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
        {cartProducts.map((product) => (
          <li key={product.id} className="cart-product">
            <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} />
            <div className="cart-product-details">
              <h2>{product.title}</h2>
              <p>Precio: ${product.price ? product.price.toFixed(2) : 'N/A'}</p>
              <p>Cantidad: {product.quantity}</p>
              <button onClick={() => onRemoveFromCart(product.id)}>Eliminar</button>
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
