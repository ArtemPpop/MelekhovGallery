import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import Galery from './galery'
 
vi.mock('axios')
const mockedAxios = axios
 
const mockWorks = [
  { id: 1, title: 'Работа 1', year: 2020, technique: 'Масло', genre: 'Пейзаж', theme: 'Природа', image_url: 'test.jpg' },
  { id: 2, title: 'Работа 2', year: 2021, technique: 'Акварель', genre: 'Портрет', theme: 'Люди', image_url: 'test.jpg' },
  { id: 3, title: 'Работа 3', year: 2020, technique: 'Масло', genre: 'Натюрморт', theme: 'Предметы', image_url: 'test.jpg' },
  { id: 4, title: 'Работа 4', year: 2022, technique: 'Графика', genre: 'Пейзаж', theme: 'Город', image_url: 'test.jpg' },
]

test('filters works by year and sorts correctly', async () => {
  const user = userEvent.setup()
   
  mockedAxios.get.mockResolvedValue({ data: mockWorks })
  
  render(<Galery />)
   
  await waitFor(() => {
    expect(screen.getByText('Виртуальная галерея')).toBeInTheDocument()
  })
   
  await waitFor(() => {
    expect(screen.getByText('Работа 1')).toBeInTheDocument()
    expect(screen.getByText('Работа 2')).toBeInTheDocument()
    expect(screen.getByText('Работа 3')).toBeInTheDocument()
    expect(screen.getByText('Работа 4')).toBeInTheDocument()
  })
   
  expect(screen.getByText(/Найдено: 4 работ/)).toBeInTheDocument()
   
  const periodSelect = screen.getByLabelText('Период')
  await user.selectOptions(periodSelect, '2020')
   
  await waitFor(() => {
    expect(screen.getByText('Работа 1')).toBeInTheDocument()
    expect(screen.getByText('Работа 3')).toBeInTheDocument()
  })
   
  expect(screen.queryByText('Работа 2')).not.toBeInTheDocument()
  expect(screen.queryByText('Работа 4')).not.toBeInTheDocument()
   
  expect(screen.getByText(/Найдено: 2 работ/)).toBeInTheDocument()
   
  const resetButton = screen.getByText('Сбросить фильтры')
  await user.click(resetButton)
   
  await waitFor(() => {
    expect(screen.getByText('Работа 1')).toBeInTheDocument()
    expect(screen.getByText('Работа 2')).toBeInTheDocument()
    expect(screen.getByText('Работа 3')).toBeInTheDocument()
    expect(screen.getByText('Работа 4')).toBeInTheDocument()
  })
   
  expect(screen.getByText(/Найдено: 4 работ/)).toBeInTheDocument()
})
