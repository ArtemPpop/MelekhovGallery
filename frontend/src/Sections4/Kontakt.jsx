import React, { useState, useEffect } from 'react'
import './kontakt.css'
import call from './img/call.png'
import mess from './img/mess.png'
import max from './img/Max.png'
import vk from './img/vk.png'
import yandex from './img/icons8.png'
import axios from 'axios'

export default function Kontakt() {
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [contactName, setContactName] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [contactTheme, setContactTheme] = useState('')
    const [contactMessage, setContactMessage] = useState('')
    const [agree, setAgree] = useState(false)
    const [showPrivacyModal, setShowPrivacyModal] = useState(false)
    const [showValidationAlert, setShowValidationAlert] = useState(false)
    const [validationMessage, setValidationMessage] = useState('')

    const API_URL = '/api/contacts/'
    const CONTACT_URL = '/api/contact/'
    const maxLength = 500

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

    const handleMessageChange = (e) => {
        const value = e.target.value
        if (value.length <= maxLength) {
            setContactMessage(value)
        }
    }

    const closeValidationAlert = () => {
        setShowValidationAlert(false)
    }

    const closePrivacyPolicy = () => {
        setShowPrivacyModal(false)
    }

    const sendContact = async () => {
        // Проверяем все поля и собираем ошибки
        const errors = []
        
        if (!contactName.trim()) {
            errors.push('Укажите ваше имя и фамилию')
        }
        
        if (!contactEmail.trim()) {
            errors.push('Укажите ваш Email')
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim())) {
            errors.push('Введите корректный Email (например: name@mail.ru)')
        }
        
        if (!contactMessage.trim()) {
            errors.push('Напишите текст сообщения')
        }

        // Если есть ошибки валидации — показываем их все
        if (errors.length > 0) {
            setValidationMessage(errors.join('\n'))
            setShowValidationAlert(true)
            return
        }

        // Проверяем галочку согласия
        if (!agree) {
            setShowPrivacyModal(true)
            return
        }

        // Отправка
        try {
            await axios.post(CONTACT_URL, {
                name: contactName,
                email: contactEmail,
                theme: contactTheme,
                message: contactMessage
            })

            alert("✅ Сообщение успешно отправлено!")

            setContactName('')
            setContactEmail('')
            setContactTheme('')
            setContactMessage('')
            setAgree(false)

        } catch (e) {
            console.error(e)
            alert("❌ Ошибка отправки. Попробуйте позже.")
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

    const topics = data.topics || []

    return (
        <>
            {/* ===== МОДАЛКА С PDF ===== */}
            {showPrivacyModal && (
                <div className="privacy-modal-overlay" onClick={closePrivacyPolicy}>
                    <div className="privacy-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="privacy-modal-header">
                            <h2>📄 Политика конфиденциальности</h2>
                            <button className="privacy-modal-close" onClick={closePrivacyPolicy}>✕</button>
                        </div>
                        <div className="privacy-modal-content">
                            <iframe
                                src="/privacy-policy.pdf"
                                width="100%"
                                height="100%"
                                title="Политика конфиденциальности"
                            />
                        </div>
                        <div className="privacy-modal-footer">
                            <button className="btn-close" onClick={closePrivacyPolicy}>Закрыть</button>
                            <button className="btn-download" onClick={() => window.open('/privacy-policy.pdf', '_blank')}>
                                📥 Скачать PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== АЛЕРТ ВАЛИДАЦИИ ===== */}
            {showValidationAlert && (
                <div className="validation-alert-overlay" onClick={closeValidationAlert}>
                    <div className="validation-alert" onClick={(e) => e.stopPropagation()}>
                        <div className="validation-alert-header">
                            <span className="validation-alert-icon">⚠️</span>
                            <button className="validation-alert-close" onClick={closeValidationAlert}>✕</button>
                        </div>
                        <div className="validation-alert-content">
                            <h3>Пожалуйста, заполните все обязательные поля</h3>
                            <div className="validation-errors">
                                {validationMessage.split('\n').map((msg, index) => (
                                    <p key={index}>• {msg}</p>
                                ))}
                            </div>
                        </div>
                        <div className="validation-alert-footer">
                            <button className="validation-alert-btn" onClick={closeValidationAlert}>
                                Понятно, исправлю
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={`Collectionh2 MergeHHeader ${isVisible ? 'show' : ''}`}>
                <h2>{data.title || 'Контакты'}</h2>
                <p>{data.subtitle || 'Свяжитесь с нами по любым вопросам'}</p>
            </div>

            <section className={`contactMain ${isVisible ? 'show' : ''}`}>
                <div className="contTop">
                    <div className="contThemes">
                        <p>Темы: </p>
                    </div>
                    <div className="contSend">
                        <p>{data.form_title || 'Отправить сообщение'}</p>
                    </div>
                </div>

                <div className="contBottom">
                    <div className="contBotLeft">
                        <div className="contBlocks">
                            {topics.slice(0, 2).map((topic) => (
                                <div key={topic.id} className={topic.id === topics[0]?.id ? 'contBlockTop' : 'contBlockBot'}>
                                    <h5>{topic.title}</h5>
                                    <h6>{topic.description}</h6>
                                </div>
                            ))}
                        </div>

                        <div className="contBlocks">
                            {topics.slice(2, 4).map((topic) => (
                                <div key={topic.id} className={topic.id === topics[2]?.id ? 'contBlockTop' : 'contBlockBot'}>
                                    <h5>{topic.title}</h5>
                                    <h6>{topic.description}</h6>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='contBotRight'>
                        <div className="contLabels">
                            <label className='label1Contact'>
                                <p>Имя и фамилия <span className="required">*</span></p>
                                <input 
                                    placeholder='Имя и фамилия'
                                    type="text"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                />
                            </label>

                            <label className='label1Contact'>
                                <p>Email <span className="required">*</span></p>
                                <input 
                                    placeholder='Email'
                                    type="email"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                />
                            </label>

                            <label className='label1Contact'>
                                <p>Тема</p>
                                <input 
                                    placeholder='Тема'
                                    type="text"
                                    value={contactTheme}
                                    onChange={(e) => setContactTheme(e.target.value)}
                                />
                            </label>

                            <label className='label1Contact label2Contact'>
                                <p>Сообщение <span className="required">*</span></p>
                                <textarea 
                                    value={contactMessage}
                                    onChange={handleMessageChange}
                                    maxLength={maxLength}
                                    rows={5}
                                    placeholder="Введите ваше сообщение..."
                                />
                                <h6 className="char-counter">{maxLength - contactMessage.length}/500</h6>
                            </label>
                        </div>

                        <div className="checkboxcontact">
                            <input 
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                                id="consent-checkbox"
                            />
                            <label htmlFor="consent-checkbox">
                                <a 
                                    href="#"
                                    className="privacy-link"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (!agree) {
                                            setShowPrivacyModal(true)
                                        } else {
                                            setShowPrivacyModal(true)
                                        }
                                    }}
                                >
                                    {data.consent_text || 'Я соглашаюсь на обработку персональных данных.'}
                                </a>
                            </label>
                        </div>

                        <div className="butForContact">
                            <button onClick={sendContact}>
                                {data.form_title || 'Отправить сообщение'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className='AddresContact'>
                <h1>Адрес музея</h1>
                <div className="addresBloc">
                    <div className="adressPic">
                        <iframe 
                            src="https://yandex.ru/map-widget/v1/?ll=20.155751%2C54.939661&z=18&pt=20.155751,54.939661,pm2rdm"
                            loading="lazy"
                            title="Карта музея в Светлогорске"
                        ></iframe>
                    </div>

                    <div className="adressCards">
                        <div className="adresCard1 adresCard2">
                            <div className="imgsForCards">
                                <a href="https://vk.com/melekhov_art" target="_blank" rel="noopener noreferrer">
                                    <img src={vk} alt="VK" />
                                </a>
                                <a href="https://dzen.ru/id/69b30d967c578d071b889373?share_to=link" target="_blank" rel="noopener noreferrer">
                                    <img src={yandex} alt="Yandex" />
                                </a>
                                <a href="https://max.ru/join/acAzseAAZ1_PBeI6ETX2a7b0WXLoRST3cnHT32Ke8r8" target="_blank" rel="noopener noreferrer">
                                    <img src={max} alt="Max" />
                                </a>
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
                    </div>
                </div>
            </section>
        </>
    )
}