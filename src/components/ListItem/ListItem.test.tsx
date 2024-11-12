import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListItem from './ListItem'
import React from 'react'

test('renders covered list item, player view', async () => {
  render(
    <ListItem
      hostView={false}
      isRevealed={false}
      coverText={'AAA'}
      text={'Sample'}
      points={2}
    />,
  )
  const number = screen.getAllByText(/AAA/i)
  expect(number[0]).toBeInTheDocument()
  const text = screen.queryByText(/Sample/i)
  expect(text?.closest('.ListItem-answer')).not.toHaveClass(
    'host-view',
    'is-revealed',
  )
})

test('renders covered list item, host view', () => {
  render(
    <ListItem
      hostView={true}
      isRevealed={false}
      coverText={'1'}
      text={'Sample'}
      points={2}
    />,
  )
  const text = screen.getByText(/Sample/i)
  expect(text).toBeInTheDocument()
  expect(text).toBeVisible()
  const points = screen.getByText(/2/i)
  expect(points).toBeInTheDocument()
  expect(points).toBeVisible()
})

test('renders revealed list item', () => {
  render(
    <ListItem
      hostView={false}
      isRevealed={true}
      coverText={'1'}
      text={'Sample'}
      points={2}
    />,
  )
  const text = screen.getByText(/Sample/i)
  expect(text).toBeInTheDocument()
  expect(text).toBeVisible()
  const points = screen.getByText(/2/i)
  expect(points).toBeInTheDocument()
  expect(points).toBeVisible()
})

test('toggles revealed state', async () => {
  render(
    <ListItem
      hostView={false}
      isRevealed={false}
      coverText={'AAA'}
      text={'Sample'}
      points={2}
    />,
  )
  const number = screen.getAllByText(/AAA/i)
  expect(number[0]).toBeInTheDocument()
  const text = screen.queryByText(/Sample/i)
  expect(text?.closest('.ListItem-answer')).not.toHaveClass('is-revealed')
  fireEvent.click(number[0]!)
  act(() => {
    const number = screen.getByText(/AAA/i)
    expect(number).toBeInTheDocument()
    const text = screen.getByText(/Sample/i)
    expect(text?.closest('.ListItem-answer')).toHaveClass('is-revealed')
  })
})
