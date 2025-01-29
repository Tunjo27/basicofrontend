import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import database from '../../../database.json';
import './Products.css';

/**
 * Componente Products
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.user - Información del usuario autenticado.
 * 
 * @returns {JSX.Element} El componente Products.
 */
const Products = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(database);
  const navigate = useNavigate();

  /*if (!user) {
    return <Navigate to="/Products" />;
    //return <Navigate to="/Login" state={{ from: '/Products' }} />;
  }*/

  // Función para manejar la búsqueda de productos
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = database.filter(product =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const filtered = category === 'all' ? database : database.filter(product => product.category === category);
    setFilteredProducts(filtered);
  };

  // Función para manejar el clic en un producto
  const handleItemClick = (id) => {
    navigate(`/Promotions/${id}`);
  };

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
      </div>
      <div className="category-filter">
        <select onChange={handleCategoryChange}>
          <option value="all">Todos</option>
          <option value="bicicletas">Bicicletas</option>
          <option value="cascos">Cascos</option>
          <option value="manubrios">Manubrios</option>
        </select>
      </div>  
      <div className="product-list">
        {filteredProducts.map(product => (
          <div className="product" key={product.id} onClick={() => handleItemClick(product.id)}>
            <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>  
  );
};

export default Products;
