import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ArchiveViewer.css'

export default function ArchiveViewer() {
    const { photoId } = useParams()
    const navigate = useNavigate()
    
    const [allPhotos, setAllPhotos] = useState([])
    const [currentPhoto, setCurrentPhoto] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const PHOTOS_URL = '/api/photos/'
 
    const requiredTitles = [
        'Начало церемонии открытия скульптуры Царевны Лягушки',
        'Открытие скульптуры собравшимся',
        'Первый заместитель, Олег снимает фату со скульптуры',
        'Поэт Валерий Иванович Петровский',
        'Слова благодарности художнику',
        'Художник и его жена рядом со скульптурой Царевны лягушки'
    ]

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(PHOTOS_URL)
                const allPhotosData = Array.isArray(response.data) ? response.data : []
                 
                const filteredPhotos = allPhotosData.filter(photo => 
                    requiredTitles.includes(photo.title)
                )
                 
                filteredPhotos.sort((a, b) => {
                    return requiredTitles.indexOf(a.title) - requiredTitles.indexOf(b.title)
                })
                
                setAllPhotos(filteredPhotos)
                 
                let initialIndex = 0
                if (photoId) {
                    const foundIndex = filteredPhotos.findIndex(p => p.id === parseInt(photoId))
                    if (foundIndex !== -1) {
                        initialIndex = foundIndex
                    }
                }
                
                setCurrentIndex(initialIndex)
                setCurrentPhoto(filteredPhotos[initialIndex])
            } catch (err) {
                console.error('Ошибка загрузки:', err)
                setError('Не удалось загрузить фотографии')
            } finally {
                setLoading(false)
            }
        }
        
        fetchPhotos()
    }, [photoId])
 
    const goToPrevious = () => {
        if (allPhotos.length === 0) return
        
        const newIndex = currentIndex === 0 
            ? allPhotos.length - 1 
            : currentIndex - 1
        
        setCurrentIndex(newIndex)
        setCurrentPhoto(allPhotos[newIndex])
    }
 
    const goToNext = () => {
        if (allPhotos.length === 0) return
        
        const newIndex = currentIndex === allPhotos.length - 1 
            ? 0 
            : currentIndex + 1
        
        setCurrentIndex(newIndex)
        setCurrentPhoto(allPhotos[newIndex])
    }
 
    const goToPhoto = (index) => {
        setCurrentIndex(index)
        setCurrentPhoto(allPhotos[index])
    }
 
    const handleClose = () => {
        navigate('/bio')
    }
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                goToPrevious()
            } else if (e.key === 'ArrowRight') {
                goToNext()
            } else if (e.key === 'Escape') {
                handleClose()
            }
        }
        
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentIndex, allPhotos])

    if (loading) {
        return (
            <div className="archive-viewer-loading">
                <div className="spinner"></div>
                <p>Загрузка...</p>
            </div>
        )
    }

    if (error || !currentPhoto) {
        return (
            <div className="archive-viewer-error">
                <p>{error || 'Фотография не найдена'}</p>
                <button onClick={handleClose}>Вернуться</button>
            </div>
        )
    }

    return (
        <div className="archive-viewer-overlay" onClick={handleClose}>
            <div className="archive-viewer" onClick={(e) => e.stopPropagation()}>
                 
                <button className="close-button" onClick={handleClose}>✕</button>
                
                <div className="archive-viewer-content"> 
                    <div className="thumbnails-column">
                        {allPhotos.map((photo, index) => (
                            <div 
                                key={photo.id}
                                className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToPhoto(index)}
                            >
                                <img src={photo.image_url} alt={photo.title} />
                                <p>{photo.title}</p>
                            </div>
                        ))}
                    </div>
 
                    <div className="main-photo-container">
                        <button 
                            className="nav-button nav-left" 
                            onClick={goToPrevious}
                            aria-label="Предыдущая фотография"
                        >
                            ‹
                        </button>
                        
                        <div className="main-photo">
                            <img src={currentPhoto.image_url} alt={currentPhoto.title} />
                            <div className="photo-caption">
                                <h3>{currentPhoto.title}</h3>
                                {currentPhoto.year && <p>Год: {currentPhoto.year}</p>}
                                {currentPhoto.category && <p>Категория: {currentPhoto.category}</p>}
                            </div>
                        </div>
                        
                        <button 
                            className="nav-button nav-right" 
                            onClick={goToNext}
                            aria-label="Следующая фотография"
                        >
                            ›
                        </button>
                    </div>
                </div>
 
                <div className="photo-counter">
                    {currentIndex + 1} / {allPhotos.length}
                </div>
            </div>
        </div>
    )
}