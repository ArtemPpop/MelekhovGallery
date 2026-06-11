import React from 'react'
import './kontakt.css'
import call from './img/call.png'
import mess from './img/mess.png'
import max from './img/Max.png'
import vk from './img/vk.png'
import yandex from './img/icons8.png'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Kontakt(){
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true)
        }, 50)
    }, [])

    const maxLength = 500 
 
    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [contactTheme, setContactTheme] = useState('')
    const [contactMessage, setContactMessage] = useState('')
    const [agree, setAgree] = useState(false)

    const CONTACT_URL = '/api/contact/';

    const handleMessageChange = (e) => {
        const value = e.target.value
        if (value.length <= maxLength) {
            setContactMessage(value)
        }
    }

    const sendContact = async () => {
        if (!contactName || !contactEmail || !contactMessage) {
            alert("Заполните все поля")
            return
        }

        if (!agree) {
            alert("Подтвердите обработку данных")
            return
        }

        try {
            await axios.post(CONTACT_URL, {
                name: contactName,
                email: contactEmail,
                theme: contactTheme,
                message: contactMessage
            })

            alert("Сообщение отправлено ✅")

            setContactName('')
            setContactEmail('')
            setContactTheme('')
            setContactMessage('')
            setAgree(false)

        } catch (e) {
            console.error(e)
            alert("Ошибка отправки ❌")
        }
    }

    return(
        <>
            <div className={`Collectionh2 MergeHHeader ${isVisible ? 'show' : ''}`}>
                <h2>Контакты</h2>
                <p>Свяжитесь с нами по любым вопросам</p>
            </div>

            <section className={`contactMain ${isVisible ? 'show' : ''}`}>
                <div className="contTop">
                    <div className="contThemes">
                        <p>Темы: </p>
                    </div>
                    <div className="contSend">
                        <p>Отправить сообщение</p>
                    </div>
                </div>

                <div className="contBottom">
                    <div className="contBotLeft">
                        <div className="contBlocks">
                            <div className="contBlockTop">
                                <h5>Галереи и музеи</h5>
                                <h6>Заинтересованы в организации выставки <br /> работ О.А. Мелехова?</h6>
                            </div> 
                            <div className="contBlockBot">
                                <h5>Коллекционеры</h5>
                                <h6>По вопросам приобретения работ художника обращайтесь по *отдельной почте (предположительно первая)</h6>
                            </div>
                        </div>

                        <div className="contBlocks">
                            <div className="contBlockTop">
                                <h5>СМИ и издательства</h5>
                                <h6>Для получения пресс материалов и организации интервью пишите на *отдельную почту (предположительно вторая)</h6>
                            </div>
                            <div className="contBlockBot">
                                <h5>Образовательные учреждения</h5>
                                <h6>Организация мастер классов лекций и образовательных программ для студентов и учащихся</h6>
                            </div>
                        </div>
                    </div>

                    <div className='contBotRight'>
                        <div className="contLabels">
                            <label className='label1Contact'>
                                <p>Имя и фамилия</p>
                                <input 
                                    placeholder='Имя и фамилия'
                                    type="text"
                                    value={contactName}
                                    onChange={(e)=>setContactName(e.target.value)}
                                />
                            </label>

                            <label className='label1Contact'>
                                <p>Email</p>
                                <input 
                                    placeholder='Email'
                                    type="email"
                                    value={contactEmail}
                                    onChange={(e)=>setContactEmail(e.target.value)}
                                />
                            </label>

                            <label className='label1Contact'>
                                <p>Тема</p>
                                <input 
                                    placeholder='Тема'
                                    type="text"
                                    value={contactTheme}
                                    onChange={(e)=>setContactTheme(e.target.value)}
                                />
                            </label>

                            <label className='label1Contact label2Contact'>
                                <p>Сообщение</p>
                                <textarea 
                                    value={contactMessage}
                                    onChange={handleMessageChange}
                                    maxLength={maxLength}
                                    rows={5}
                                    placeholder="Введите ваше сообщение..."
                                />
                                <h6>{maxLength - contactMessage.length}/500</h6>
                            </label>
                        </div>

                        <div className="checkboxcontact">
                            <input 
                                type="checkbox"
                                checked={agree}
                                onChange={(e)=>setAgree(e.target.checked)}
                            />
                            <p>Я соглашаюсь на обработку персональных данных.</p>
                        </div>

                        <div className="butForContact">
                            <button onClick={sendContact}>
                                Отправить сообщение
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='AddresContact'>
                <h1>Адрес музея</h1>
                <div className="addresBloc">
                    <div className="adressPic">
                        {/* Яндекс карта через iframe */}
                        <iframe 
                             src="https://yandex.ru/map-widget/v1/?ll=20.155751%2C54.939661&z=18&pt=20.155751,54.939661,pm2rdm"
                            loading="lazy"
                            title="Карта музея в Светлогорске"
                        ></iframe>
                    </div>

                    <div className="adressCards">
                        <div className="adresCard1 adresCard2">
                            <div className="imgsForCards">
                                <img src={vk} alt="VK" />
                                <img src={yandex} alt="Yandex" />
                                <img src={max} alt="Max" />
                            </div>
                            <div className="AdresCardText">
                                <h5>Адрес <br />г. Светлогорск</h5>
                                <h6>10:00-20:00</h6>
                            </div>
                        </div>

                        <div className="adresCard1">
                            <div className="imgsForCards">
                                <img src={mess} alt="Email" /> 
                            </div>
                            <div className="AdresCardText">
                                <h5>Email</h5>
                                <h6>example@gmail.com</h6>
                            </div>
                        </div>

                        {/* <div className="adresCard1">
                            <div className="imgsForCards">
                                <img src={call} alt="Phone" /> 
                            </div>
                            <div className="AdresCardText">
                                <h5>Телефон</h5>
                                <h6>+7 (000) XX XX</h6>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}