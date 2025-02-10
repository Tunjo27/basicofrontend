import React, { useState, useEffect } from 'react';
import './ProductManagement.css';
import database from '../../../database.json';

function ProductManagement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  //const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || database); // Estado para los productos
  const [productToEdit, setProductToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [products, setProducts] = useState(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    return storedProducts || database.products || []; // Valor inicial: localStorage o database.products o array vacío
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: Date.now(),
      category: 'varios',
      title,
      description,
      imageSrc: image ? image.name : 'default.jpg',
      price: parseFloat(price),
    };

    setProducts([...products, newProduct]);

    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setProductToEdit(null);
    setIsEditing(false); // Ocultar el formulario de edición
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    }
  };

  const handleSaveEdit = (updatedProduct) => {
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setProductToEdit(null);
    setIsEditing(false);
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
            <p>Precio: {product.price}</p>
            <button onClick={() => handleEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
      {isEditing && productToEdit && ( // Mostrar solo si se está editando un producto
        <div className="edit-product-form"> {/* Contenedor del formulario */}
          <h2>Editar Producto</h2>
          <form onSubmit={(e) => {
              e.preventDefault();
              handleSaveEdit(productToEdit);
            }}>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              name="title"
              value={productToEdit.title}
              onChange={(e) => setProductToEdit({...productToEdit, title: e.target.value})}
              required
            />
            <label htmlFor="description">Descripción:</label>
            <textarea
              name="description"
              value={productToEdit.description}
              onChange={(e) => setProductToEdit({...productToEdit, description: e.target.value})}
              required
            />
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              name="price"
              value={productToEdit.price}
              onChange={(e) => setProductToEdit({...productToEdit, price: parseFloat(e.target.value)})}
              required
            />
            <button>Guardar cambios</button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductManagement;