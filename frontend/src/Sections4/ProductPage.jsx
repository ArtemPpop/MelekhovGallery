import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);

    // Используем правильные URL (как в TestShop)
    const API_URL = '/api/products/';
    const CART_ADD_URL = '/api/cart/add/';

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const res = await axios.get(API_URL);
                const products = Array.isArray(res.data) ? res.data : [];
                
                const found = products.find(p => p.id === parseInt(id));
                if (found) {
                    setProduct(found);
                    if (found.variants && found.variants.length > 0) {
                        setSelectedVariant(found.variants[0]);
                    }
                } else {
                    setError('Товар не найден');
                }
            } catch (err) {
                console.error(err);
                setError('Ошибка загрузки товара');
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    // ТОЧНО КАК В TESTSHOP
    const addToCart = async () => {
        if (!selectedVariant) {
            alert('Выберите вариант товара');
            return;
        }
        
        setAddingToCart(true);
        try {
            await fetch(CART_ADD_URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    variant_id: selectedVariant.id,
                    quantity: 1
                })
            });

            alert('Товар добавлен в корзину');
            window.dispatchEvent(new CustomEvent('cartUpdated'));
            
        } catch (error) {
            console.error('Ошибка добавления:', error);
            alert('Ошибка добавления в корзину');
        } finally {
            setAddingToCart(false);
        }
    };

    const goToCheckout = () => {
        const checkoutData = {
            product: product,
            variant: selectedVariant,
            quantity: 1
        };
        sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        navigate('/checkout');
    };

    if (loading) {
        return (
            <div className="product-loading">
                <div className="product-spinner"></div>
                <p>Загрузка товара...</p>
            </div>
        );
    }

    if (error || !product) {
        return <div className="product-error">{error || 'Товар не найден'}</div>;
    }

    return (
        <div className="product-page">
            <div className="product-breadcrumbs">
                Мерч • Открытки • {product.name}
            </div>

            <div className="product-container">
                <div className="product-image">
                    {product.image_url ? (
                        <img src={product.image_url} alt={product.name} />
                    ) : (
                        <div className="no-image">Нет изображения</div>
                    )}
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="product-description-short">Коллекция из 10 открыток с репродукциями морских пейзажей</p>
                    <p className="product-price">{product.price} ₽</p>

                    <div className="product-buttons">
                        <button 
                            className="btn-cart" 
                            onClick={addToCart}
                            disabled={addingToCart}
                        >
                            {addingToCart ? 'Добавление...' : 'В корзину'}
                        </button>
                        <button 
                            className="btn-buy" 
                            onClick={goToCheckout}
                        >
                            Купить сейчас
                        </button>
                    </div>

                    <div className="product-details">
                        <h3>Подробнее</h3>
                        <div className="details-list">
                            <div className="detail-row">
                                <span className="detail-label">Вид:</span>
                                <span className="detail-value">Открытка</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Стиль:</span>
                                <span className="detail-value">Пейзаж</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Материалы:</span>
                                <span className="detail-value">Масло</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Размер:</span>
                                <span className="detail-value">29.7×21 см</span>
                            </div>
                        </div>
                    </div>

                    <div className="product-description">
                        <h3>Описание</h3>
                        <p>Коллекция из 10 открыток с репродукциями морских пейзажей</p>
                    </div>

                    <div className="product-tags">
                        <h3>Тэги</h3>
                        <div className="tags-list">
                            <span className="tag">Открытка</span>
                            <span className="tag">Пейзаж</span>
                            <span className="tag">Подарочные</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}