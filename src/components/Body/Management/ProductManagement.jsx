import React, { useState } from 'react';
import './ProductManagement.css';
import database from '../../../database.json';

function ProductManagement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || database); // Estado para los productos

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedProducts = JSON.parse(localStorage.getItem('products')) || database; // Usar database como respaldo
  
    const newProduct = {
      id: Date.now(),
      category: 'varios',
      title,
      description,
      imageSrc: image ? image.name : 'default.jpg',
      price: parseFloat(price),
    };

    storedProducts.push(newProduct);

    // Guardar la copia actualizada en localStorage
    localStorage.setItem('products', JSON.stringify(storedProducts));
    
    setProducts(storedProducts); // Actualiza el estado products para re-renderizar la lista

    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
  };
  
  return (
    <div className="product-management">
      <h2>Agregar producto</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label htmlFor="description">Descripción:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label htmlFor="price">Precio:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <label htmlFor="image">Imagen:</label>
        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Guardar</button>
      </form>

      <div className="product-list">
        {products.map(product => (
          <div className="product" key={product.id}>
            <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} /> {/* Mostrar la imagen */}
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Precio: {product.price}</p> {/* Muestra el precio */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManagement;