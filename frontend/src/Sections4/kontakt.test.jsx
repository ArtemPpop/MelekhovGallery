import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Kontakt from './Kontakt'

vi.mock('axios')
const mockedAxios = axios

vi.mock('./img/CardImg.png', () => ({ default: 'card-img' }))
vi.mock('./img/Call.png', () => ({ default: 'call-img' }))
vi.mock('./img/mess.png', () => ({ default: 'mess-img' }))

test('fills contact form and submits successfully', async () => {
  const user = userEvent.setup()
  
  mockedAxios.post.mockResolvedValue({ data: {} })
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})
  
  render(<Kontakt />)
   
  const nameInput = screen.getByLabelText('Имя')
  const emailInput = screen.getByLabelText('Email')
  const themeInput = screen.getByLabelText('Тема')
   
  const messageTextarea = screen.getByRole('textbox', { name: 'Сообщение 500/500' })
  const checkbox = screen.getByRole('checkbox')
   
  const submitButton = screen.getByRole('button', { name: 'Отправить сообщение' })
   
  await user.type(nameInput, 'Иван Петров')
  await user.type(emailInput, 'ivan@example.com')
  await user.type(themeInput, 'Вопрос по выставке')
  await user.type(messageTextarea, 'Хочу узнать подробности')
  await user.click(checkbox)
  await user.click(submitButton)
   
  await waitFor(() => {
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'http://82.97.252.48/api/contact/',
      {
        name: 'Иван Петров',
        email: 'ivan@example.com',
        theme: 'Вопрос по выставке',
        message: 'Хочу узнать подробности'
      }
    )
  })
   
  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith('Сообщение отправлено ✅')
  })
  
  alertMock.mockRestore()
})