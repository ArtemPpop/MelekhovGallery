// Checkout.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
    const navigate = useNavigate();
    const [checkoutData, setCheckoutData] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        city: '',
        street: '',
        postalCode: '',
        apartment: '',
        deliveryMethod: 'СДЭК'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Получаем данные из sessionStorage
        const data = sessionStorage.getItem('checkoutData');
        if (data) {
            setCheckoutData(JSON.parse(data));
        } else {
            // Если данных нет, перенаправляем на мерч
            navigate('/merge');
        }
    }, [navigate]);

    const deliveryMethods = ['СДЭК', 'Boxberry', 'Почта России', 'Ozon'];
    const shippingCost = 80;
    const subtotal = checkoutData ? parseFloat(checkoutData.product?.price) || 0 : 0;
    const total = subtotal + shippingCost;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.fullName || !formData.email || !formData.city || !formData.street) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/orders/create/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: formData.fullName,
                    email: formData.email,
                    city: formData.city,
                    street: formData.street,
                    postal_code: formData.postalCode,
                    apartment: formData.apartment,
                    delivery_method: formData.deliveryMethod,
                    items: checkoutData ? [checkoutData] : [],
                    total: total
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка оформления заказа');
            }

            const data = await response.json();
            alert('Заказ успешно оформлен!');
            sessionStorage.removeItem('checkoutData');
            navigate('/');
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка оформления заказа. Попробуйте позже.');
        } finally {
            setLoading(false);
        }
    };

    if (!checkoutData) {
        return <div className="checkout-loading">Загрузка...</div>;
    }

    return (
        <div className="checkout-page">
            <div className="checkout-panel">
                <div className="checkout-header">
                    <h2>Оформление заказа</h2>
                    <button className="checkout-close" onClick={() => navigate('/merge')}>✕</button>
                </div>

                <div className="checkout-content">
                    <form onSubmit={handleSubmit}>
                        <div className="checkout-section">
                            <h3>Информация о покупателе</h3>
                            
                            <div className="form-group">
                                <label>ФИО</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Иванов Иван Иванович"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@mail.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="checkout-section">
                            <h3>Адрес доставки</h3>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Город</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Москва"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Улица</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        placeholder="ул. Тверская, д. 1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Индекс</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="101000"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Квартира</label>
                                    <input
                                        type="text"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleChange}
                                        placeholder="15"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="checkout-section">
                            <h3>Способы доставки</h3>
                            <div className="delivery-options">
                                {deliveryMethods.map(method => (
                                    <label key={method} className="delivery-option">
                                        <input
                                            type="radio"
                                            name="deliveryMethod"
                                            value={method}
                                            checked={formData.deliveryMethod === method}
                                            onChange={handleChange}
                                        />
                                        {method}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="checkout-section">
                            <h3>Ваш заказ</h3>
                            <div className="order-summary">
                                <div className="order-row">
                                    <span>{checkoutData.product?.name || 'Товар'}</span>
                                    <span>{subtotal} ₽</span>
                                </div>
                                <div className="order-row">
                                    <span>Доставка</span>
                                    <span>{shippingCost} ₽</span>
                                </div>
                                <div className="order-row total">
                                    <span>Итого</span>
                                    <span>{total} ₽</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="checkout-submit"
                            disabled={loading}
                        >
                            {loading ? 'Оформление...' : 'Завершить оформление'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}