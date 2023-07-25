import React from 'react';
import { Navigate } from 'react-router-dom';

const Item = ({ user, imageSrc, title, description }) => {
  if (!user) {
    // Redirigir al componente Login si el usuario no está autenticado
    return <Navigate to="/Login" />;
  }

  return (
    <div className="item">
      <img src={imageSrc} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Item;
