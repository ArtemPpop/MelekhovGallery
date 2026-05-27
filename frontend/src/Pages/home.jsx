import './home.css'
import galer from './imgs/galery.png'
import left from './imgs/left.png'
import right from './imgs/right.png'
import liniya from './imgs/liniya.png'
import oleg from './imgs/oleg.png'
import Creat1 from './imgs/Mask1.png'
import Creat2 from './imgs/Mask2.png'
import location from './imgs/location.png'

import Mergeslider from './mergeSlider.jsx'
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import Firstslid from './firstSlider.jsx'
import { Link } from 'react-router-dom'
import VK from './vkSection.jsx'
export default function Home() {
 const isMobile = useMediaQuery({ maxWidth: 768 });

    const shortText = `Vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.`;

    const longText = `Vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.`;

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

    return (
        <>
            <section className="galery">
                 
                <Firstslid/>
            </section>
            <section className='AboutMuseumSection'>
                <div className="AboutMuseumMain">
                   <div className="AboutMuseumH1">
                    <h1>Сайт-музей</h1>
                    <h3>О. А. Мелехова</h3>
                   </div>
                   <div className="AboutMuseumP">
                    <p>Пространство, посвященное сохранению и изучению творческого наследия художника. 
                    Здесь представлены произведения разных периодов, архивные материалы 
                   <br /> и исследования художественного метода.</p>
                    <p>Виртуальная экспозиция доступна для всех, кто интересуется современным 
                    искусством и стремится глубже понять процессы художественного творчества.
                    </p>    
                   </div>

                </div>
            </section>
            
            <section className='bio'>
                
                <div className="oleg"> 
                    <img src={oleg} alt="" />
                    
                     <div className="rightbio ">
                    <h2>Биография</h2>
                    <div className="bio1">
                       
                        <p>Родился в 1946 году в г. Берлине. Сочетает в своём творчестве 
                        мастерское владение живописью, графикой, скульптурой 
                        и фотографией. Художник известен своей педагогической 
                        деятельностью, которой посвятил 20 лет своей жизни.
                    </p>
                    </div>
                    <div className="bio2">

                         <p>Олег Мелехов основал новое направление в искусстве третьего тысячелетия 
                         «Искусство Глёз». «Искусство Глёз — это Искусство сияющей Любви»:
                         искусство красоты и добра, сочетает в себе гармонию чистого цвета, 
                         ясность композиционного строя и изысканную пластику форм.
                         </p>
                       
                       
                       
                    </div>
                      <button>Подробнее</button>
                    
                </div> 
                </div>
               
            </section>
            <section className='creativity'> 
               <div className="mainCreat">
                 <div className="h2CreatMain">
                
                    <div className="h2Creativity">
                  <div className="h2-hr">
                      <h2>Творчество</h2>
                    <hr />
                  </div>
                        <p  >На протяжении всей сознательной жизни Олег Мелехов стремился к искусству.
                             Он брал вдохновение ото всюду: в городских пейзажах, в исторических фигурах, 
                             в своих чувствах и близких людях. Он впитывал знания, которыми делились более 
                             опытные художники, искал свой стиль. Он стал основателем стиля "Искусство Глёз" - 
                             искусства сияющей любви, и он посвятил в это искусство своих учеников.
                             </p>
         
                        <button>Побробнее </button>
                     
                </div>
                 </div>
                 
               </div>
               <div className="h2-kartina NameCreativity">
                <h3>2007 год</h3>
                            <p>Закат</p>
               </div>
                 
            </section>
            <section className="kartiny">
                <div className="left-kartina">
                    <div className="left-small-kartina">
                        <div className="h2-kartina">
                            <h3>Картины</h3>
                            <p>Виртуальная галерея предоставляет доступ к полной коллекции работ</p>
                        </div>
                        <div className="smal1-kartina">
                            <section> <p>xxxx год</p> <h6>Название картины</h6></section>
                        </div>
                        <div className="smal1-kartina">
                            <section> <p>xxxx год</p> <h6>Название картины</h6></section>
                        </div>
                    </div>
                    <div className="left-big-kartina">
                        <section> <p>xxxx год</p> <h6>Название картины</h6></section>
                    </div>
                </div>
                <div className="right-kartina">
                    <div className="right-top">
                        <div className="top1-kartina"><section> <p>xxxx год</p> <h6>Название картины</h6></section></div>
                        <div className="top1-kartina"><section> <p>xxxx год</p> <h6>Название картины</h6></section></div>
                    </div>
                    <div className="bottom-text">
                       <section>
                         <p>Виртуальная галерея  предоставляет доступ к полной коллекции работ
                        в высоком разрешении с возможностью детального просмотра</p>
                        <button>Галерея</button>
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
                    <h2>О проекте музея <br /> в Светлогорске</h2>
                    <div className="museumLocation">
                        <img src={location} alt="" />
                        <p>г. Город, ул. Улица. д. 1, кв. 2 <br /> Мulputate eget, arcu.</p>
                    </div>
                </div>
                        <p  className='museumP'>Это пространство, где будут 
                            жить только оригиналы заслуженного художника РФ Олега 
                            Мелехова. Ничего лишнего — только холсты, кисть и авторский 
                            взгляд. По задумке музей будет в Светлогорске, но точные даты 
                            создания пока не известны. 
                            Следите за новостями на нашем сайте, чтобы узнать подробности.

    </p>
     <div className="but-hr">
                       <div>

                           <hr />
                       <button>Узнать больше  </button>
                       </div>
              
                  </div>
         
                       
                     
                </div>
                 </div>
                 
               </div>
                 
            </section>
          <VK/>
         
        </>
    );
}
