import { useState, useEffect } from 'react'
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
                <h5>Официальный сайт-галерея художника. <br />
Сохранение и популяризация творческого наследия.</h5>
            </div>
            <div className="rightfut">
                <div className="kontakts2">
                    <h6>Навигация</h6>
                     <Link to="/" >Главная</Link>
            <Link to="/galery" >Галерея</Link>
            <Link to="/merge">Мерч</Link>
            <Link to="/bio"  >Биография</Link>
            <Link to="/coll" >Коллекция</Link>
            <Link to="/tvor" >Творчество</Link>
            <Link to="/mus"  >Музей</Link> 
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