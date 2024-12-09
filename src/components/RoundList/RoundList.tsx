import React, { useEffect, useState } from 'react'
import './RoundList.css'
import { RoundInfo } from '../../domain/round-info'
import { RoundListItem } from './RoundListItem'
import { OverlaySpinner } from '../OverlaySpinner/OverlaySpinner'
import { IconButton } from '@mui/material'
import { Refresh } from '@mui/icons-material'

type RoundListProps = {
  getRoundsFn: () => Promise<RoundInfo[]>
  onSelectRound: (roundId: string) => void
}

export const RoundList = ({ getRoundsFn, onSelectRound }: RoundListProps) => {
  const [rounds, setRounds] = useState<RoundInfo[] | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      getRoundsFn()
        .then(setRounds)
        .finally(() => setLoading(false))
    }
  }, [loading, getRoundsFn])

  return (
    <>
      <div className={'round-list-header'}>
        <div>RoundList</div>
        <IconButton onClick={() => setLoading(true)}>
          <Refresh />
        </IconButton>
      </div>
      {loading && <OverlaySpinner />}
      {rounds &&
        rounds.map(round => (
          <RoundListItem
            key={round.id}
            roundInfo={round}
            onSelectRound={onSelectRound}
          />
        ))}
    </>
  )
}
