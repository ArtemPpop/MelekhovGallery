import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import right from './imgs/left.png';
import left from './imgs/right.png';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import axios from 'axios';
import './firstSlid.css';
 
const SELECTED_TITLES = [
  'Вид на Светлогорск от гостиницы "Русь"',
  'Гимн Светлогорску',
  'Драконы Балтийского моря. Шторм',
  'Танец со зверем',
  'Вилла Рамибе',
  'Светлогорск Кофе "Вика"',
  'Светлогорск. Полдень',
  'Свет. Тени. И окно в небо. ',
  'Балтийский берег. Вечерний бриз',
  'Ночь, огни фонарей'
];
            const API_URL = '/api/artworks/artworks/';



export default function FirstSlider() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);
 
  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        const allWorks = res.data;

        const filteredSlides = SELECTED_TITLES
          .map(title => allWorks.find(work => work.title === title))
          .filter(work => work !== undefined)  
          .map(work => ({
            img: work.image_url,
            year: work.year ? `${work.year} год` : '',
            title: work.title,
            desc: work.technique || '' 
          }));

        setSlides(filteredSlides);
      } catch (e) {
        console.error('Ошибка загрузки слайдов:', e);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, []);

  const currentSlide = slides[activeIndex] || {};

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (loading) {
    return (
      <div className="first-slider-loading">
        <div className="first-slider-spinner"></div>
        <p>Загрузка слайдов...</p>
      </div>
    );
  }
  
  if (error) return <div>{error}</div>;
  if (slides.length === 0) return <div>Нет данных для отображения</div>;

  return (
    <div style={{ position: 'relative' }} className='Slider1Relative'>
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        speed={800}
        loop={true}
        loopAdditionalSlides={2}
        className="firstSlider"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        initialSlide={0}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div 
              className="slideFirst"
              style={{ 
                backgroundImage: `url(${slide.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="butsleftRightSlid1">
        <div onClick={handlePrev}>   
          <img src={left} alt="Previous" />
        </div>
        <div onClick={handleNext}>   
          <img src={right} alt="Next" />
        </div>
      </div>
      
      <div className="slid1Slider">
        <div className="yearSlid">
          <p>{currentSlide.year}</p>
        </div>
        <div className="nameSlid1">
          <h1>{currentSlide.title}</h1>
        </div>
        <div className="tegsSlid1">
          <p>{currentSlide.desc}</p>
        </div>
      </div>
    </div>
  );
}