import './tvor.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Tvorchestvo() {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_URL = '/api/creativity/'

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get(API_URL)
                const result = Array.isArray(res.data) ? res.data[0] : res.data
                setData(result)
            } catch (err) {
                console.error('Ошибка загрузки:', err)
                setError('Не удалось загрузить данные')
            } finally {
                setLoading(false)
            }
        }
        fetchData()

        setTimeout(() => {
            setIsVisible(true)
        }, 50)
    }, [])

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Загрузка...</p>
            </div>
        )
    }

    if (error || !data) {
        return <div className="error-container">{error || 'Данные не найдены'}</div>
    }

    const getSectionByTitle = (title) => {
        return data.sections?.find(section => section.title === title)
    }

    const obzorStyle = getSectionByTitle('Обзор художественного стиля')
    const masterstvoColor = getSectionByTitle('Мастерство цвета')
    const postroenieComp = getSectionByTitle('Построение композиции')
    const academicRis = getSectionByTitle('Академический рисунок')
    const classicRis = getSectionByTitle('Классический рисунок')
    const natyurmort = getSectionByTitle('Натюрморт как жанр')

    return (
        <div className={`tvorchestvo-container ${isVisible ? 'show' : ''}`}>
            <section className='CreativitySec'>
                <div className="Collectionh2">
                    <h2>{data.title || 'Творчество'}</h2>
                    <p>{data.subtitle || 'Художественный стиль, техники и темы в искусстве О.А. Мелехова'}</p>
                </div>
                <hr />

                {obzorStyle && (
                    <div className="obzorCreat">
                        <div className="obzorMain">
                            <h1>{obzorStyle.title}</h1>
                            <p>{obzorStyle.content}</p>
                        </div>
                    </div>
                )}

                <hr className='hrTvor'/>

                {masterstvoColor && (
                    <div className="obzorCreat obzor">
                        <div className="obzorMain">
                            <h1>{masterstvoColor.title}</h1>
                            <p>{masterstvoColor.content}</p>
                        </div>
                    </div>
                )}

                <hr className='hrTvor'/>

                {postroenieComp && (
                    <div className="obzorCreat obzor">
                        <div className="obzorMain">
                            <h1>{postroenieComp.title}</h1>
                            <p>{postroenieComp.content}</p>
                        </div>
                    </div>
                )}
            </section>

            <section className='jivopis'>
                <div className="tecnicue">  
                    <h1>Техники и методы</h1>
                </div>
                <div className="jivopisMain">
                    {data.techniques && data.techniques.map((tech) => (
                        <div className="jivopis1" key={tech.id}>
                            <div></div>
                            <section>
                                <h1>{tech.title}</h1>
                                <p>{tech.description}</p>
                            </section>
                        </div>
                    ))}
                </div>
            </section>

            <hr className='hrTvor'/>

            {academicRis && (
                <div className="academicPicture">
                    <h1>{academicRis.title}</h1>
                    <div className="academText">
                        {academicRis.content.split('\r\n\r\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            )}

            {classicRis && (
                <div className="academicPicture">
                    <h1>{classicRis.title}</h1>
                    <div className="academText">
                        {classicRis.content.split('\r\n\r\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            )}

            {natyurmort && (
                <div className="academicPicture">
                    <h1>{natyurmort.title}</h1>
                    <div className="academText">
                        {natyurmort.content.split('\r\n\r\n').map((paragraph, idx) => (
                            <p key={idx}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            )}

            <div className="themesAnd">
                <h1>Темы и направления</h1>
                <div className="themeMain">
                    {data.themes && data.themes.map((theme) => (
                        <div className="theme1" key={theme.id}>
                            <div>
                                <h3>{theme.title}</h3>
                                <p>{theme.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="themesAnd">
                <h1>{data.influence_title || 'Влияние на современное искусство'}</h1>
            </div>

            <div className="Shedevr">
                <div className="shedevrH2">
                    <h2>{data.concept_title || 'Искусство Глёз'}</h2>
                    <p>{data.concept_subtitle || 'Искусство сияющей Любви'}</p>
                </div>
                <div className="shedevrContentMain">
                    {data.concept_text && data.concept_text.split('\r\n\r\n').map((paragraph, idx) => (
                        <div className="shedevrContent2" key={idx}>
                            <p>{paragraph}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="poznakomtes">
                <div className="helloMain">
                    <div className="HelloH1">
                        <h1>{data.gallery_block_title || 'Познакомьтесь с работами художника'}</h1>
                    </div>
                    <div className="Hellop">
                        <p>{data.gallery_block_text || 'Посетите виртуальную галерею, чтобы увидеть полную коллекцию произведений О.А. Мелехова'}</p>
                    </div>
                    <div className="hellobuts">
                        <Link to="/galery"><button>Открыть галерею</button></Link>
                        <Link to="/coll"><button>Полная коллекция</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}