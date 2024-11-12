import './Playground.css'
import '../common.css'
import PlayerGrid from '../PlayerGrid/PlayerGrid'
import QuestionBox from '../QuestionBox/QuestionBox'
import ListGrid from '../ListGrid/ListGrid'
import React, { Component, createRef, Fragment } from 'react'
import ServiceApi from '../../api/service-api'
import HostActions from './HostActions'
import { Cancel } from '@mui/icons-material'
import { playBuzz } from '../../api/audio-api'
import {
  ReferrableRevealableItem,
  RevealableItem,
} from '../../domain/RevealableItem'
import { StatefulPlayer } from '../../domain/player'
import { Referrable } from '../../domain/referrable'
import { RoundInfo } from '../../domain/round-info'

function addRefs<T, R extends Referrable<T>>(answers: T[]): R[] {
  const newAnswers = [...answers]
  return newAnswers.map(item => {
    return {
      ...item,
      ref: createRef(),
    } as unknown as R
  })
}

const scoreAdditionModes = ['add', 'set', 'steal'] as const
export type ScoreAdditionMode = (typeof scoreAdditionModes)[number]

type PlaygroundProps = React.ComponentPropsWithRef<any> & {
  hostView: boolean
  roundId: string
  roundInfo: RoundInfo
}

type PlaygroundState = {
  answerItems: ReferrableRevealableItem[]
  questionItem: RevealableItem
  players: StatefulPlayer[]
  scoreAdditionMode: ScoreAdditionMode
  isShowingStrike: boolean
}

class Playground extends Component<PlaygroundProps, PlaygroundState> {
  constructor(props: PlaygroundProps) {
    super(props)
    this.state = {
      answerItems: addRefs((props.roundInfo && props.roundInfo.items) || []),
      questionItem: (props.roundInfo && props.roundInfo.questionItem) || {},
      players: addRefs((props.roundInfo && props.roundInfo.players) || []),
      scoreAdditionMode: 'add',
      isShowingStrike: false,
    }
  }

  serviceApi = new ServiceApi()

  animateRevealed = (itemId: string, newRevealedState: boolean) => {
    const item = this.state.answerItems.find(x => itemId === x.id)
    if (item) {
      item.ref.current.animateToggle(newRevealedState)
    }
    if (itemId === this.state.questionItem.id) {
      this.toggleQuestionItemRevealed(newRevealedState)
    }
  }

  getAnswerItems: () => (RevealableItem | ReferrableRevealableItem)[] = () => {
    const isHostView = this.props.hostView
    const isQuestionItemNotRevealed = !this.state.questionItem.isRevealed
    const shouldCompressAnswerItems = isHostView && isQuestionItemNotRevealed
    const numberOfAnswerItems = this.state.answerItems.length
    return shouldCompressAnswerItems
      ? [
          {
            id: 'compressed-answers',
            isRevealed: false,
            text: `${numberOfAnswerItems} risposte`,
          },
        ]
      : this.state.answerItems
  }

  isAllAnswerItemsRevealed = () => {
    return this.state.answerItems.every(x => x.isRevealed)
  }

  onItemReveal = (itemId: string, newState: boolean) => {
    const newAnswerItems = [...this.state.answerItems]
    const item = newAnswerItems.find(x => itemId === x.id)
    if (item) {
      item.isRevealed = newState
      this.setState({ answerItems: newAnswerItems })
      if (newState && item.points) {
        const activePlayer = this.state.players.find(x => x.active)
        if (activePlayer) {
          this.updateScore(
            activePlayer.name,
            item.points,
            this.state.scoreAdditionMode,
          )
        }
      }
    }
  }

  onManualEditScore = (targetPlayerName: string, newScore: number) => {
    this.updateScore(targetPlayerName, newScore, 'set')
    if (this.props.hostView) {
      this.serviceApi.forceRefresh(this.props.roundId)
    }
  }

  setActivePlayer = (activePlayerName?: string) => {
    const newPlayers = [...this.state.players]
    newPlayers.forEach(player => {
      let newActive = activePlayerName === player.name
      player.ref.current?.setActive(newActive)
      player.active = newActive
    })

    this.setState({ players: newPlayers })
  }

  setScoreAdditionMode = (newMode: ScoreAdditionMode) => {
    this.setState({ scoreAdditionMode: newMode })
  }

  showStrike = () => {
    this.setState({ isShowingStrike: true })
    if (!this.props.hostView) playBuzz()
    setTimeout(() => {
      this.setState({ isShowingStrike: false })
    }, 3000)
  }

