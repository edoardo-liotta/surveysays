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
}

const PlayerGrid = ({
  hostView,
  onManualEditScore,
  players,
  setActivePlayer,
}: PlayerGridProps) => {
  function playerBox(item: StatefulPlayer) {
    return (
      <PlayerBox
        key={item.name}
        ref={item.ref}
        hostView={hostView}
        active={item.active || false}
        name={item.name || 'Unknown'}
        score={item.score || 0}
        setActivePlayer={setActivePlayer}
        onManualEditScore={onManualEditScore}
      />
    )
  }

  return (
    <div className={'PlayerGrid ' + (hostView ? 'host-view' : '')}>
      {players && players.map(item => playerBox(item))}
    </div>
  )
}

export default PlayerGrid
