import React, { useState, useEffect } from 'react';
import './Home.css';

/**
 * Componente Home
 * 
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.user - Información del usuario autenticado.
 * 
 * @returns {JSX.Element} El componente Home.
 */
const Home = ({ user }) => {
  const images = [
    process.env.PUBLIC_URL + '/images/image1.jpg',
    process.env.PUBLIC_URL + '/images/image2.jpg'
  ];
  const [currentImage, setCurrentImage] = useState(0);

  // Cambiar la imagen actual cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Renderizar el componente Home
  return (
    <div className="alturaminima">
      <div className="image-slider">
        <img src={images[currentImage]} alt="Slider" />
      </div>
      <h1>Quiénes somos</h1>
      <hr className="line-divider"/>
      <p>Somos una empresa apasionada por el ciclismo y la aventura al aire libre. Nos dedicamos a la fabricación y venta de bicicletas de alta calidad para todos los amantes de la vida en dos ruedas. Nuestra misión es inspirar a las personas a explorar el mundo sobre dos ruedas, brindando bicicletas diseñadas para la máxima comodidad, rendimiento y durabilidad.</p>
      <p>Ofrecemos una amplia gama de bicicletas para satisfacer las necesidades de cada ciclista. Desde bicicletas de ruta aerodinámicas para los que buscan la máxima velocidad en el asfalto, hasta robustas bicicletas de montaña para aquellos que buscan conquistar senderos y montañas. También tenemos bicicletas urbanas y de paseo, perfectas para desplazarse por la ciudad o disfrutar de relajantes paseos en el parque.</p>
    </div>
  );
};

export default Home;
