import './RoundListItem.css'
import React from 'react'
import { RoundInfo } from '../../domain/round-info'
import { Circle } from '@mui/icons-material'

type Props = {
  roundInfo: RoundInfo
  onSelectRound: (roundId: string) => void
}
export const RoundListItem = ({ roundInfo, onSelectRound }: Props) => {
  const { id, questionItem } = roundInfo
  return (
    <div className={'round-list-item'} onClick={() => onSelectRound(id)}>
      <div className={'round-number'}>{id}</div>
      <div className={'question'}>
        <div>
          {questionItem.coverText}{' '}
          {questionItem.isRevealed && (
            <Circle
              sx={{ width: '0.4em', height: '0.4em' }}
              htmlColor={'red'}
            />
          )}
        </div>
        <div className={'question-text'}>{questionItem.text}</div>
      </div>
    </div>
  )
}
