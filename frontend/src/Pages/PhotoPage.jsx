import { useState, useEffect, useRef } from 'react';
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
    const imageWrapperRef = useRef(null);
            const API_URL = '/api/artworks/artworks/';

    useEffect(() => {
        const fetchAllWorks = async () => {
            try {
                setLoading(true);
                const res = await axios.get(API_URL);
                const works = Array.isArray(res.data) ? res.data : 
                             (res.data.results ? res.data.results : []);
                setAllWorks(works);
                 
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

    // Рассчитываем реальный размер фото при зуме
    const getImageStyle = () => {
        if (zoomLevel === 100) {
            return {
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
                transform: 'none'
            };
        }
        // При зуме убираем ограничения и просто масштабируем
        return {
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'center 0'
        };
    };

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Загрузка изображений...</p>
        </div>
    );
            

    if (!currentWork) return null;

    return (
        <div className="photo-page"> 
            <div className="controls-wrapper">
                <div className="controls-container">
                    <div className="controls-left"></div>
                    
                    <div className="controls-center">
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
                    </div>
                    
                    <div className="controls-right">
                        <button className="close-button" onClick={() => navigate('/galery')}>
                            ✕
                        </button>
                    </div>
                </div>
            </div>

            {/* Область с фото */}
            <div className="image-container">
                <div className="image-wrapper" ref={imageWrapperRef}>
                    <img 
                        src={currentWork.image_url} 
                        alt={currentWork.title}
                        style={getImageStyle()}
                    />
                </div>
                
                <div className="image-info-overlay">
                    <h3>{currentWork.title}</h3>
                    <p><strong>Год:</strong> {currentWork.year}</p>
                    <p><strong>Техника:</strong> {currentWork.technique}</p>
                    <p><strong>Жанр:</strong> {currentWork.genre}</p>
                </div>
            </div>
        </div>
    );
}