import React, { useState, useEffect } from 'react';
import database from '../../../database.json';
import './Products.css';

/**
 * Componente Products
 * 
 * @param {Object} props - Las propiedades del componente.
 * 
 * @returns {JSX.Element} El componente Products.
 */
const Products = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(database);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    // Obtener los productos desde localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products'));

    if (storedProducts) {
      setFilteredProducts(storedProducts);
    } else {
      setFilteredProducts(database); // Usar database como respaldo
    }
  }, []);

  // Función para manejar la búsqueda de productos
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    if (term.trim() !== "") {
      const filtered = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      // Si el término de búsqueda está vacío, muestra todos los productos
      setFilteredProducts(JSON.parse(localStorage.getItem('products')) || database);
    }
  };

  // Función para manejar el clic en un producto
  const handleItemClick = (id) => {
    setSelectedProductId(id); // Actualiza el ID del producto seleccionado
  };

  const ProductDetails = ({ product, onAddToCart }) => {
    // Función para agregar el artículo al carrito
    const handleAddToCart = () => {
      if (product && typeof product.price === 'number') {
        onAddToCart(product);
      } else {
        console.error('El precio del producto no está definido o no es un número.');
      }
    };

    if (!product) {
      return <div>Producto no encontrado</div>;
    }

    return (
      <div className="promotion-list">
        <div className="promotion">
          <h1>{product.title}</h1>
          <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} />
          <p>
            Precio:{' '}
            {product && typeof product.price === 'number'
              ? product.price.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                })
              : 'Precio no disponible'}
          </p>
          <button className="buy-button" onClick={handleAddToCart}>Comprar</button>
          <button className="back-button" onClick={() => setSelectedProductId(null)}>Volver</button>
        </div>
      </div>
    );
  };

  const ProductItem = ({ product, onClick }) => (
    <div className="product" key={product.id} onClick={() => onClick(product.id)}>
      <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
    </div>
  );

  // Renderizar el componente Products
  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Buscar:"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => { setSearchTerm(""); setFilteredProducts(JSON.parse(localStorage.getItem('products')) || database); }}>x</button>
      </div>
      {/* Renderizado condicional: detalles o lista */}
      {selectedProductId ? ( // Si hay un producto seleccionado, muestra los detalles
        <ProductDetails 
          product={filteredProducts.find(p => p.id === selectedProductId)} // Busca en filteredProducts
          onAddToCart={onAddToCart} 
        />
      ) : ( // Si no hay producto seleccionado, muestra la lista
        <div className="product-list">
          {filteredProducts.map(product => ( // Itera sobre filteredProducts
            <ProductItem product={product} onClick={handleItemClick} />
          ))}
        </div>
      )}
    </div>  
  );
};

export default Products;
