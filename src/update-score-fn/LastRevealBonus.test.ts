import { expect } from 'vitest'
import { RevealableItem } from '../domain/RevealableItem'
import { lastRevealBonus } from './LastRevealBonus'

test('Add mode adds score and does not affect other score', () => {
  const result = lastRevealBonus(
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

test('Add mode adds score and 50-point bonus when all answers are revealed', () => {
  const result = lastRevealBonus(
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
    { name: 'A', score: 52 },
    { name: 'B', score: 1 },
  ])
})

test('Steal mode is not supported', () => {
  expect(() =>
    lastRevealBonus(
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
    ),
  ).toThrowError()
})

test('Set mode sets score to the given value', () => {
  const result = lastRevealBonus(
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
