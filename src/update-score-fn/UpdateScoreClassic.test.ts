import { expect } from 'vitest'
import { updateScoreClassic } from './UpdateScoreClassic'
import { RevealableItem } from '../domain/RevealableItem'

test('Add mode adds score and does not affect other score when some answers are not revealed yet', () => {
  const result = updateScoreClassic(
    'A',
    1,
    [
      { name: 'A', score: 1 },
      { name: 'B', score: 1 },
    ],
    'add',
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: false } as RevealableItem,
    ],
  )

  expect(result).toEqual([
    { name: 'A', score: 2 },
    { name: 'B', score: 1 },
  ])
})

test('Add mode adds score and steals other score when all answers are revealed', () => {
  const result = updateScoreClassic(
    'A',
    1,
    [
      { name: 'A', score: 1 },
      { name: 'B', score: 1 },
    ],
    'add',
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: true } as RevealableItem,
    ],
  )

  expect(result).toEqual([
    { name: 'A', score: 3 },
    { name: 'B', score: 0 },
  ])
})

test('Steal mode steals score from other players', () => {
  const result = updateScoreClassic(
    'A',
    1,
    [
      { name: 'A', score: 1 },
      { name: 'B', score: 1 },
    ],
    'steal',
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: false } as RevealableItem,
    ],
  )

  expect(result).toEqual([
    { name: 'A', score: 2 },
    { name: 'B', score: 0 },
  ])
})

test('Set mode sets score to the given value', () => {
  const result = updateScoreClassic(
    'A',
    1,
    [
      { name: 'A', score: 1 },
      { name: 'B', score: 1 },
    ],
    'set',
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: false } as RevealableItem,
    ],
  )

  expect(result).toEqual([
    { name: 'A', score: 1 },
    { name: 'B', score: 1 },
  ])
})
