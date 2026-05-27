import { useState, useMemo, useEffect, useRef } from 'react';
import axios from 'axios';
import './merge.css';

export default function Merge() {

    const [allWorks, setAllWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://82.97.252.48/api/artworks/artworks/';

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

        if (period) {
            result = result.filter(work => work.year?.toString() === period);
        }

        if (technique) {
            result = result.filter(work => work.technique === technique);
        }

        if (genre) {
            result = result.filter(work => work.genre === genre);
        }

        if (theme) {
            result = result.filter(work => work.theme === theme);
        }

        switch(sortType) {
            case "period":
                result.sort((a, b) => (a.year || 0) - (b.year || 0));
                break;
            case "technique":
                result.sort((a, b) => (a.technique || "").localeCompare(b.technique || ""));
                break;
            case "genre":
                result.sort((a, b) => (a.genre || "").localeCompare(b.genre || ""));
                break;
            case "theme":
                result.sort((a, b) => (a.theme || "").localeCompare(b.theme || ""));
                break;
            default:
                break;
        }

        return result;
    }, [allWorks, period, technique, genre, theme, sortType]);

    const resetFilters = () => {
        setPeriod("");
        setTechnique("");
        setGenre("");
        setTheme("");
        setSortType("period");
    };
 

    if (loading) return (
        <div className="merge-loading">
            <div className="merge-spinner"></div>
            <p>Загрузка Мерч...</p>
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
                    <button onClick={resetFilters}>Сбросить фильтры</button>

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
                    {filteredAndSortedWorks.map(work => (
                        <div key={work.id} className="work">

                            {work.image_url ? (
                                <img src={work.image_url} alt={work.title} />
                            ) : (
                                <div className="no-image"></div>
                            )}

                            <h1>{work.title}</h1>
                            <h3>{work.year}</h3>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}