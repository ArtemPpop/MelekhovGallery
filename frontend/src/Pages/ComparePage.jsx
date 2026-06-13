import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ComparePage.css';

export default function ComparePage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const { works } = location.state || { works: [] };
    const [work1, work2] = works || [null, null];

    const [zoomLevel, setZoomLevel] = useState(100);
    
    // Независимые позиции для каждой картины
    const [positions, setPositions] = useState([
        { x: 0, y: 0 },
        { x: 0, y: 0 }
    ]);
    
    const [isDragging, setIsDragging] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const startDragRef = useRef({ x: 0, y: 0 });
    
    // Рефы для размеров контейнера и изображения
    const containerRefs = useRef([null, null]);
    const imageRefs = useRef([null, null]);

    // Сбрасываем позицию при изменении зума
    useEffect(() => {
        setPositions([
            { x: 0, y: 0 },
            { x: 0, y: 0 }
        ]);
    }, [zoomLevel]);

    useEffect(() => {
        if (!work1 || !work2) {
            navigate('/galery');
        }
    }, [work1, work2, navigate]);

    // Функция для расчета максимального смещения
    const getMaxOffset = (index) => {
        const container = containerRefs.current[index];
        const img = imageRefs.current[index];
        
        if (!container || !img) return { maxX: 0, maxY: 0, minX: 0, minY: 0 };
        
        const containerRect = container.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        
        // Размеры контейнера
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // Размеры изображения с учетом зума
        const imgWidth = imgRect.width;
        const imgHeight = imgRect.height;
        
        // Вычисляем, насколько изображение больше контейнера
        const extraWidth = Math.max(0, imgWidth - containerWidth);
        const extraHeight = Math.max(0, imgHeight - containerHeight);
        
        // Максимальные смещения (половина от лишнего размера в каждую сторону)
        const maxX = extraWidth / 2;
        const minX = -extraWidth / 2;
        const maxY = extraHeight / 2;
        const minY = -extraHeight / 2;
        
        return { maxX, minX, maxY, minY };
    };

    const handleMouseDown = (e, index) => {
        e.preventDefault();
        setIsDragging(true);
        setActiveIndex(index);
        startDragRef.current = {
            x: e.clientX - positions[index].x,
            y: e.clientY - positions[index].y
        };
    };

    const handleMouseMove = (e) => {
        if (!isDragging || activeIndex === null) return;
        
        let newX = e.clientX - startDragRef.current.x;
        let newY = e.clientY - startDragRef.current.y;
        
        // Применяем ограничения
        const { maxX, minX, maxY, minY } = getMaxOffset(activeIndex);
        
        // Если изображение меньше контейнера, не даем его двигать
        if (maxX === 0 && minX === 0) newX = 0;
        if (maxY === 0 && minY === 0) newY = 0;
        
        // Ограничиваем движение
        newX = Math.max(minX, Math.min(maxX, newX));
        newY = Math.max(minY, Math.min(maxY, newY));
        
        setPositions(prev => prev.map((p, i) => 
            i === activeIndex ? { x: newX, y: newY } : p
        ));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setActiveIndex(null);
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging, activeIndex, positions]);

    if (!work1 || !work2) return null;

    return (
        <div className="compare-page">
            <div className="compare-controls-wrapper">
                <div className="compare-controls-container">
                    <div className="compare-controls-left"></div>
                    
                    <div className="compare-controls-center">
                        <div className="compare-zoom-controls">
                            <span>100%</span>
                            <input 
                                type="range" 
                                min="100" 
                                max="300" 
                                value={zoomLevel}
                                onChange={(e) => setZoomLevel(parseInt(e.target.value))}
                                className="compare-zoom-slider"
                            />
                            <span>300%</span>
                        </div>
                    </div>
                    
                    <div className="compare-controls-right">
                        <button className="compare-close-button" onClick={() => navigate('/galery')}>
                            ✕
                        </button>
                    </div>
                </div>
            </div>

            <div className="compare-container">
                {/* Левая картина */}
                <div className="compare-item">
                    <div 
                        className="compare-image-wrapper"
                        ref={(el) => containerRefs.current[0] = el}
                        onMouseDown={(e) => handleMouseDown(e, 0)}
                        style={{ cursor: isDragging && activeIndex === 0 ? 'grabbing' : 'grab' }}
                    >
                        <img 
                            ref={(el) => imageRefs.current[0] = el}
                            src={work1.image_url} 
                            alt={work1.title}
                            draggable="false"
                            style={{
                                transform: `translate(${positions[0].x}px, ${positions[0].y}px) scale(${zoomLevel / 100})`,
                                transition: isDragging && activeIndex === 0 ? 'none' : 'transform 0.1s'
                            }}
                        />
                    </div>
                    <div className="compare-info-overlay">
                        <h3>{work1.title}</h3>
                        <p><strong>Год:</strong> {work1.year}</p>
                        <p><strong>Техника:</strong> {work1.technique}</p>
                    </div>
                </div>

                {/* Правая картина */}
                <div className="compare-item">
                    <div 
                        className="compare-image-wrapper"
                        ref={(el) => containerRefs.current[1] = el}
                        onMouseDown={(e) => handleMouseDown(e, 1)}
                        style={{ cursor: isDragging && activeIndex === 1 ? 'grabbing' : 'grab' }}
                    >
                        <img 
                            ref={(el) => imageRefs.current[1] = el}
                            src={work2.image_url} 
                            alt={work2.title}
                            draggable="false"
                            style={{
                                transform: `translate(${positions[1].x}px, ${positions[1].y}px) scale(${zoomLevel / 100})`,
                                transition: isDragging && activeIndex === 1 ? 'none' : 'transform 0.1s'
                            }}
                        />
                    </div>
                    <div className="compare-info-overlay">
                        <h3>{work2.title}</h3>
                        <p><strong>Год:</strong> {work2.year}</p>
                        <p><strong>Техника:</strong> {work2.technique}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}