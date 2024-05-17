// Importaciones necesarias para el componente Footer
import React, { useState, useEffect } from 'react';
import './Footer.css';

/**
 * Componente de pie de página de la aplicación.
 * @component
 * @returns {JSX.Element} - JSX que representa el pie de página de la aplicación.
 */
const Footer = () => {
  // Estado para determinar si el footer debe estar fijo
  const [isFooterFixed, setIsFooterFixed] = useState(false);

  // Hook de efecto para manejar el evento de scroll
  useEffect(() => {
    /**
     * Función para manejar el scroll de la ventana.
     * Fija el footer si el contenido es menor que el viewport.
     */
    const handleScroll = () => {
      const contentHeight = document.body.scrollHeight; // Altura total del contenido
      const viewportHeight = window.innerHeight; // Altura del viewport

      // Determina si el footer debe estar fijo
      if (contentHeight > viewportHeight) {
        setIsFooterFixed(false);
      } else {
        setIsFooterFixed(true);
      }
    };

    // Añade el event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    // Limpia el event listener al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer ${isFooterFixed ? 'fixed' : ''}`}>
      <p>
        &copy; {new Date().getFullYear()} API. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
