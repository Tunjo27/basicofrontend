import React from 'react';
import './Cart.css'; // Importa los estilos CSS asociados

/**
 * Componente funcional que representa el carrito de compras.
 * 
 * Props:
 * - cartProducts: Array de objetos representando los elementos en el carrito.
 * - onRemoveFromCart: Función para eliminar un elemento del carrito.
 * 
 * @param {Object} props Propiedades del componente.
 * @returns {JSX.Element} Elemento JSX que representa el carrito de compras.
 */
const Cart = ({ cartProducts, onRemoveFromCart }) => {
  // Calcula el total del carrito sumando los precios por la cantidad de cada elemento
  const total = cartProducts.reduce((acc, product) => acc + (product.price || 0) * product.quantity, 0);

  // Formatea el total con separadores de miles
  const formattedTotal = total.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
  });

  const enviarWhatsApp = () => {
    const mensaje = `¡Hola! Quiero hacer el siguiente pedido:\n\n${cartProducts
        .map(
            (producto) =>
                `- ${producto.title} x ${producto.quantity} - ${producto.price.toLocaleString(
                    'es-CO',
                    {
                        style: 'currency',
                        currency: 'COP',
                    }
                )}`
        )
        .join('\n')}\n\nTotal: ${total.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
    })}`;

    const telefono = '573102907287'; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  };

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
              <p>
                Precio:{' '}
                {(product.price || 0).toLocaleString('es-CO', { // Formato en el precio individual
                  style: 'currency',
                  currency: 'COP'
                })}
              </p>
              <p>Cantidad: {product.quantity}</p>
              <button onClick={() => onRemoveFromCart(product.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Muestra el total del carrito */}
      <div className="cart-total">
        <h2>Total: {formattedTotal}</h2>
        <button onClick={enviarWhatsApp}>Enviar pedido por WhatsApp</button>
      </div>
    </div>
  );
};

export default Cart;
