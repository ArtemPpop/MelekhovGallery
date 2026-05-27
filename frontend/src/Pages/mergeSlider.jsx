 
import { Swiper, SwiperSlide } from 'swiper/react';
import './MergeSlid.css'
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import left2 from './imgs/left2.png'
import right2 from './imgs/right2.png'

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
                        Мерч
                    </h2>
                    <p>
                     Теперь картины Олега Мелехова станут ближе: <br />
мы запустили линейку коллекционных карт 
с оцифрованными работами художника, которые смогут радовать вашу душу яркими 
и жизнерадостными тонами.
                    </p>
                    <button>Узнать больше </button>
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
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
                </div>
        </SwiperSlide>
         <SwiperSlide className='slid'>
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
                </div>
        </SwiperSlide>
         <SwiperSlide className='slid'>
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
                </div>
        </SwiperSlide>
         <SwiperSlide className='slid'>
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
                </div>
        </SwiperSlide>
        <SwiperSlide className='slid'>
              <section></section>
                <div>
                  <h6> Открытки</h6>
                 <h3>Набор открыток  <br />“Балтийское побережье”</h3>
                 <h5>Коллекция из 10 открыток <br /> с репродукциями морских пейзажей</h5>
                 <h3>450 ₽</h3>
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