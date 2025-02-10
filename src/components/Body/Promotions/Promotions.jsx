import React, { useState, useEffect } from 'react';
import database from '../../../database.json'; // Importa tu base de datos
import './Promotions.css';

const Promotions = ({ onAddToCart }) => {
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

    const handleAddPromotionToCart = (promotion) => {
        if (promotion && promotion.productIds && promotion.price) {
            const productsToAdd = promotion.productIds.map(productId => {
                const product = products.find(p => p.id === productId);
                return product ? {
                    ...product,
                    promotionPrice: promotion.price,
                    quantity: 1
                } : null;
            }).filter(product => product !== null);

            onAddToCart({
                id: promotion.id, // ID de la promoción
                type: 'promotion', // Tipo de ítem: promoción
                title: promotion.title,
                imageSrc: productsToAdd[0].imageSrc, // Imagen del primer producto de la promoción
                products: productsToAdd,
                promotionPrice: promotion.price,
                quantity: 1 // Cantidad inicial de la promoción
            });
        } else {
            console.error("Promoción no definida o datos incompletos.");
        }
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
                    <h3>Productos en esta promoción:</h3>
                    <div className="product-list">
                        {selectedPromotion.productIds.map(productId => {
                            const product = products.find(p => p.id === productId);
                            return product ? (
                                <div key={product.id} className="product">
                                    <img src={process.env.PUBLIC_URL + '/images/' + product.imageSrc} alt={product.title} />
                                    <h4>{product.title}</h4>
                                </div>
                            ) : null;
                        })}
                    </div>
                    <button className="buy-button" onClick={() => handleAddPromotionToCart(selectedPromotion)}>Agregar promoción al carrito</button>
                    <button className="back-button" onClick={() => setSelectedPromotion(null)}>Volver a las promociones</button>
                </div>
            ) : (
                <div className="promotions-list">
                    {filteredPromotions.map(promotion => (
                        <div key={promotion.id} className="promotion" onClick={() => handleItemClick(promotion)}>
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
                            <h2>{promotion.title}</h2>
                            <p>{promotion.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Promotions;