 
import { Swiper, SwiperSlide } from 'swiper/react';
import './MergeSlid.css'
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import left2 from './imgs/left2.png'
import right2 from './imgs/right2.png'
import card1 from './imgs/MergeCard1.png'
import card2 from './imgs/MergeCard2.png'
import { Link } from 'react-router-dom'
 
// import required modules
import { Pagination, Navigation } from 'swiper/modules';


 export default function mergeSlider(){
     const swiperRef = useRef(null);  

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
    return(
        
        <>
         <section className='mergeSec'>
            
                <div className="MergeSlidMain">
                   
                
                    <div className="h2Creativity mergeH2">
                    <h2>
                        Сувенирная <br /> продукция
                    </h2>
                    <p style={{
                      maxWidth: "375px",
                      wordBreak: "break-word"
                    }}>
                      Теперь картины Олега Мелехова станут ближе: мы запустили линейку коллекционных карт с оцифро&shy;ванными работами художника, которые смогут радо&shy;вать вашу душу яркими и жизнерадостными тонами.
                    </p>
                    <Link to="/merge"><button>Узнать больше </button></Link> 
                </div>
                
                <div className="rightMerge"> 
                   <div className="rightMainMerge">
                     <div className="butsForMerge">
                       <div> <img onClick={handlePrev}src={left2} alt="" /></div>
                        <hr />
                        <div><img onClick={handleNext} src={right2} alt="" /></div>
                    </div>
                  
                    <div className="mergeSlid">
                      <Swiper
  onSwiper={(swiper) => (swiperRef.current = swiper)} 
  slidesPerView={2}  
  spaceBetween={5}
  breakpoints={{
    0: {
      slidesPerView: 2,   
      spaceBetween: 8,
    },
    801: {
      slidesPerView: 2,   
      spaceBetween: 15,
    }
  }}
  pagination={{ clickable: true }}
  modules={[Navigation]}
  className="mergeSwiper"
>
        <SwiperSlide className='slid'>
              <section><img src={card1} alt="" /></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 открыток с репродукциями популярных работ художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section><img src={card2} alt="" /></section>
                <div>
                  <h6> Книжные закладки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 книжных закладок <br /> с репродукциями популярных работ<br /> художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide> 
        <SwiperSlide className='slid'>
              <section><img src={card1} alt="" /></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 открыток с репродукциями популярных работ художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section><img src={card2} alt="" /></section>
                <div>
                  <h6> Книжные закладки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 книжных закладок <br /> с репродукциями популярных работ<br /> художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide> 
        <SwiperSlide className='slid'>
              <section><img src={card1} alt="" /></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 открыток с репродукциями популярных работ художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section><img src={card2} alt="" /></section>
                <div>
                  <h6> Книжные закладки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 книжных закладок <br /> с репродукциями популярных работ<br /> художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide> 
        <SwiperSlide className='slid'>
              <section><img src={card1} alt="" /></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 открыток с репродукциями популярных работ художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section><img src={card2} alt="" /></section>
                <div>
                  <h6> Книжные закладки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 5 книжных закладок <br /> с репродукциями популярных работ<br /> художника на тему "Светлогорска"</h5>
                 <h5>В разработке</h5>
                </div>
        </SwiperSlide> 
         
        
      </Swiper>

                    </div>
                   </div>
                </div>
                </div> 
            </section>
        </>
    )
 }