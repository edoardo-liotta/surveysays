import './PlayerGrid.css'
import '../common.css'
import PlayerBox from '../PlayerBox/PlayerBox'
import { StatefulPlayer } from '../../domain/player'
import React from 'react'

type PlayerGridProps = {
  hostView: boolean
  players: StatefulPlayer[]
  setActivePlayer: (name?: string) => void
  onManualEditScore: (name: string, score: number) => void
  onSetStrikeCount: (name: string, count: number) => void
}

const PlayerGrid = ({
  hostView,
  onManualEditScore,
  players,
  setActivePlayer,
  onSetStrikeCount,
}: PlayerGridProps) => {
  return (
    <div className={'PlayerGrid ' + (hostView ? 'host-view' : '')}>
      {players &&
        players.map(item => (
          <PlayerBox
            key={item.name}
            hostView={hostView}
            active={item.active || false}
            name={item.name || 'Unknown'}
            score={item.score || 0}
            strikes={item.strikes || 0}
            setActivePlayer={setActivePlayer}
            onManualEditScore={onManualEditScore}
            onSetStrikeCount={onSetStrikeCount!}
          />
        ))}
    </div>
  )
}

export default PlayerGrid
