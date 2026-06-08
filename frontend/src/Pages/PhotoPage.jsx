import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PhotoPage.css';

export default function PhotoPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentWork, setCurrentWork] = useState(null);
    const [allWorks, setAllWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(100);

    const API_URL = 'http://82.97.252.48/api/artworks/artworks/';

    // Загрузка всех работ
    useEffect(() => {
        const fetchAllWorks = async () => {
            try {
                setLoading(true);
                const res = await axios.get(API_URL);
                const works = Array.isArray(res.data) ? res.data : 
                             (res.data.results ? res.data.results : []);
                setAllWorks(works);
                
                // Находим текущую работу
                const current = works.find(w => w.id === parseInt(id));
                if (current) {
                    setCurrentWork(current);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchAllWorks();
    }, [id]);

    if (loading) {
        return (
            <div className="photo-loading">
                <div className="spinning-loader">
                    <div className="loader-ring"></div>
                    <div className="loader-ring"></div>
                    <div className="loader-ring"></div>
                </div>
                <p>Загрузка изображения...</p>
            </div>
        );
    }

    if (!currentWork) return null;

    return (
        <div className="photo-page">
            {/* Кнопка закрытия - крестик */}
            <button className="close-button" onClick={() => navigate('/galery')}>
                ✕
            </button>

            {/* Ползунок для зума */}
            <div className="zoom-controls">
                <span>100%</span>
                <input 
                    type="range" 
                    min="100" 
                    max="300" 
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseInt(e.target.value))}
                    className="zoom-slider"
                />
                <span>300%</span>
            </div>

            {/* Область с фото - при наведении показываем описание в размытой плашке */}
            <div className="image-container">
                <div className="image-wrapper">
                    <img 
                        src={currentWork.image_url} 
                        alt={currentWork.title}
                        style={{
                            transform: `scale(${zoomLevel / 100})`
                        }}
                    />
                </div>
                
                {/* Описание в размытой плашке - появляется только при наведении */}
                <div className="image-info-overlay">
                    <h3>{currentWork.title}</h3>
                    <p><strong>Год:</strong> {currentWork.year}</p>
                    <p><strong>Техника:</strong> {currentWork.technique}</p>
                    <p><strong>Жанр:</strong> {currentWork.genre}</p>
                    <p><strong>Тема:</strong> {currentWork.theme}</p>
                </div>
            </div>
        </div>
    );
}