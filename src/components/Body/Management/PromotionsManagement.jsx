import React, { useState, useEffect } from 'react';
import database from '../../../database.json';
import './PromotionsManagement.css';

function PromotionsManagement() {
    const [promotions, setPromotions] = useState(JSON.parse(localStorage.getItem('promotions')) || database.promotions || []);
    const [products] = useState(JSON.parse(localStorage.getItem('products')) || database.products || []);
    const [newPromotion, setNewPromotion] = useState({ title: '', description: '', productIds: [] });
    const [promotionToEdit, setPromotionToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem('promotions', JSON.stringify(promotions));
    }, [promotions]);

    const handleProductSelect = (productId) => {
        setNewPromotion({
            ...newPromotion,
            productIds: newPromotion.productIds.includes(productId)
                ? newPromotion.productIds.filter(id => id !== productId)
                : [...newPromotion.productIds, productId]
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPromotionWithId = { ...newPromotion, id: Date.now() };
        setPromotions([...promotions, newPromotionWithId]);
        setNewPromotion({ title: '', description: '', productIds: [] });
    };

    const handleEdit = (promotion) => {
        setPromotionToEdit(promotion);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setPromotionToEdit(null);
        setIsEditing(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta promoción?')) {
            const updatedPromotions = promotions.filter(promotion => promotion.id !== id);
            setPromotions(updatedPromotions);
        }
    };

    const handleSaveEdit = (updatedPromotion) => {
        const updatedPromotions = promotions.map(promotion =>
            promotion.id === updatedPromotion.id ? updatedPromotion : promotion
        );
        setPromotions(updatedPromotions);
        setPromotionToEdit(null);
        setIsEditing(false);
    };

    return (
        <div className="promotions-management">
            <h2>Agregar promoción</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Título:</label>
                <input type="text" id="title" value={newPromotion.title} onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })} required />
                <label htmlFor="description">Descripción:</label>
                <textarea id="description" value={newPromotion.description} onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })} required />
                <label htmlFor='price'>Precio</label>
                <input type="number" id="price" value={newPromotion.price} onChange={(e) => setNewPromotion({ ...newPromotion, price: e.target.value })} required />
                <h3>Productos</h3>
                <div className="product-list">
                    {products.map(product => (
                        <label key={product.id}>
                            <input
                                type="checkbox"
                                checked={newPromotion.productIds.includes(product.id)}
                                onChange={() => handleProductSelect(product.id)}
                            />
                            {product.title}
                        </label>
                    ))}
                </div>
                <button type="submit">Guardar</button>
            </form>
            <div className="promotions-list">
                {promotions.map(promotion => (
                    <div className="promotion" key={promotion.id}>
                        <div className="product-images"> {/* Contenedor para las imágenes */}
                            {promotion.productIds.map(productId => {
                                const product = products.find(p => p.id === productId);
                                return product ? (
                                    <img
                                        key={productId}
                                        src={process.env.PUBLIC_URL + '/images/' + product.imageSrc}
                                        alt={product.title}
                                    />
                                ) : null;
                            })}
                        </div>
                        <h2>{promotion.title}</h2>
                        <p>{promotion.description}</p>
                        <p>Precio: {promotion.price}</p>
                        <button onClick={() => handleEdit(promotion)}>Editar</button>
                        <button onClick={() => handleDelete(promotion.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
            {isEditing && promotionToEdit && (
                <div className="edit-promotion-form">
                    <h2>Editar Promoción</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveEdit(promotionToEdit);
                    }}>
                        <label htmlFor="title">Título:</label>
                        <input type="text" name="title" value={promotionToEdit.title} onChange={(e) => setPromotionToEdit({ ...promotionToEdit, title: e.target.value })} required />
                        <label htmlFor="description">Descripción:</label>
                        <textarea name="description" value={promotionToEdit.description} onChange={(e) => setPromotionToEdit({ ...promotionToEdit, description: e.target.value })} required />
                        <label htmlFor="price">Precio:</label>
                        <input type="number" name="price" value={promotionToEdit.price} onChange={(e) => setPromotionToEdit({ ...promotionToEdit, price: e.target.value })} required />
                        <h3>Productos</h3>
                        <div className="product-list">
                            {products.map(product => (
                                <label key={product.id}>
                                    <input
                                        type="checkbox"
                                        checked={promotionToEdit.productIds.includes(product.id)}
                                        onChange={() => setPromotionToEdit({
                                            ...promotionToEdit,
                                            productIds: promotionToEdit.productIds.includes(product.id)
                                                ? promotionToEdit.productIds.filter(id => id !== product.id)
                                                : [...promotionToEdit.productIds, product.id]
                                        })}
                                    />
                                    {product.title}
                                </label>
                            ))}
                        </div>

                        <button>Guardar cambios</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                    </form>
                    <div className="product-images"> {/* Contenedor para las imágenes en edición */}
                        {promotionToEdit.productIds.map(productId => {
                            const product = products.find(p => p.id === productId);
                            return product ? (
                                <img
                                    key={productId}
                                    src={process.env.PUBLIC_URL + '/images/' + product.imageSrc}
                                    alt={product.title}
                                />
                            ) : null;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PromotionsManagement;