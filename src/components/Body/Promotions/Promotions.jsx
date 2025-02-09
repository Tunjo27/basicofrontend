import React, { useState, useEffect } from 'react';
import database from '../../../database.json'; // Importa tu base de datos
import './Promotions.css';

function Promotions({ onAddToCart }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPromotions, setFilteredPromotions] = useState(database.promotions || []); // Usa la parte de promociones de tu base de datos
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [products] = useState(database.products || []);
    
    useEffect(() => {
        // Obtener las promociones desde localStorage
        const storedPromotions = JSON.parse(localStorage.getItem('promotions'));
        if (storedPromotions) {
            setFilteredPromotions(storedPromotions);
        }
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.trim() !== "") {
            const filtered = filteredPromotions.filter(promotion =>
                promotion.title.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredPromotions(filtered);
        } else {
            setFilteredPromotions(JSON.parse(localStorage.getItem('promotions')) || database.promotions);
        }
    };

    const handleItemClick = (promotion) => {
        setSelectedPromotion(promotion);
    };

    const handleAddToCart = (promotion) => {
        let promotionTotal = 0;
        const productsToAdd = []; // Array para almacenar los productos de la promoción
    
        promotion.productIds.forEach(productId => {
            const product = products.find(p => p.id === productId);
            if (product) {
                promotionTotal += product.price;
                productsToAdd.push(product); // Agregar el producto al array
            }
        });
    
        // Agregar la promoción como un elemento individual en el carrito
        const promotionItem = {
            id: promotion.id,
            title: promotion.title,
            price: promotionTotal,
            quantity: 1,
            isPromotion: true,
            products: productsToAdd // Almacenar los productos de la promoción
        };
    
        onAddToCart(promotionItem);
    };

    return (
        <div>
            <div className="search">
                <input
                    type="text"
                    placeholder="Buscar:"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={() => { setSearchTerm(""); setFilteredPromotions(JSON.parse(localStorage.getItem('promotions')) || database.promotions); }}>x</button>
            </div>

            {selectedPromotion ? (
                <div className="promotion-details">
                    <h2>{selectedPromotion.title}</h2>
                    <p>{selectedPromotion.description}</p>
                    <h3>Productos en esta promoción:</h3>
                    <div className="product-list">
                        {selectedPromotion.productIds.map(productId => {
                            const product = products.find(p => p.id === productId);
                            return product ? (
                                <div key={product.id} className="product">
                                    <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} />
                                    <h4>{product.title}</h4>
                                    <p>{product.description}</p>
                                    <p>Precio: {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                                </div>
                            ) : null;
                        })}
                    </div>
                    <button className="buy-button" onClick={() => handleAddToCart(selectedPromotion)}>Agregar promoción al carrito</button>
                    <button className="back-button" onClick={() => setSelectedPromotion(null)}>Volver a las promociones</button>
                </div>
            ) : (
                <div className="promotions-list">
                    {filteredPromotions.map(promotion => (
                        <div key={promotion.id} className="promotion" onClick={() => handleItemClick(promotion)}>
                            <h2>{promotion.title}</h2>
                            <p>{promotion.description}</p>
                            <div className="product-images">
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Promotions;