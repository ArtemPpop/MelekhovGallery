import './collection.css'
import { useState, useMemo, useEffect, useRef } from 'react'
import axios from 'axios'
import frame1 from './img/Frame200.png'
import frame2 from './img/Frame201.png'
import frame3 from './img/Frame202.png'
import frame4 from './img/Frame203.png'
import frame5 from './img/Frame204.png'

export default function Collection() {

    const [allWorks, setAllWorks] = useState([])
    const [allPhotos, setAllPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchQuery, setSearchQuery] = useState("")
    const [sortType, setSortType] = useState("year")
    const [categoryFilter, setCategoryFilter] = useState("all")
    
    // Режим отображения: "artworks" или "photos"
    const [viewMode, setViewMode] = useState("artworks")

    const API_URL = ' /api/artworks/artworks/'
    const PHOTOS_URL = '/api/photos/'

    const didLoad = useRef(false)

    useEffect(() => {
        if (didLoad.current) return
        didLoad.current = true

        const loadData = async () => {
            try {
                setLoading(true)
                
                const [artworksRes, photosRes] = await Promise.all([
                    axios.get(API_URL),
                    axios.get(PHOTOS_URL)
                ])

                setAllWorks(artworksRes.data)
                setAllPhotos(photosRes.data)

            } catch (e) {
                console.error(e)
                setError("Ошибка загрузки")
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    const handleSearchChange = (e) => setSearchQuery(e.target.value)
    const handleSortChange = (e) => setSortType(e.target.value)
    
    const handleCategoryFilter = (category) => {
        // Если нажимаем на уже активную категорию - сбрасываем фильтр
        if (categoryFilter === category) {
            setCategoryFilter("all")
            setViewMode("artworks")
            return
        }

        setCategoryFilter(category)
        
        // Для фотографий, скульптуры и архива - переключаемся на режим фотографий
        if (category === "photo" || category === "sculpture" || category === "archive") {
            setViewMode("photos")
        } else {
            setViewMode("artworks")
        }
    }

    const filteredAndSortedWorks = useMemo(() => {
        // Если режим фотографий (Фотографии, Скульптура или Архив)
        if (viewMode === "photos") {
            let result = [...allPhotos]
            
            // Фильтрация по категории
            if (categoryFilter !== "all") {
                let categoryMap = {
                    "photo": "Фотографии",
                    "sculpture": "Скульптура",
                    "archive": "Архив"
                }
                
                const targetCategory = categoryMap[categoryFilter]
                if (targetCategory) {
                    result = result.filter(photo => 
                        (photo.category || "").toLowerCase() === targetCategory.toLowerCase()
                    )
                }
            }
            
            // Поиск
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase()
                result = result.filter(photo =>
                    (photo.title || "").toLowerCase().includes(query) ||
                    (photo.description || "").toLowerCase().includes(query) ||
                    (photo.year || "").toString().includes(query) ||
                    (photo.category || "").toLowerCase().includes(query)
                )
            }
            
            // Сортировка
            switch (sortType) {
                case "year":
                    result.sort((a, b) => (a.year || 0) - (b.year || 0))
                    break
                case "year-desc":
                    result.sort((a, b) => (b.year || 0) - (a.year || 0))
                    break
                case "title":
                    result.sort((a, b) => (a.title || "").localeCompare(b.title || ""))
                    break
                default:
                    break
            }
            
            return result
        }

        // Режим произведений (Живопись, Графика)
        let result = [...allWorks]

        if (categoryFilter !== "all" && categoryFilter !== "photo" && categoryFilter !== "sculpture" && categoryFilter !== "archive") {
            result = result.filter(work => {
                const type = (work.artwork_type || "").toLowerCase()
                
                switch(categoryFilter) {
                    case "painting":
                        // Живопись - ищем "живопись" или "картина"
                        return type.includes("живопис") || type.includes("картина")
                    case "graphics":
                        // Графика - ищем "графика"
                        return type.includes("график")
                    default:
                        return true
                }
            })
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            result = result.filter(work =>
                (work.title || "").toLowerCase().includes(query) ||
                (work.description || "").toLowerCase().includes(query) ||
                (work.genre || "").toLowerCase().includes(query) ||
                (work.theme || "").toLowerCase().includes(query) ||
                (work.technique || "").toLowerCase().includes(query) ||
                (work.year || "").toString().includes(query) ||
                (work.artwork_type || "").toLowerCase().includes(query)
            )
        }

        switch (sortType) {
            case "year":
                result.sort((a, b) => (a.year || 0) - (b.year || 0))
                break
            case "year-desc":
                result.sort((a, b) => (b.year || 0) - (a.year || 0))
                break
            case "title":
                result.sort((a, b) => (a.title || "").localeCompare(b.title || ""))
                break
            default:
                break
        }

        return result
    }, [allWorks, allPhotos, searchQuery, sortType, categoryFilter, viewMode])

    // Определяем заголовок для количества
    const getCountLabel = () => {
        if (viewMode === "photos") {
            switch(categoryFilter) {
                case "photo": return "Фотографии"
                case "sculpture": return "Скульптуры"
                case "archive": return "Архив"
                default: return "Фотографии"
            }
        }
        
        switch(categoryFilter) {
            case "painting": return "Живопись"
            case "graphics": return "Графика"
            default: return "Найдено"
        }
    }

    if (loading) return (
        <div className="collection-loading">
            <div className="collection-spinner"></div>
            <p>Загрузка коллекции...</p>
        </div>
    )
    if (error) return <div>{error}</div>

    return (
        <>
            <div className="Collectionh2">
                <h2>Коллекция</h2>
                <p>Полный каталог оцифрованных работ О.А. Мелехова</p>
            </div>

            <div className="collSort1">
                <div className="ColSortMain">
                    <button 
                        className={`category-btn ${categoryFilter === "sculpture" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("sculpture")}
                    >
                        <div className="Collection1">
                            <img src={frame1} alt="" /> 
                            <p>Скульптуры</p>
                        </div>
                    </button>
                    <button 
                        className={`category-btn ${categoryFilter === "painting" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("painting")}
                    >
                        <div className="Collection1">
                            <img src={frame2} alt="" /> 
                            <p>Живопись</p>
                        </div>
                    </button>
                    <button 
                        className={`category-btn ${categoryFilter === "graphics" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("graphics")}
                    >
                        <div className="Collection1">
                            <img src={frame3} alt="" /> 
                            <p>Графика</p>
                        </div>
                    </button>
                    <button 
                        className={`category-btn ${categoryFilter === "photo" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("photo")}
                    >
                        <div className="Collection1">
                            <img src={frame4} alt="" /> 
                            <p>Фотографии</p>
                        </div>
                    </button>
                    <button 
                        className={`category-btn ${categoryFilter === "archive" ? "active" : ""}`}
                        onClick={() => handleCategoryFilter("archive")}
                    >
                        <div className="Collection1">
                            <img src={frame5} alt="" /> 
                            <p>Архив</p>
                        </div>
                    </button>
                </div>
            </div>

            <div className="worksFounded">
                <div className='worksFoundedP'>
                    <p>{getCountLabel()}: {filteredAndSortedWorks.length}</p>
                </div>

                <div className="works">
                    {filteredAndSortedWorks.map(item => (
                        <div key={item.id} className="work">
                            <div className="work-image-placeholder">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.title} />
                                ) : (
                                    <div className="no-image"></div>
                                )}
                            </div>
                            <div className="work-year-large">
                                <h6>{item.year}</h6>
                            </div>

                            <div className="work-info">
                                <h1>{item.title}</h1>
                                {viewMode === "photos" ? (
                                    <h6> {item.description}</h6>
                                ) : (
                                    <h6>#{item.technique} </h6>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}