import { vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import HostActions from './HostActions'
import React from 'react'

test('should change round ID', () => {
  const mockOnChangeRoundId = vi.fn()
  render(
    <HostActions
      onToggle={() => {}}
      onTriggerStrike={() => {}}
      onChangeRoundId={mockOnChangeRoundId}
      scoreAdditionMode="add"
      roundId="1"
    />,
  )

  // Open the edit dialog by clicking on the card element
  fireEvent.click(screen.getByText('1'))

  // Change the round ID
  fireEvent.change(screen.getByLabelText('Round ID'), {
    target: { value: '2' },
  })

  // Confirm the change
  fireEvent.click(screen.getByText('Conferma'))

  // Check if the mock function was called with the new round ID
  expect(mockOnChangeRoundId).toHaveBeenCalledWith('2')
})
