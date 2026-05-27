import { useState } from 'react';

import { Link } from 'react-router-dom'
import './fut.css'
export default function Futter() {

    return (
        <section className='futSection'>
           <div className="mainfut">
            <div className="topfut">
             <div className="leftfut">
                <div className="logo logo2">
                    <h2>Олег Мелехов</h2>
                    <p>Заслуженный художник России</p>
                </div>
                <h5>Официальный сайт-галерея художника.<wbr /> Сохранение&nbsp; и&nbsp; популяризация творческого наследия.</h5>
            </div>
            <div className="rightfut">
                <div className="kontakts2">
                    <h6>Навигация</h6>
                    <Link to="/home" >Главная</Link>
                    <Link to="/gallery" >Галерея</Link>
                    <Link to="/creativity" >Творчество</Link>
                    <Link to="/events"     >События</Link>
                    <Link to="/contacts"   >Контакты</Link>
                </div>
                <hr />
                <div className="kontakts">
                    <h6>Контакты</h6>
                    <p> Калининградская область</p>
                    <p>Email: info@melekhov-art.ru</p>
                    <p>Тел: +7 (4012) XXX-XXX</p>
                </div>
            </div>
           </div>
           <div className="bottomfut">
            <p>© 2026 Олег Александрович Мелехов. Все права защищены.</p>
           </div>
           </div>
        </section>
    );
}