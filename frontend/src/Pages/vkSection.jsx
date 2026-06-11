
import left from './imgs/right.png'
import right from './imgs/left.png'
import './vksection.css'

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function VkSection(){
    
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
       <div className="sliderVkMain">
         <section className='SliderVK'> 
            <div className="vkh2">
                <h2>Cледите за событиями <br /> в  группе <u>ВКонтакте</u></h2>
                  <div className="butsvk">
            <div>    <img onClick={handlePrev} src={left} alt="" /></div>
              <hr />
                <div><img onClick={handleNext} src={right} alt="" /></div>
            </div> 
            </div> 
          

            <div className="vkslider">
              <Swiper
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            slidesPerView={3}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                                dynamicBullets: true,
                            }}
                            speed={1500}
                           
                            
                            loop={true}
                            modules={[ Navigation, Autoplay]}
                            className="swiperVKSlider"
                         breakpoints={{
                                320: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 8,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                }
                            }}
                        
                        >
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide> 
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide>
                            <SwiperSlide className='vkslid'></SwiperSlide>
                        </Swiper>
            </div>
  
           </section>
       </div>
        </>
    )
}