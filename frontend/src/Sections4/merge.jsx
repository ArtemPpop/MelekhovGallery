import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './merge.css';

export default function Merge() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const API_URL = '/api/products/';

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(API_URL);
                // API возвращает массив продуктов
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                setError('Ошибка загрузки товаров');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="merge-loading">
                <div className="merge-spinner"></div>
                <p>Загрузка товаров...</p>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <section className="secGalery">
            <div className="Collectionh2">
                <h2>Сувенирная продукция</h2>
                <p>Авторские сувениры с репродукциями работ О.А. Мелехова</p>
            </div>
            <hr />

            <div className="worksFounded">
                <p>Найдено: {products.length} товаров</p>
                <div className="works">
                    {products.map(product => (
                        <div
                            key={product.id}
                            className="work"
                            onClick={() => navigate(`/product/${product.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {product.image_url ? (
                                <img src={product.image_url} alt={product.name} />
                            ) : (
                                <div className="no-image">Нет фото</div>
                            )}
                            <h1>{product.name}</h1>
                            <h3>{product.price} ₽</h3>
                            {product.variants && product.variants.length > 0 && (
                                <div className="variants-info">
                                    {product.variants[0].size && <span>Размер: {product.variants[0].size}</span>}
                                    {product.variants[0].color && <span> / {product.variants[0].color}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}