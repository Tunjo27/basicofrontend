import React, { useState, useEffect } from 'react';
import Item from './Item';
import ruta from '../Body/ruta.jpg';
import mtb from '../Body/mtb.jpg';
import fija from '../Body/fija.jpg';
import image3 from '../Body/image3.jpg';
import image4 from '../Body/image4.jpg';
import './List.css';

const List = () => {
  const images = [image3, image4];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);

  }, [images.length]);

  return (
    <div className="alturaminima">
      <div className="image-slider">
        <img src={images[currentImage]} alt="Slider" />
      </div>
      <h1>Quiénes somos</h1>
      <hr className="line-divider"/>
      <p>Somos una empresa apasionada por el ciclismo y la aventura al aire libre. Nos dedicamos a la fabricación y venta de bicicletas de alta calidad para todos los amantes de la vida en dos ruedas. Nuestra misión es inspirar a las personas a explorar el mundo sobre dos ruedas, brindando bicicletas diseñadas para la máxima comodidad, rendimiento y durabilidad.</p>
      <p>frecemos una amplia gama de bicicletas para satisfacer las necesidades de cada ciclista. Desde bicicletas de ruta aerodinámicas para los que buscan la máxima velocidad en el asfalto, hasta robustas bicicletas de montaña para aquellos que buscan conquistar senderos y montañas. También tenemos bicicletas urbanas y de paseo, perfectas para desplazarse por la ciudad o disfrutar de relajantes paseos en el parque.</p>
      <h1>Tipos de bicicletas</h1>
      <div className="item-list">
        <Item
          imageSrc={ruta}
          title="Bicicleta de Ruta"
          description="Una bicicleta de ruta es diseñada para carreras de carretera y es más adecuada para pavimentos y superficies lisas."
        />
        <Item
          imageSrc={mtb}
          title="Bicicleta de Montaña"
          description="Una bicicleta de montaña es ideal para terrenos accidentados y senderos fuera de carretera."
        />
        <Item
          imageSrc={fija}
          title="Bicicleta de Piñón Fijo"
          description="Una bicicleta de piñón fijo tiene una única relación de transmisión y no dispone de rueda libre."
        />
      </div>
    </div>
  );
};

export default List;
