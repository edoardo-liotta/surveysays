import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import QuestionBox from './QuestionBox'
import React from 'react'

test('renders player view, revealed', async () => {
  const item = {
    id: '1',
    text: 'Question',
    coverText: 'coverText',
    isRevealed: true,
  }
  render(<QuestionBox hostView={false} item={item} />)
  const coverText = screen.queryByText(/coverText/i)
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i)
  expect(text).toBeInTheDocument()
})

test('renders player view, hidden', async () => {
  const item = {
    id: '1',
    text: 'Question',
    coverText: 'coverText',
    isRevealed: false,
  }
  render(<QuestionBox hostView={false} item={item} />)
  const coverText = screen.queryByText(/coverText/i)
  expect(coverText).toBeInTheDocument()
  const text = screen.queryByText(/Question/i)
  expect(text).not.toBeInTheDocument()
})

test('renders host view, revealed', async () => {
  const item = {
    id: '1',
    text: 'Question',
    coverText: 'coverText',
    isRevealed: true,
  }
  render(<QuestionBox hostView={true} item={item} />)
  const coverText = screen.queryByText(/coverText/i)
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i)
  expect(text).toBeInTheDocument()
})

test('renders host view, hidden', async () => {
  const item = {
    id: '1',
    text: 'Question',
    coverText: 'coverText',
    isRevealed: false,
  }
  render(<QuestionBox hostView={true} item={item} />)
  const coverText = screen.queryByText(/coverText/i)
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i)
  expect(text).toBeInTheDocument()
})

test('toggles revealed state', async () => {
  const item = {
    id: '1',
    text: 'Question',
    coverText: 'coverText',
    isRevealed: false,
  }
  render(<QuestionBox hostView={true} item={item} />)
  const coverText = screen.queryByText(/coverText/i)
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i)
  expect(text).toBeInTheDocument()

  fireEvent.click(text!)
  act(() => {
    const coverText = screen.queryByText(/coverText/i)
    expect(coverText).not.toBeInTheDocument()
    const text = screen.queryByText(/Question/i)
    expect(text).toBeInTheDocument()
  })
})
