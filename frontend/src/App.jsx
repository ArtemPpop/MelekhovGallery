import './App.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cart from './Card.jsx'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemsCount, setCartItemsCount] = useState(0)

  const toggleMenu = () => {
    if (isCartOpen) {
      setIsCartOpen(false)
      setTimeout(() => setIsMenuOpen(!isMenuOpen), 100)
    } else {
      setIsMenuOpen(!isMenuOpen)
    }
  }

  const toggleCart = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      setTimeout(() => setIsCartOpen(!isCartOpen), 100)
    } else {
      setIsCartOpen(!isCartOpen)
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  const handleCartUpdate = (cartData) => {
    const count = cartData.reduce((sum, item) => sum + item.quantity, 0)
    setCartItemsCount(count)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else if (!isCartOpen) {
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
  }, [isMenuOpen, isCartOpen])

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
            <div className="cart-link-wrapper" onClick={toggleCart}>
              <span>Корзина</span>
              {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
            </div>
          </div>
        </div>
      </section>
      <div className="headerSec2"></div>
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
      <Cart isOpen={isCartOpen} onClose={closeCart} onCartUpdate={handleCartUpdate} />
    </>
  )
}

export default App