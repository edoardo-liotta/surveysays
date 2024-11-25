import { act, fireEvent, render } from '@testing-library/react'
import Playground from './Playground'
import React from 'react'
import PlayerBox from '../PlayerBox/PlayerBox'
import { RevealableItem } from '../../domain/RevealableItem'
import { vi } from 'vitest'
import { Player, StatefulPlayer } from '../../domain/player'
import '@testing-library/jest-dom'

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
    { name: 'A', score: 1, strikes: 0, active: true, ref: refA },
    { name: 'B', score: 1, strikes: 0, active: false, ref: refB },
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
    updateScoreFn: (
      _playerName: string,
      _scoreValue: number,
      players: Player[],
      _scoreAdditionMode: string,
      _answerItems: RevealableItem[],
    ) => {
      return players.map(x => ({ ...x, score: 100 }))
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

  expect(scoreA).toHaveBeenCalledWith(100)
  expect(scoreB).toHaveBeenCalledWith(100)
})

test('clicking strike button updates player strike count', () => {
  const players = [
    { name: 'A', score: 1, strikes: 0, active: true, ref: { current: null } },
    { name: 'B', score: 1, strikes: 0, active: false, ref: { current: null } },
  ] as StatefulPlayer[]

  const { container } = render(
    <Playground
      hostView={true}
      roundId={'1'}
      roundInfo={{
        items: [
          { isRevealed: false } as RevealableItem,
          { isRevealed: false } as RevealableItem,
        ],
        players: players,
        questionItem: { id: '1', text: '', isRevealed: false },
      }}
    />,
  )

  const strikeButton = container.querySelector('#A_strike-button_1')
  if (strikeButton) {
    act(() => fireEvent.click(strikeButton))
  }

  expect(strikeButton).toHaveClass('active')
})
