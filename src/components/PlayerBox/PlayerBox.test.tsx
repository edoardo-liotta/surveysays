import React from 'react'
import PlayerBox from './PlayerBox'
import { act, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

test('shows max strikes', () => {
  const { container } = render(
    <PlayerBox
      name={'Player'}
      score={50}
      active={true}
      maxStrikes={3}
      hostView={false}
      onManualEditScore={() => {}}
      setActivePlayer={() => {}}
    />,
  )
  expect(container.querySelector('.strike-box')).toBeVisible()
})

test('host view shows strike reset button', () => {
  const { container } = render(
    <PlayerBox
      name={'Player'}
      score={50}
      active={true}
      maxStrikes={3}
      hostView={true}
      onManualEditScore={() => {}}
      setActivePlayer={() => {}}
    />,
  )
  expect(container.querySelector('.strike-box .reset-button')).toBeVisible()
})

test.each([[0], [1], [2], [3]])(
  'sends strike count %d to external function',
  count => {
    const setStrikeCount = vi.fn()
    const { container } = render(
      <PlayerBox
        name={'Player'}
        score={50}
        active={true}
        maxStrikes={3}
        hostView={true}
        onManualEditScore={() => {}}
        onSetStrikeCount={setStrikeCount}
        setActivePlayer={() => {}}
      />,
    )

    const strikeButton = container.querySelector(
      `#Player_strike-button_${count}`,
    )
    if (strikeButton) {
      act(() => fireEvent.click(strikeButton))
    }

    expect(setStrikeCount).toHaveBeenCalledWith('Player', count)
  },
)
