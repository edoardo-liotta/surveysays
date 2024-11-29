import { expect } from 'vitest'
import { RevealableItem } from '../domain/RevealableItem'
import { lastRevealBonusMode } from './LastRevealBonus'

test('Add mode adds score and does not affect other score', () => {
  const result = lastRevealBonusMode.updateScoreFn(
    'A',
    1,
    [
      { name: 'A', score: 1, strikes: 0 },
      { name: 'B', score: 1, strikes: 0 },
    ],
    'add',
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: false } as RevealableItem,
    ],
  )

  expect(result).toEqual([
    { name: 'A', score: 2, strikes: 0 },
    { name: 'B', score: 1, strikes: 0 },
  ])
})

test('Add mode adds score and 50-point bonus when all answers are revealed', () => {
  const result = lastRevealBonusMode.updateScoreFn(
    'A',
    1,
    [
      { name: 'A', score: 1, strikes: 0 },
      { name: 'B', score: 1, strikes: 0 },
    ],
    'add',
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: true } as RevealableItem,
    ],
  )

  expect(result).toEqual([
    { name: 'A', score: 52, strikes: 0 },
    { name: 'B', score: 1, strikes: 0 },
  ])
})

test('Steal mode is not supported', () => {
  expect(() =>
    lastRevealBonusMode.updateScoreFn(
      'A',
      1,
      [
        { name: 'A', score: 1, strikes: 0 },
        { name: 'B', score: 1, strikes: 0 },
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
  const result = lastRevealBonusMode.updateScoreFn(
    'A',
    1,
    [
      { name: 'A', score: 1, strikes: 0 },
      { name: 'B', score: 1, strikes: 0 },
    ],
    'set',
    [
      { isRevealed: true } as RevealableItem,
      { isRevealed: false } as RevealableItem,
    ],
  )

  expect(result).toEqual([
    { name: 'A', score: 1, strikes: 0 },
    { name: 'B', score: 1, strikes: 0 },
  ])
})
