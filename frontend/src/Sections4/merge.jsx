import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './merge.css';

export default function Merge() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('все товары');
    const navigate = useNavigate();

    const API_URL = '/api/products/';

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(API_URL);
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

    // Категории для фильтрации
    const categories = ['все товары', 'Открытки', 'Карточки', 'Магниты', 'Брелоки', 'Значки', 'Закладки для книг'];

    // Фильтрация продуктов по категории
    const filteredProducts = useMemo(() => {
        if (selectedCategory === 'все товары') {
            return products;
        }
        return products.filter(product => 
            product.name && product.name.toLowerCase().includes(selectedCategory.toLowerCase())
        );
    }, [products, selectedCategory]);

    // Функция для получения категории товара (из названия)
    const getProductCategory = (productName) => {
        if (!productName) return 'другое';
        for (const cat of categories) {
            if (cat === 'все товары') continue;
            if (productName.toLowerCase().includes(cat.toLowerCase())) {
                return cat;
            }
        }
        return 'другое';
    };

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
            
            <div className="filtresMergeMain">
                <div className="filtresmerge">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={selectedCategory === category ? 'active' : ''}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="worksFounded">
                <p>Найдено: {filteredProducts.length} товаров</p>
                <div className="works">
                    {filteredProducts.map(product => (
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
                                    <h3>{product.variants[0].size && <span>Размер: {product.variants[0].size}</span>}</h3>
                                    <h3>{product.variants[0].color && <span>  {product.variants[0].color}</span>}</h3>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}