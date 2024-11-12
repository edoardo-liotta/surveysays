import './ListGrid.css'
import '../common.css'

import ListItem from '../ListItem/ListItem'
import React from 'react'
import {
  ReferrableRevealableItem,
  RevealableItem,
} from '../../domain/RevealableItem'

type ListGridProps = {
  hostView: boolean
  roundId: string
  items: (ReferrableRevealableItem | RevealableItem)[]
  onToggleReveal: (id: string, revealed: boolean) => void
}
const ListGrid = ({
  hostView,
  roundId,
  items,
  onToggleReveal,
}: ListGridProps) => {
  const listItem = (
    item: ReferrableRevealableItem | RevealableItem,
    i: number,
  ) => {
    if (item) {
      return (
        <ListItem
          key={`listitem-${item.id}-i`}
          ref={(item as ReferrableRevealableItem)?.ref}
          roundId={roundId}
          id={item.id}
          hostView={hostView}
          isRevealed={item.isRevealed}
          coverText={item.coverText}
          text={item.text}
          points={item.points}
          onToggleReveal={onToggleReveal}
        />
      )
    } else if (!hostView) {
      return <ListItem key={i} hostView={hostView} />
    } else {
      return <div key={`listitem-${i}`}></div>
    }
  }

  return (
    <div className="ListGrid">
      {items &&
        Array.from({ ...items, length: 8 }).map((item, i) => listItem(item, i))}
    </div>
  )
}

export default ListGrid
