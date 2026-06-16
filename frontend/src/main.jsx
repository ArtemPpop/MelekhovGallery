import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client' 
import './index.css'
import App  from './App.jsx'
import Fut  from './Components/Futter.jsx'
import YandexMetrika  from './Components/YandexMetrika.jsx'
import Home from './Pages/home.jsx'
import Galery from './Pages/galery.jsx'
import Bio from './Pages/biography.jsx'
import Tvor from './Sections4/tvorchestvo.jsx'
import Coll from './Sections4/Collection.jsx' 
import Mus from './Sections4/Museum.jsx'
import Kont from './Sections4/Kontakt.jsx'
import merge from './Sections4/merge.jsx'
import Merge from './Sections4/merge.jsx'
import PhotoPage from './Pages/PhotoPage.jsx';
import ComparePage from './Pages/ComparePage.jsx';
import ScrollToTop from './Components/scrollToTop.jsx';
import ProductPage from './Sections4/ProductPage.jsx';
import ArchiveViewer from './Pages/ArchiveViewer.jsx'
import Checkout from './checkout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
       <YandexMetrika /> 
     <App />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/galery" element={<Galery/>} />
        <Route path="/bio" element={<Bio/>} />
        <Route path="/tvor" element={<Tvor/>} />
        <Route path="/coll" element={<Coll/>} />
        <Route path="/mus" element={<Mus/>} />
        <Route path="/kont" element={<Kont/>} />
        <Route path="/merge" element={<Merge/>} />
        <Route path="/work/:id" element={<PhotoPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/archive/:photoId" element={<ArchiveViewer />} />
        <Route path="/archive" element={<ArchiveViewer />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Fut/>
    </BrowserRouter>
  </StrictMode>,
)