  toggleQuestionItemRevealed = (newRevealed: boolean) => {
    this.setState({
      questionItem: {
        ...this.state.questionItem,
        isRevealed: newRevealed,
      },
    })
  }

  toggleScoreAdditionMode = () => {
    let newMode: ScoreAdditionMode
    if (this.state.scoreAdditionMode === 'add') {
      newMode = 'steal'
    } else {
      newMode = 'add'
    }
    this.setScoreAdditionMode(newMode)
    this.triggerSetScoreAdditionMode(newMode)
  }

  triggerSetActivePlayer = (activePlayerName?: string) => {
    const currentPlayers = this.state.players
    this.setActivePlayer(activePlayerName)
    this.serviceApi.setActivePlayer(
      this.props.roundId,
      activePlayerName,
      _ => _,
      () => {
        const activePlayer = currentPlayers.find(x => x.active)
        activePlayer && this.setActivePlayer(activePlayer.name)
        return Promise.reject('Failed to set active player')
      },
    )
  }

  triggerSetScoreAdditionMode = (newMode: ScoreAdditionMode) => {
    this.serviceApi.setScoreAdditionMode(this.props.roundId, newMode)
  }

  triggerStrike = () => {
    this.showStrike()
    this.serviceApi.showStrike()
  }

  triggerToggleQuestionItemRevealed = () => {
    this.toggleQuestionItemRevealed(!this.state.questionItem.isRevealed)
  }

  updateScore = (
    targetPlayerName: string,
    pointsToAdd: number,
    scoreAdditionMode: ScoreAdditionMode,
  ) => {
    const newPlayers = [...this.state.players]
    const targetPlayer = newPlayers.find(x => x.name === targetPlayerName)

    const performSteal = (targetPlayer: StatefulPlayer) => {
      let scoreToSteal = 0
      newPlayers.forEach(x => {
        if (x.name !== targetPlayerName) {
          scoreToSteal += x.score
          x.ref.current?.setScore(0)
          x.score = 0
        }
      })

      return targetPlayer.score + pointsToAdd + scoreToSteal
    }

    if (targetPlayer) {
      let newFinalScore = targetPlayer.score
      if ('add' === scoreAdditionMode) {
        if (this.isAllAnswerItemsRevealed()) {
          newFinalScore = performSteal(targetPlayer)
        } else {
          newFinalScore = targetPlayer.score + pointsToAdd
        }
      }
      if ('set' === scoreAdditionMode) {
        newFinalScore = pointsToAdd
      }
      if ('steal' === scoreAdditionMode) {
        pointsToAdd = 0
        newFinalScore = performSteal(targetPlayer)
      }

      targetPlayer.ref.current?.setScore(newFinalScore)
      targetPlayer.score = newFinalScore
    }

    this.setState({ players: newPlayers })

    if (this.props.hostView) {
      this.serviceApi.updateScores(this.props.roundId, newPlayers)
    }
  }

  render() {
    const { hostView, roundId } = this.props
    const { isShowingStrike, players, questionItem, scoreAdditionMode } =
      this.state

    return (
      <div className="Playground">
        <Fragment>
          <header className="Playground-header"></header>
          <div className="spacer" />
          <QuestionBox
            key={`question-${questionItem.id}-${questionItem.isRevealed}`}
            hostView={hostView}
            roundId={roundId}
            item={questionItem}
            onToggle={this.triggerToggleQuestionItemRevealed}
          />
          <div className="spacer" />
          <ListGrid
            hostView={hostView}
            roundId={roundId}
            items={this.getAnswerItems()}
            onToggleReveal={this.onItemReveal}
          />
          <div className="spacer" />
          <PlayerGrid
            hostView={hostView}
            onManualEditScore={this.onManualEditScore}
            players={players}
            setActivePlayer={this.triggerSetActivePlayer}
          />
          <div
            className={'strike-container ' + (isShowingStrike ? 'active' : '')}
          >
            <Cancel htmlColor={'red'} fontSize={'inherit'} />
          </div>
          {hostView && (
            <HostActions
              roundId={roundId}
              scoreAdditionMode={scoreAdditionMode}
              onTriggerStrike={this.triggerStrike}
              onToggle={() => {
                this.toggleScoreAdditionMode()
              }}
            />
          )}
        </Fragment>
      </div>
    )
  }
}

export default Playground
