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

    // Cookie согласие
    const [cookieConsent, setCookieConsent] = useState(false)
    const [showCookieBanner, setShowCookieBanner] = useState(false)

    const API_URL = '/api/contacts/'
    const CONTACT_URL = '/api/contact/'
    const maxLength = 500

    // Проверка cookie при загрузке
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent')
        if (consent === 'true') {
            setCookieConsent(true)
            setShowCookieBanner(false)
            // Показываем модальное окно с политикой при загрузке
            setShowPrivacyModal(true)
        } else {
            setShowCookieBanner(true)
            // Показываем модальное окно с политикой при загрузке
            setShowPrivacyModal(true)
        }
    }, [])

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

    // Функции для cookie
    const acceptConsent = () => {
        localStorage.setItem('cookieConsent', 'true')
        setCookieConsent(true)
        setShowCookieBanner(false)
        setAgree(true)
        setShowPrivacyModal(false) // Закрываем модальное окно после согласия
    }

    const declineConsent = () => {
        localStorage.setItem('cookieConsent', 'false')
        setCookieConsent(false)
        setShowCookieBanner(false)
        setAgree(false)
        setShowPrivacyModal(false) // Закрываем модальное окно после отказа
    }

    // Открыть PDF
    const openPrivacyPolicy = (e) => {
        if (e) e.preventDefault()
        setShowPrivacyModal(true)
    }

    const closePrivacyPolicy = () => {
        setShowPrivacyModal(false)
    }

    // Проверка, можно ли отправить
    const canSend = () => {
        return agree && cookieConsent && contactName.trim() && contactEmail.trim() && contactMessage.trim()
    }

    const sendContact = async () => {
        if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
            alert("⚠️ Заполните все обязательные поля")
            return
        }

        if (!cookieConsent) {
            alert("⚠️ Для отправки сообщения необходимо принять политику обработки данных")
            setShowPrivacyModal(true)
            return
        }

        if (!agree) {
            alert("⚠️ Для отправки сообщения необходимо согласие на обработку персональных данных")
            return
        }

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
            {/* ===== МОДАЛЬНОЕ ОКНО С PDF ===== */}
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

            {/* ===== COOKIE-БАННЕР ===== */}
            {showCookieBanner && (
                <div className="cookie-banner-overlay">
                    <div className="cookie-banner">
                        <div className="cookie-content">
                            <h3>🍪 Политика использования файлов cookie</h3>
                            <p>
                                Мы используем файлы cookie для улучшения работы сайта, 
                                анализа трафика и персонализации контента. 
                                Подробнее в 
                                <a href="#" className="privacy-link" onClick={openPrivacyPolicy}>
                                    политике конфиденциальности
                                </a>.
                            </p>
                            <div className="cookie-buttons">
                                <button className="cookie-accept" onClick={acceptConsent}>
                                    Согласиться
                                </button>
                                <button className="cookie-decline" onClick={declineConsent}>
                                    Отказаться
                                </button>
                            </div>
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
                                    className={`privacy-link ${!cookieConsent ? 'privacy-link-declined' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        openPrivacyPolicy()
                                    }}
                                >
                                    {data.consent_text || 'Я соглашаюсь на обработку персональных данных.'}
                                </a>
                            </label>
                        </div>

                        <div className="butForContact">
                            <button 
                                onClick={sendContact}
                                disabled={!canSend()}
                                className={!canSend() ? 'button-disabled' : ''}
                            >
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