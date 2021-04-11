import { render, screen } from '@testing-library/react'
import App from './App'

// We will fill in more tests here

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/FemtoGram/i)
  expect(linkElement).toBeInTheDocument()
})
