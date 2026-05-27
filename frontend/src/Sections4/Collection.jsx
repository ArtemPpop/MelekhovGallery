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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchQuery, setSearchQuery] = useState("")
    const [sortType, setSortType] = useState("year")
    const [categoryFilter, setCategoryFilter] = useState("all")

    const API_URL = 'http://82.97.252.48/api/artworks/artworks/'

    const didLoad = useRef(false)

    useEffect(() => {
        if (didLoad.current) return
        didLoad.current = true

        const loadData = async () => {
            try {
                setLoading(true)

                const res = await axios.get(API_URL)

                setAllWorks(res.data)

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
        // Если нажимаем на уже активную категорию - сбрасываем фильтр (показываем все)
        if (categoryFilter === category) {
            setCategoryFilter("all")
        } else {
            setCategoryFilter(category)
        }
    }

    const filteredAndSortedWorks = useMemo(() => {
        let result = [...allWorks]

        if (categoryFilter !== "all") {
            result = result.filter(work => {
                const technique = (work.technique || "").toLowerCase()
                const genre = (work.genre || "").toLowerCase()
                const title = (work.title || "").toLowerCase()
                
                switch(categoryFilter) {
                    case "sculpture":
                        return technique.includes("скульпт") || genre.includes("скульпт") || title.includes("скульпт")
                    case "painting":
                        return technique.includes("живопис") || genre.includes("живопис") || title.includes("живопис")
                    case "graphics":
                        return technique.includes("график") || genre.includes("график") || title.includes("график")
                    case "photo":
                        return technique.includes("фото") || genre.includes("фото") || title.includes("фото")
                    case "archive":
                        return technique.includes("архив") || genre.includes("архив") || title.includes("архив")
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
                (work.year || "").toString().includes(query)
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
    }, [allWorks, searchQuery, sortType, categoryFilter])

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
                    <p>Найдено: {filteredAndSortedWorks.length}</p>
                </div>

                <div className="works">
                    {filteredAndSortedWorks.map(work => (
                        <div key={work.id} className="work">
                            <div className="work-image-placeholder">
                                {work.image_url ? (
                                    <img src={work.image_url} alt={work.title} />
                                ) : (
                                    <div className="no-image"></div>
                                )}
                            </div>
                            <div className="work-year-large">
                                <p>{work.year}</p>
                            </div>

                            <div className="work-info">
                                <h1>{work.title}</h1>

                                {/* <h6 className="work-description">
                                    {work.description || "Описание отсутствует"}
                                </h6> */}

                                <h6>
                                    {work.tags && `Размеры: ${work.size}`}
                                </h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}