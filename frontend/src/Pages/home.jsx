import './home.css'
import galer from './imgs/galery.png'
import left from './imgs/left.png'
import right from './imgs/right.png'
import liniya from './imgs/liniya.png'
import oleg from './imgs/oleg.png'
import Creat1 from './imgs/Mask1.png'
import Creat2 from './imgs/Mask2.png'
import location from './imgs/location.png'
import middle from './imgs/middle.png'
import rightone from './imgs/rightone.png'

import { Link } from 'react-router-dom'
import Mergeslider from './mergeSlider.jsx'
import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import Firstslid from './firstSlider.jsx' 
import VK from './vkSection.jsx'
import axios from 'axios'

export default function Home() {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const isMobile = useMediaQuery({ maxWidth: 768 })
    const swiperRef = useRef(null)

    const API_URL = '/api/home/'

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

    const handlePrev = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev()
        }
    }

    const handleNext = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext()
        }
    }

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

    return (
        <>
            <section className="galery">
                <Firstslid/>
            </section>
            
            <section className='AboutMuseumSection'>
                <div className="AboutMuseumMain">
                    <div className="AboutMuseumH1">
                        <h1>{data.museum_title || 'Сайт-музей'}</h1>
                        <h3>{data.museum_subtitle || 'О. А. Мелехова'}</h3>
                    </div>
                    <div className="AboutMuseumP">
                        <p>{data.museum_text_1 || ''}</p>
                        <p>{data.museum_text_2 || ''}</p>    
                    </div>
                </div>
            </section>
            
            <section className='bio'>
                <div className="oleg"> 
                    <img src={oleg} alt="" />
                    <div className="rightbio">
                        <h2>{data.biography_title || 'Биография'}</h2>
                        <div className="bio1">
                            <p>{data.biography_text_1 || ''}</p>
                        </div>
                        <div className="bio2">
                            <p>{data.biography_text_2 || ''}</p>
                        </div>
                        <Link to="/bio"><button>Подробнее</button></Link> 
                    </div> 
                </div>
            </section>
            
            <section className='creativity'> 
                <div className="mainCreat">
                    <div className="h2CreatMain">
                        <div className="h2Creativity">
                            <div className="h2-hr">
                                <h2>{data.creativity_title || 'Творчество'}</h2>
                                <hr />
                            </div>
                            <p>{data.creativity_text || ''}</p> 
                            <Link to="/tvor"><button>{data.creativity_button_text || 'Подробнее'}</button></Link>
                        </div>
                    </div>
                </div>
                <div className="NameCreativity">
                    <p>2007 год</p>
                    <h3>Закат</h3>
                </div>
            </section>
            
            <section className="kartiny">
                <div className="left-kartina">
                    <div className="left-small-kartina">
                        <div className="h2-kartina">
                            <h3>Картины</h3>
                            <p>Виртуальная галерея предоставляет доступ к полной коллекции работ</p>
                        </div>
                        <div className="smal1-kartina">
                            <section> <p>2005</p> <h6>Страж врат прохода между мирами</h6></section>
                        </div>
                        <div className="smal1-kartina">
                            <section> <p>1994</p> <h6>Гимн женскому началу</h6></section>
                        </div>
                    </div>
                    <div className="left-big-kartina">
                        <section> <p>2005</p> <h6>Светлогорск. Новые модели осени</h6></section>
                    </div>
                </div>
                <div className="right-kartina">
                    <div className="right-top">
                        <div className="top1-kartina"><section> <p>2005</p> <h6>Розовый вечер</h6></section></div>
                        <div className="top1-kartina"><section> <p>2010</p> <h6>Утро <br /> на маленькой площади</h6></section></div>
                    </div>
                    <div className="bottom-text">
                        <section>
                            <p>Виртуальная галерея предоставляет доступ к полной коллекции работ в высоком разрешении с возможностью детального просмотра</p>
                            <Link to="/galery"><button>Галерея</button></Link>
                        </section>
                    </div>
                </div>
            </section>
            
            <Mergeslider/>
            
            <section className='Museum-Section'> 
                <div className="mainCreat">
                    <div className="h2MuseumMain">
                        <div className="h2Museum">
                            <div className="h2-museum">
                                <h2>{data.museum_project_title || 'О проекте музея'} <br /> {data.museum_project_subtitle || 'в Светлогорске'}</h2>
                                <div className="museumLocation">
                                    <img src={location} alt="" />
                                    <p>{data.museum_address || 'г. Светлогорск'}</p>
                                </div>
                            </div>
                            <p className='museumP'>{data.museum_project_text || ''}</p>
                            <div className="but-hr">
                                <div>
                                    <hr /> 
                                    <Link to="/mus"><button>Узнать больше</button></Link> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* <VK/> */}
        </>
    )
}