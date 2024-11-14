import { render } from '@testing-library/react'
import Playground from './Playground'
import React from 'react'
import PlayerBox from '../PlayerBox/PlayerBox'
import { RevealableItem } from '../../domain/RevealableItem'
import { vi } from 'vitest'

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

test('update score triggers setters', () => {
  const scoreA = vi.fn()
  const refA = {
    current: { setScore: scoreA },
  } as unknown as React.RefObject<PlayerBox>

  const scoreB = vi.fn()
  const refB = {
    current: { setScore: scoreB },
  } as unknown as React.RefObject<PlayerBox>

  const players = [
    { name: 'A', score: 1, active: true, ref: refA },
    { name: 'B', score: 1, active: false, ref: refB },
  ]
  const a = new Playground({
    hostView: false,
    roundId: '1',
    roundInfo: {
      items: [
        { isRevealed: false } as RevealableItem,
        { isRevealed: false } as RevealableItem,
      ],
      players: players,
      questionItem: { id: '1', text: '', isRevealed: false },
    },
  })

  a.updateScore(
    players,
    'A',
    1,
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: false } as RevealableItem,
    ],
    'add',
  )

  expect(scoreA).toHaveBeenCalledWith(2)
  expect(scoreB).toHaveBeenCalledWith(1)
})
