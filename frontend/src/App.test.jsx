import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('navigation links exist and are clickable', async () => {
  const user = userEvent.setup()
  
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  
  const homeLink = screen.getByText('Главная')
  const galeryLink = screen.getByText('Галерея')
  const merchLink = screen.getByText('Мерч')
  const bioLink = screen.getByText('Биография')
  const collLink = screen.getByText('Коллекция')
  const musLink = screen.getByText('Музей')
  const kontLink = screen.getByText('Контакты')
  
  expect(homeLink).toBeInTheDocument()
  expect(galeryLink).toBeInTheDocument()
  expect(merchLink).toBeInTheDocument()
  expect(bioLink).toBeInTheDocument()
  expect(collLink).toBeInTheDocument()
  expect(musLink).toBeInTheDocument()
  expect(kontLink).toBeInTheDocument()
  
  expect(homeLink.closest('a')).toHaveAttribute('href', '/home')
  expect(galeryLink.closest('a')).toHaveAttribute('href', '/galery')
  expect(kontLink.closest('a')).toHaveAttribute('href', '/kont')
})