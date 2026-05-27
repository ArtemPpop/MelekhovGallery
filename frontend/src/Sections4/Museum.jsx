import './museum.css'
import { useEffect, useState } from 'react'

export default function Museum() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true)
        }, 50)
    }, [])

    return (
        <div className={`museum-container ${isVisible ? 'show' : ''}`}>
            <div className="Collectionh2">
                <h2>Музей в Светлогорске</h2>
                <p> Сохранение культурного наследия и создание пространства искусства</p>
            </div>
            <section className="concept">
                <div className="conceptMain">
                    <div className="MuseumH2">
                        <h1>Концепция музея</h1>
                        <p>Vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                             venenatis vitae, justo. Nullam dictum felis eu pede mollis 
                             pretium. Integer tincidunt. Cras dapibus. Vivamus elementum 
                             semper nisi. Aenean vulputate eleifend tellus. Aenean leo 
                            ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
                    </div>
                    <div className="Museumimg1">
                    </div>
                </div>
            </section>
            <div className="concept2">
                <div className="concept2H2">
                    <h1>3D-визуализация помещений</h1>
                </div>
                <div className="museumButton">
                    <div className="textAndBut">
                        <p>Разрабатывается виртуальный тур по будущему музею, который позволит увидеть
                        концепцию экспозиционных залов, расположение работ и общую атмосферу пространства.</p>
                        <p>Виртуальный тур будет доступен на сайте после завершения архитектурного проекта.</p>
                        <button>В процессе</button>
                    </div>
                    <section></section>
                </div>
            </div>
        </div>
    )
}