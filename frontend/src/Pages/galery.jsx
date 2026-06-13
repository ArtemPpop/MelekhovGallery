import { useState, useMemo, useEffect, useRef } from 'react';
import axios from 'axios';
import './galery.css';
import { useNavigate } from 'react-router-dom';

export default function Galery() {
    const [allWorks, setAllWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = '/api/artworks/artworks/';

    const [compareMode, setCompareMode] = useState(false);
    const [selectedForCompare, setSelectedForCompare] = useState([]);

    const navigate = useNavigate();
    const didLoad = useRef(false);

    useEffect(() => {
        if (didLoad.current) return;
        didLoad.current = true;

        const loadData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(API_URL);
                setAllWorks(res.data);
            } catch (e) {
                console.error(e);
                setError("Ошибка загрузки");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const [period, setPeriod] = useState("");
    const [technique, setTechnique] = useState("");
    const [genre, setGenre] = useState("");
    const [theme, setTheme] = useState("");
    const [sortType, setSortType] = useState("period");

    const periods = [...new Set(allWorks.map(w => w.year))].sort();
    const techniques = [...new Set(allWorks.map(w => w.technique))];
    const genres = [...new Set(allWorks.map(w => w.genre))];
    const themes = [...new Set(allWorks.map(w => w.theme))];

    const filteredAndSortedWorks = useMemo(() => {
        let result = [...allWorks];
        if (period) result = result.filter(work => work.year?.toString() === period);
        if (technique) result = result.filter(work => work.technique === technique);
        if (genre) result = result.filter(work => work.genre === genre);
        if (theme) result = result.filter(work => work.theme === theme);

        switch(sortType) {
            case "period": result.sort((a, b) => (a.year || 0) - (b.year || 0)); break;
            case "technique": result.sort((a, b) => (a.technique || "").localeCompare(b.technique || "")); break;
            case "genre": result.sort((a, b) => (a.genre || "").localeCompare(b.genre || "")); break;
            case "theme": result.sort((a, b) => (a.theme || "").localeCompare(b.theme || "")); break;
            default: break;
        }
        return result;
    }, [allWorks, period, technique, genre, theme, sortType]);

    // Логика сравнения
    const handleCompareClick = () => {
        if (!compareMode) {
            // Включаем режим выбора
            setCompareMode(true);
            setSelectedForCompare([]);
        } else {
            // Если выбрано 2 картины - переходим на страницу сравнения
            if (selectedForCompare.length === 2) {
                navigate('/compare', { state: { works: selectedForCompare } });
            } 
            // В любом другом случае (0 или 1 картина) - просто выключаем режим
            else {
                setCompareMode(false);
                setSelectedForCompare([]);
            }
        }
    };

    const handleWorkClick = (work) => {
        if (!compareMode) {
            // Обычный переход на страницу фото
            navigate(`/work/${work.id}`);
            return;
        }

        // Режим сравнения
        const isSelected = selectedForCompare.some(w => w.id === work.id);
        
        if (isSelected) {
            // Если уже выбрана - убираем
            setSelectedForCompare(selectedForCompare.filter(w => w.id !== work.id));
        } else {
            // Если не выбрана - добавляем, но не больше 2
            if (selectedForCompare.length < 2) {
                setSelectedForCompare([...selectedForCompare, work]);
            }
        }
    };

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Загрузка галереи...</p>
        </div>
    );

    if (error) return <div>{error}</div>;

    return (
        <section className='secGalery'>
            <div className="Collectionh2">
                <h2>Виртуальная галерея</h2>
                <p>Интерактивная экспозиция работ</p>
            </div>
            <hr />
            <div className="filtresMain">
                <div className="filtres">
                    <label className='filtr1'>
                        <p>Период</p>
                        <select value={period} onChange={e => setPeriod(e.target.value)}>
                            <option value="">Все периоды</option>
                            {periods.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </label>
                    <label className='filtr1'>
                        <p>Техника</p>
                        <select value={technique} onChange={e => setTechnique(e.target.value)}>
                            <option value="">Все техники</option>
                            {techniques.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </label>
                    <label className='filtr1'>
                        <p>Жанр</p>
                        <select value={genre} onChange={e => setGenre(e.target.value)}>
                            <option value="">Все жанры</option>
                            {genres.map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </label>
                    <label className='filtr1'>
                        <p>Тема</p>
                        <select value={theme} onChange={e => setTheme(e.target.value)}>
                            <option value="">Все темы</option>
                            {themes.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="sorts">
                    <button 
                        onClick={handleCompareClick}
                        style={{
                            borderColor: compareMode ? '#344163' : '#CFCECC',
                            backgroundColor: compareMode ? '#415CBD' : 'transparent',
                            color: compareMode ? '#FFFFFF' : '#3B3534'
                        }}
                    >
                        {compareMode ? 'Сравнить выбранные' : 'Сравнить картины'}
                    </button>

                    <select value={sortType} onChange={e => setSortType(e.target.value)}>
                        <option value="period">По годам</option>
                        <option value="technique">По технике</option>
                        <option value="genre">По жанру</option>
                        <option value="theme">По теме</option>
                    </select>
                </div>
            </div>
            <hr />
            <div className="worksFounded">
                <p>Найдено: {filteredAndSortedWorks.length} работ</p>

                <div className="works">
                    {filteredAndSortedWorks.map(work => {
                        const isSelected = selectedForCompare.some(w => w.id === work.id);
                        return (
                            <div
                                key={work.id}
                                className="work"
                                onClick={() => handleWorkClick(work)}
                                style={{
                                    cursor: 'pointer',
                                    border: compareMode && isSelected ? '3px solid #344163' : '1px solid #C3B9AC',
                                    boxShadow: compareMode && isSelected ? '0 0 15px rgba(52, 65, 99, 0.3)' : 'none'
                                }}
                            >
                                {work.image_url ? (
                                    <img src={work.image_url} alt={work.title} />
                                ) : (
                                    <div className="no-image"></div>
                                )}
                                <h1>{work.title}</h1>
                                <h3>{work.year}</h3>
                                <h6>#{work.technique} </h6>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}