import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'
import React from 'react'

test.skip('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})