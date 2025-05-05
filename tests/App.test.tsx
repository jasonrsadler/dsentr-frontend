import { render, screen, fireEvent } from '@testing-library/react'
import App from '../src/App'
import { expect, test } from 'vitest'

test('renders headre text', () => {
  render(<App />)
  expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument()
})

test('renders counter and increments on click', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: /count is/i })
  expect(button).toBeInTheDocument()
  expect(button.textContent).toBe('count is 0')
  fireEvent.click(button)
  expect(button.textContent).toBe('count is 1')
})
