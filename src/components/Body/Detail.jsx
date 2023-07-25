import React from 'react';
import { Navigate } from 'react-router-dom';

const Detail = ({ user, title, detailInfo }) => {
  if (!user) {
    // Redirigir al componente Login si el usuario no está autenticado
    return <Navigate to="/Login" />;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{detailInfo}</p>
    </div>
  );
};

export default Detail;
