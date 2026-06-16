import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart({ isOpen, onClose, onCartUpdate }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const API_URL = 'https://melekhovgallery.ru/api/products/';
const CART_URL = 'https://melekhovgallery.ru/api/cart/';
const CART_ADD_URL = 'https://melekhovgallery.ru/api/cart/add/';

    const loadCart = async () => {
        try {
            const response = await fetch(CART_URL, {
                credentials: "include"
            });
            const data = await response.json();
            setCartItems(data);
            if (onCartUpdate) onCartUpdate(data);
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            loadCart();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleCartUpdate = () => {
            loadCart();
        };
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const updateQuantity = async (variantId, quantityChange) => {
        if (quantityChange === 0 || !variantId) return;

        try {
            setLoading(true);
            const response = await fetch(CART_ADD_URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    variant_id: variantId,
                    quantity: quantityChange
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Ошибка сервера:', errorData);
                alert(errorData?.error || 'Не удалось обновить количество');
                return;
            }

            await loadCart();
        } catch (error) {
            console.error('Ошибка обновления:', error);
            alert('Ошибка соединения с сервером');
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (variantId) => {
        if (!variantId) return;
        
        try {
            setLoading(true);
            await fetch(CART_REMOVE_URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    variant_id: variantId
                })
            });
            await loadCart();
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert('Ошибка удаления товара');
        } finally {
            setLoading(false);
        }
    };

    const getTotalItems = () => {
        return cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
    };

    const getSubtotal = () => {
        return cartItems.reduce((sum, item) => {
            const price = parseFloat(item.product_variant?.price) || 0;
            return sum + (price * (item.quantity || 0));
        }, 0);
    };

    const shippingCost = 50;
    const subtotal = getSubtotal();
    const total = subtotal + shippingCost;

    // Переход на страницу оформления заказа
    const handleCheckout = () => {
        // Сохраняем данные корзины в sessionStorage
        sessionStorage.setItem('checkoutCart', JSON.stringify(cartItems));
        onClose(); // Закрываем корзину
        navigate('/checkout'); // Переходим на страницу оформления
    };

    return (
        <>
            {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
            <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Корзина</h2>
                    <button className="cart-close" onClick={onClose}>✕</button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <p>Корзина пуста</p>
                        </div>
                    ) : (
                        <>
                            {cartItems.map(item => {
                                const variantId = item.product_variant?.id;
                                const quantity = item.quantity || 0;
                                const productName = item.product_variant?.product_name || 'Товар';
                                const price = item.product_variant?.price || 0;
                                
                                return (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <h4>{productName}</h4>
                                            <p className="cart-item-price">{price} ₽</p>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <button 
                                                onClick={() => {
                                                    if (quantity <= 1) {
                                                        removeItem(variantId);
                                                    } else {
                                                        updateQuantity(variantId, -1);
                                                    }
                                                }}
                                                disabled={loading || quantity <= 0}
                                            >–</button>
                                            <span>{quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(variantId, 1)}
                                                disabled={loading}
                                            >+</button>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="cart-summary">
                                <div className="cart-row">
                                    <span>{getTotalItems()} товара</span>
                                    <span>{subtotal} ₽</span>
                                </div>
                                <div className="cart-row">
                                    <span>Доставка</span>
                                    <span>{shippingCost} ₽</span>
                                </div>
                                <div className="cart-row total">
                                    <span>Сумма заказа</span>
                                    <span>{total} ₽</span>
                                </div>
                                <button className="cart-checkout" onClick={handleCheckout}>
                                    К оформлению заказа
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}