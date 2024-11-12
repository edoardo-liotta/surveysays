import './QuestionBox.css'
import '../common.css'
import React, { useState } from 'react'
import ServiceApi from '../../api/service-api'
import { RevealableItem } from '../../domain/RevealableItem'

const hostViewClass = 'host-view'
const isRevealedClass = 'is-revealed'
const serviceApi = new ServiceApi()

type QuestionBoxProps = {
  hostView: boolean
  roundId?: string
  item: RevealableItem
  onToggle?: (isRevealed: boolean) => void
}

const QuestionBox = ({
  hostView,
  roundId,
  item,
  onToggle = () => {},
}: QuestionBoxProps) => {
  const [revealed, setRevealed] = useState(item && item.isRevealed)

  const toggleState = () => {
    let initialState = revealed
    let newRevealed = !initialState
    setRevealed(newRevealed)
    onToggle(newRevealed)
    roundId &&
      serviceApi.updateRound(
        roundId,
        item.id,
        newRevealed,
        _ => _,
        _ => {
          setRevealed(initialState)
          return Promise.reject('Failed to update round')
        },
      )
  }

  return (
    <div className="QuestionBox" onClick={toggleState}>
      <header className="QuestionBox-header">
        {item && item.coverText && !hostView && !revealed && (
          <div className="QuestionBox-cover">
            <div className="spacer" />
            <div>{item.coverText}</div>
            <div className="spacer" />
          </div>
        )}
        {item && item.text && (
          <div
            className={
              'QuestionBox-question ' +
              (hostView ? hostViewClass : '') +
              ' ' +
              (revealed ? isRevealedClass : '')
            }
          >
            <div className="QuestionBox-text">
              {(revealed || hostView) && (
                <>
                  <div className="spacer" />
                  {item.text}
                  <div className="spacer" />
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default QuestionBox
