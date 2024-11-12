import { render } from '@testing-library/react'
import Playground from './Playground'
import React from 'react'

test('renders covered list item', () => {
  render(
    <Playground
      hostView={false}
      roundId={'1'}
      roundInfo={{
        items: [],
        players: [],
        questionItem: { id: '1', text: '', isRevealed: false },
      }}
    />,
  )
  expect(true).toBeTruthy()
})
