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
const Cart = ({ cart, onRemoveFromCart, onClearCart, onUpdateCart }) => {
  
  const handleIncrementQuantity = (item) => { // Cambia el nombre a handleIncrementQuantity para evitar confusiones
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id && cartItem.type === item.type);

    if (existingItemIndex > -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += 1;
        onUpdateCart(updatedCart); // Llama a la función onUpdateCart que se recibió como prop
    }
  };

  const total = cart.reduce((acc, item) => {
    const price = item.type === 'promotion' ?
        item.promotionPrice * item.quantity :
        item.price * item.quantity;
    return acc + price;
  }, 0);

  // Formatea el total con separadores de miles
  const formattedTotal = total.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP'
  });

  const enviarWhatsApp = () => {
    const mensaje = `¡Hola! Quiero hacer el siguiente pedido:\n\n${cart
        .map(
            (producto) =>
                `- ${producto.title} x ${producto.quantity} - ${(producto.promotionPrice || producto.price).toLocaleString(
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

    const telefono = '573102907287';
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
    onClearCart();
  };

  // Renderiza el componente del carrito de compras
  return (
    <div className="cart">
      <h1>Carrito de Compras</h1>
      <ul>
        {/* Mapea los elementos del carrito y renderiza cada uno */}
        {cart.map((item) => (
          <li key={item.id} className="cart-product">
            <img src={process.env.PUBLIC_URL + '/images/' + item.imageSrc} alt={item.title} />
            <div className="cart-product-details">
              <h2>{item.title}</h2>
              <p>Precio: {(item.type === 'promotion' ? item.promotionPrice * item.quantity : item.price * item.quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
              <p>Cantidad: {item.quantity}</p>
              <button onClick={() => handleIncrementQuantity(item)}>Aumentar Cantidad</button>
              <button onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
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
