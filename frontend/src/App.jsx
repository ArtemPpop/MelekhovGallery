
import './App.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <section className='headerSec'>
        <div className="headerMain">
          <div className="logo">
            <h2>Олег Мелехов</h2>
            <p>Заслуженный художник России</p>
          </div>
          <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`links ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={closeMenu}>Главная</Link>
            <Link to="/galery" onClick={closeMenu}>Галерея</Link>
            <Link to="/merge" onClick={closeMenu}>Мерч</Link>
            <Link to="/bio" onClick={closeMenu}>Биография</Link>
            <Link to="/coll" onClick={closeMenu}>Коллекция</Link>
            <Link to="/tvor" onClick={closeMenu}>Творчество</Link>
            <Link to="/mus" onClick={closeMenu}>Музей</Link>
            <Link to="/kont" onClick={closeMenu}>Контакты</Link>
          </div>
        </div>
      </section>
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    <div className="headerSec2"></div>
    </>
  )
}

export default App