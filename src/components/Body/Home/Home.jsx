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
    process.env.PUBLIC_URL + '/images/image1.png',
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
      <p>Somos una empresa familiar apasionada por la belleza y el bienestar. Nos dedicamos a ofrecer productos cosméticos y prendas de vestir de alta calidad, diseñados para realzar la belleza natural de cada persona y brindar comodidad y estilo en cada etapa de la vida. Nuestra misión es empoderar a nuestros clientes, brindándoles productos que no solo los hagan sentir bien por fuera, sino también por dentro. Creemos en la belleza auténtica, la confianza en uno mismo y el cuidado personal.</p>
      <p>Ofrecemos una amplia gama de productos para satisfacer las necesidades de cada persona. En nuestra empresa, cada cliente es parte de nuestra familia. Nos esforzamos por brindar un servicio excepcional, atención personalizada y productos que superen las expectativas.</p>
    </div>
  );
};

export default Home;
