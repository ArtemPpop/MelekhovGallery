import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import max from './imgs/Max.png'
import vk from './imgs/vk.png'
import yandex from './imgs/icons8.png'
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
                <section> 
                    <a href="https://vk.com/melekhov_art"><img src={vk} alt="" /></a>
                    <a href="https://dzen.ru/id/69b30d967c578d071b889373?share_to=link"><img src={yandex} alt="" /></a>
                    <a href="https://max.ru/join/acAzseAAZ1_PBeI6ETX2a7b0WXLoRST3cnHT32Ke8r8"><img src={max} alt="" /></a>
                </section>
            </div>
            <div className="rightfut">
                <div className="kontakts2">
                    <h6>Навигация</h6>
                     <Link to="/" >Главная</Link>
            <Link to="/galery" >Галерея</Link>
            <Link to="/coll" >Коллекция</Link>
            <Link to="/bio"  >Биография</Link>
            <Link to="/tvor" >Творчество</Link> 
            <Link to="/merge">Сувенирная продукция</Link>
                </div>
                <hr />
                <div className="kontakts">
                    <h6>Контакты</h6>
                    <p>г. Калининград </p>
                    <p>Калининградская область</p>
                    <p>Email: o_melekhov@gmail.com</p> 
                </div>
            </div>
           </div>
           <div className="bottomfut">
            <p>© 2026 Олег Александрович Мелехов. Все права защищены. <a a href="/public/privacy-policy.pdf" target="_blank">  Политика конфиденциальности</a>  </p> 
           </div>
           </div>
        </section>
    );
}