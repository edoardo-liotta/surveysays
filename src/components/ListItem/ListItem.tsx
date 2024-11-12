import './ListItem.css'
import '../common.css'
import { Component, createRef } from 'react'
import ServiceApi from '../../api/service-api'
import { CSSTransition } from 'react-transition-group'
import { playDing } from '../../api/audio-api'
import React from 'react'

const hostViewClass = 'host-view'
const isRevealedClass = 'is-revealed'
const serviceApi = new ServiceApi()

type ListItemProps = {
  id?: string
  roundId?: string
  hostView: boolean
  isRevealed?: boolean
  coverText?: string
  text?: string
  points?: number
  onToggleReveal?: (id: string, revealed: boolean) => void
}

type ListItemState = {
  revealed: boolean
  animateRevealed: boolean
}

class ListItem extends Component<ListItemProps, ListItemState> {
  private readonly nodeRef: React.RefObject<HTMLDivElement>
  constructor(props: ListItemProps) {
    super(props)
    this.state = {
      revealed: props.isRevealed ?? false,
      animateRevealed: props.isRevealed ?? false,
    }
    this.nodeRef = createRef()
  }

  triggerToggleRevealed = () => {
    let initialState = this.state.revealed
    let newRevealedState = !initialState
    this.animateToggle(newRevealedState)
    const itemId = this.props.id
    const roundId = this.props.roundId
    if (roundId && itemId && 'compressed-answers' !== itemId) {
      serviceApi.updateRound(
        roundId,
        itemId,
        newRevealedState,
        _ => _,
        _ => {
          this.animateToggle(initialState)
          return Promise.reject('Failed to update round')
        },
      )
    }
  }

  animateToggle = (newRevealedState: boolean) => {
    this.setState({
      animateRevealed: newRevealedState,
    })
    if (newRevealedState && !this.props.hostView) {
      playDing()
    }
  }

  toggleRevealed = () => {
    let newRevealed = this.state.animateRevealed
    this.setState({
      revealed: newRevealed,
    })
    if (this.props.onToggleReveal && this.props.id)
      this.props.onToggleReveal(this.props.id, newRevealed)
  }

  render() {
    const { id, hostView, coverText, text, points } = this.props
    const { revealed, animateRevealed } = this.state

    return (
      <div className="ListItem" key={id} onClick={this.triggerToggleRevealed}>
        <header
          className={
            'ListItem-header ' +
            (hostView ? hostViewClass : '') +
            ' ' +
            (revealed ? isRevealedClass : '')
          }
        >
          <CSSTransition
            nodeRef={this.nodeRef}
            in={animateRevealed}
            timeout={300}
            classNames={isRevealedClass}
            onEntering={this.toggleRevealed}
            onExited={this.toggleRevealed}
          >
            <div ref={this.nodeRef}>
              {coverText && !hostView && !revealed && (
                <div className="ListItem-number">
                  <div className="spacer" />
                  <div className="spacer" />
                  <div>{coverText}</div>
                  <div className="spacer" />
                  <div className="spacer" />
                </div>
              )}

              {text && (
                <div
                  className={
                    'ListItem-answer ' +
                    (hostView ? hostViewClass : '') +
                    ' ' +
                    (revealed ? isRevealedClass : '')
                  }
                >
                  <div
                    className={
                      'ListItem-text ' +
                      (!hostView && text.length > 15 ? 'smaller' : '')
                    }
                  >
                    {coverText && (
                      <div
                        className={
                          'ListItem-number ' +
                          (!hostView && coverText.length > 1 ? 'smaller' : '')
                        }
                      >
                        <div className="spacer" />
                        <div>{coverText}</div>
                        <div className="spacer" />
                      </div>
                    )}
                    <div className="spacer" />
                    {text}
                    <div className="spacer" />
                  </div>
                  {points && <div className="ListItem-points">{points}</div>}
                </div>
              )}
            </div>
          </CSSTransition>
        </header>
      </div>
    )
  }
}

export default ListItem
