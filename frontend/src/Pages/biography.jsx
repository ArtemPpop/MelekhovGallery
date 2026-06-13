import { useEffect, useState } from 'react'
import axios from 'axios'
import oleg2 from './imgs/oleg2.png'
import mol from './imgs/molnya.png'
import hor from './imgs/horiz.png'
import ver from './imgs/vertical.png'
import './biogSection.css'

export default function Biography() {
    const [isVisible, setIsVisible] = useState(false)
    const [bioData, setBioData] = useState(null)
    const [archivePhotos, setArchivePhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API_URL = '/api/biography/'
    const PHOTOS_URL = '/api/photos/'

    const requiredTitles = [
        'Начало церемонии открытия скульптуры Царевны Лягушки',
        'Открытие скульптуры собравшимся',
        'Первый заместитель, Олег снимает фату со скульптуры',
        'Поэт Валерий Иванович Петровский',
        'Слова благодарности художнику',
        'Художник и его жена рядом со скульптурой Царевны лягушки'
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [bioRes, photosRes] = await Promise.all([
                    axios.get(API_URL),
                    axios.get(PHOTOS_URL)
                ])
                const bioResult = Array.isArray(bioRes.data) ? bioRes.data[0] : bioRes.data
                setBioData(bioResult)
                
                const allPhotos = Array.isArray(photosRes.data) ? photosRes.data : []
                const selectedPhotos = allPhotos.filter(photo => requiredTitles.includes(photo.title))
                selectedPhotos.sort((a, b) => {
                    return requiredTitles.indexOf(a.title) - requiredTitles.indexOf(b.title)
                })
                setArchivePhotos(selectedPhotos)
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

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Загрузка биографии...</p>
            </div>
        )
    }

    if (error || !bioData) {
        return <div className="error-container">{error || 'Данные не найдены'}</div>
    }

    const getSectionByTitle = (title) => {
        return bioData.sections?.find(section => section.title === title)
    }

    const sections = {
        childhood: getSectionByTitle('Детство и истоки творчества'),
        schoolYears: getSectionByTitle('Школьные годы на Украине'),
        method: getSectionByTitle('Становление метода и поиски вдохновения'),
        apprenticeship: getSectionByTitle('Ученичество у мастеров'),
        freedom: getSectionByTitle('Борьба за свободу творчества'),
        leningrad: getSectionByTitle('Ленинградский период и закрытие выставок')
    }

    return (
        <div className={`biography-container ${isVisible ? 'show' : ''}`}>
            <section className='secBiograph'>
                <div className="Collectionh2">
                    <h2>{bioData.title || 'Биография'}</h2>
                    <p>{bioData.artist_name || 'Олег Алексадрович Мелехов'}</p>
                </div>
                <hr className='hrBiog'/>
                
                <div className="bioOleg">
                    <div className="bioTop">
                        <hr />
                        <div>
                            <h3>
                                {bioData.intro_text?.split('Самыми значительными')[0]}
                                <br /> Самыми значительными считает свои выставки в Москве. <br />
                            </h3>
                            <h3>
                                {bioData.intro_text?.split('Самыми значительными')[1] || 
                                 'В январе 2001 года под патронажем Правительства Москвы в «Новом Манеже» прошла персональная выставка Олега Александровича Мелехова «Начало Новой Эры». Эта выставка была показана зрителям телевидения как событие, открывающее Третье тысячелетие.'}
                            </h3>
                        </div>
                        <img src={oleg2} alt={bioData.artist_name} />
                        <hr className='hrBioRight'/>
                    </div>
                </div>

                {sections.childhood && (
                    <>
                        <div className="detstva">
                            <h3>{sections.childhood.title}</h3>
                        </div>
                        <div className="contentBio">
                            <p>{sections.childhood.content}</p>
                        </div>
                    </>
                )}

                {sections.schoolYears && (
                    <>
                        <div className="detstva">
                            <h3>{sections.schoolYears.title}</h3>
                        </div>
                        <div className="contentBio">
                            <p>{sections.schoolYears.content}</p>
                        </div>
                    </>
                )}

                {sections.method && (
                    <>
                        <div className="detstva">
                            <h3>{sections.method.title}</h3>
                        </div>
                        <div className="contentBio">
                            <p>{sections.method.content}</p>
                        </div>
                    </>
                )}

                {sections.apprenticeship && (
                    <>
                        <div className="detstva">
                            <h3>{sections.apprenticeship.title}</h3>
                        </div>
                        <div className="contentBio">
                            <p>{sections.apprenticeship.content}</p>
                        </div>
                    </>
                )}

                {sections.freedom && (
                    <>
                        <div className="detstva">
                            <h3>{sections.freedom.title}</h3>
                        </div>
                        <div className="contentBio">
                            <p>{sections.freedom.content}</p>
                        </div>
                    </>
                )}

                {sections.leningrad && (
                    <>
                        <div className="detstva">
                            <h3>{sections.leningrad.title}</h3>
                        </div>
                        <div className="contentBio">
                            <p>{sections.leningrad.content}</p>
                        </div>
                    </>
                )}

                <div className="detstva">
                    <h3>Калининградский период <br /> и нонконформизм</h3>
                </div>

                {bioData.timeline && bioData.timeline.length > 0 && (
                    <div className="vistavki">
                        <h1>С 1977 года Олег Мелехов активно участвует в выставочной жизни Калининграда.</h1>
                        <div className="yearAndDesc">
                            <div className="yearsDesc">
                                {bioData.timeline.slice(0, 3).map(item => (
                                    <p key={item.id}>{item.year}</p>
                                ))}
                            </div>
                            <img className='vertical' src={ver} alt="" />
                            <div className="descBio">
                                {bioData.timeline.slice(0, 3).map((item) => (
                                    <div className="desc1Bio" key={item.id}>
                                        <img src={hor} alt="" />
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="detstva">
                    <h3>Духовные искания <br /> и наследие Рериха</h3>
                </div>

                {bioData.timeline && bioData.timeline.length > 3 && (
                    <div className="vistavki vistavki2">
                        <h1>В начале 1980-х, благодаря выставкам в Доме архитектора, <br /> 
                            Мелехов открывает для себя наследие Николая Рериха.</h1>
                        <div className="yearAndDesc">
                            <div className="yearsDesc yearsDesc2">
                                {bioData.timeline.slice(3, 6).map(item => (
                                    <p key={item.id}>{item.year}</p>
                                ))}
                            </div>
                            <img className='vertical vertical2' src={ver} alt="" />
                            <div className="descBio descBio2">
                                {bioData.timeline.slice(3, 6).map((item) => (
                                    <div className="desc1Bio desc2Bio" key={item.id}>
                                        <img src={hor} alt="" />
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                

                <div className="detstva">
                    <h3>Из личного <br /> архива</h3>
                </div>
                <div className="fromZIP">
                    {archivePhotos.length === 6 ? (
                        archivePhotos.map((photo, index) => (
                            <div key={photo.id} className='zip1'>
                                <img src={photo.image_url} alt={photo.title} />
                                <p className="photo-title">{photo.title}</p>
                            </div>
                        ))
                    ) : (
                        <>
                            <div className='zip1'>
                                {archivePhotos[0] && <img src={archivePhotos[0].image_url} alt={archivePhotos[0].title} />}
                            </div>
                            <div className='zip1'>
                                {archivePhotos[1] && <img src={archivePhotos[1].image_url} alt={archivePhotos[1].title} />}
                            </div>
                            <div className='zip1'>
                                {archivePhotos[2] && <img src={archivePhotos[2].image_url} alt={archivePhotos[2].title} />}
                            </div>
                            <div className='zip1'>
                                {archivePhotos[3] && <img src={archivePhotos[3].image_url} alt={archivePhotos[3].title} />}
                            </div>
                            <div className='zip1'>
                                {archivePhotos[4] && <img src={archivePhotos[4].image_url} alt={archivePhotos[4].title} />}
                            </div>
                            <div className='zip1'>
                                {archivePhotos[5] && <img src={archivePhotos[5].image_url} alt={archivePhotos[5].title} />}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}