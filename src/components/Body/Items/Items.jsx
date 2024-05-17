import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginAlertModal from '../Login/LoginAlertModal/LoginAlertModal';
import database from '../../../database.json';
import './Items.css';

/**
 * Componente Items
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.user - Información del usuario autenticado.
 * 
 * @returns {JSX.Element} El componente Items.
 */
const Items = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(database);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(!user);
  const navigate = useNavigate();

  // Mostrar el modal de alerta de inicio de sesión si el usuario no está autenticado
  if (!user) {
    return (
      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onRequestClose={() => setIsLoginAlertOpen(false)}
      />
    );
  }

  // Función para manejar la búsqueda de items
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = database.filter(item =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    const filtered = category === 'all' ? database : database.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  // Función para manejar el clic en un item
  const handleItemClick = (id) => {
    navigate(`/Details/${id}`);
  };

  // Renderizar el componente Items
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
      <div className="item-list">
        {filteredItems.map(item => (
          <div className="item" key={item.id} onClick={() => handleItemClick(item.id)}>
            <img src={process.env.PUBLIC_URL + '/images/' + item.imageSrc} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>  
  );
};

export default Items;
