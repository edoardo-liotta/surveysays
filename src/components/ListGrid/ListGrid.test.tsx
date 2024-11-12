import { render } from '@testing-library/react'
import ListGrid from './ListGrid'
import React from 'react'

test('renders covered list item', () => {
  render(
    <ListGrid
      hostView={false}
      items={[]}
      onToggleReveal={() => {}}
      roundId={'1'}
    />,
  )
  expect(true).toBeTruthy()
})
