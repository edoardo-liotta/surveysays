import './Playground.css'
import '../common.css'
import PlayerGrid from '../PlayerGrid/PlayerGrid'
import QuestionBox from '../QuestionBox/QuestionBox'
import ListGrid from '../ListGrid/ListGrid'
import React, { Component, createRef, Fragment } from 'react'
import ServiceApi, { setScoreAdditionMode } from '../../api/service-api'
import HostActions from './HostActions'
import { Cancel } from '@mui/icons-material'
import { playBuzz } from '../../api/audio-api'
import {
  ReferrableRevealableItem,
  RevealableItem,
} from '../../domain/RevealableItem'
import { Player, StatefulPlayer } from '../../domain/player'
import { Referrable } from '../../domain/referrable'
import { RoundInfo } from '../../domain/round-info'
import { ScoreAdditionMode } from '../../update-score-fn/score-addition-mode'

function addRefs<T, R extends Referrable<T>>(answers: T[]): R[] {
  const newAnswers = [...answers]
  return newAnswers.map(item => {
    return {
      ...item,
      ref: createRef(),
    } as unknown as R
  })
}

type PlaygroundProps = React.ComponentPropsWithRef<any> & {
  hostView: boolean
  roundId: string
  roundInfo: RoundInfo
  updateScoreFn: (
    playerName: string,
    scoreValue: number,
    players: Player[],
    scoreAdditionMode: string,
    answerItems: RevealableItem[],
  ) => Player[]
  allScoreAdditionModes: ScoreAdditionMode[]
  updateRoundId?: (newRoundId: string) => void
}

type PlaygroundState = {
  answerItems: ReferrableRevealableItem[]
  questionItem: RevealableItem
  players: StatefulPlayer[]
  scoreAdditionMode: ScoreAdditionMode
  isShowingStrike: boolean
  updateScoreFn: (
    playerName: string,
    scoreValue: number,
    players: Player[],
    scoreAdditionMode: string,
    answerItems: RevealableItem[],
  ) => Player[]
}

class Playground extends Component<PlaygroundProps, PlaygroundState> {
  constructor(props: PlaygroundProps) {
    super(props)
    this.state = {
      answerItems: addRefs((props.roundInfo && props.roundInfo.items) || []),
      questionItem: (props.roundInfo && props.roundInfo.questionItem) || {},
      players: addRefs((props.roundInfo && props.roundInfo.players) || []),
      scoreAdditionMode: props.allScoreAdditionModes[0],
      isShowingStrike: false,
      updateScoreFn: props.updateScoreFn,
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
            this.state.players,
            activePlayer.name,
            item.points,
            this.state.answerItems,
            this.state.scoreAdditionMode,
          )
        }
      }
    }
  }

  onManualEditScore = (targetPlayerName: string, newScore: number) => {
    this.updateScore(
      this.state.players,
      targetPlayerName,
      newScore,
      this.state.answerItems,
      'set',
    )
    if (this.props.hostView) {
      this.serviceApi.forceRefresh(this.props.roundId)
    }
  }

  onSetActivePlayer = (activePlayerName?: string) => {
    this.setActivePlayer(activePlayerName)

    if (this.props.hostView) {
      this.serviceApi.setActivePlayer(
        this.props.roundId,
        activePlayerName,
        _ => _,
        () => {
          const activePlayer = this.state.players.find(x => x.active)
          activePlayer && this.setActivePlayer(activePlayer.name)
          return Promise.reject('Failed to set active player')
        },
      )
    }
  }

  onSetPlayerStrikes = (targetPlayerName: string, newStrikes: number) => {
    this.setPlayerStrikes(targetPlayerName, newStrikes)

    if (this.props.hostView) {
      this.serviceApi.setPlayerStrikes(
        this.props.roundId,
        targetPlayerName,
        newStrikes,
        _ => _,
        () => {
          const targetPlayer = this.state.players.find(
            x => x.name === targetPlayerName,
          )
          targetPlayer &&
            this.setPlayerStrikes(targetPlayer.name, targetPlayer.strikes)
          return Promise.reject('Failed to set player strikes')
        },
      )
    }
  }

  setActivePlayer = (activePlayerName?: string) => {
    const newPlayers = [...this.state.players]
    newPlayers.forEach(player => {
      player.active = activePlayerName === player.name
    })

    this.setState({ players: newPlayers })
  }

  setPlayerStrikes = (targetPlayerName: string, newStrikes: number) => {
    const newPlayers = [...this.state.players]
    const targetPlayer = newPlayers.find(x => x.name === targetPlayerName)
    if (targetPlayer) {
      targetPlayer.strikes = newStrikes
      this.setState({ players: newPlayers })
    }
  }

  setScoreAdditionMode = (newMode: ScoreAdditionMode) => {
    this.setState({ scoreAdditionMode: newMode })
  }

  showStrike = () => {
    this.setState({ isShowingStrike: true })
    if (!this.props.hostView) playBuzz()
    setTimeout(() => {
      this.setState({ isShowingStrike: false })
      if (this.props.hostView) {
        const activePlayer = this.state.players.find(x => x.active)
        if (activePlayer) {
          this.onSetPlayerStrikes(
            activePlayer!.name,
            (activePlayer!.strikes ?? 0) + 1,
          )
        }
      }
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
    const indexOf = this.props.allScoreAdditionModes.indexOf(
      this.state.scoreAdditionMode,
    ) as number
    const next = (indexOf + 1) % this.props.allScoreAdditionModes.length
    const newMode = this.props.allScoreAdditionModes[next]
    this.setScoreAdditionMode(newMode)
    this.triggerSetScoreAdditionMode(newMode)
  }

  triggerSetScoreAdditionMode = (newMode: ScoreAdditionMode) => {
    setScoreAdditionMode(this.props.roundId, newMode)
  }

  triggerStrike = () => {
    this.showStrike()
    this.serviceApi.showStrike()
  }

  triggerToggleQuestionItemRevealed = () => {
    this.toggleQuestionItemRevealed(!this.state.questionItem.isRevealed)
  }

  updateScore = (
    players: StatefulPlayer[],
    playerName: string,
    scoreValue: number,
    answerItems: RevealableItem[],
    scoreAdditionMode: ScoreAdditionMode,
  ) => {
    const newPlayers = (this.props as PlaygroundProps).updateScoreFn(
      playerName,
      scoreValue,
      players,
      scoreAdditionMode,
      answerItems,
    ) as Player[]

    const newStatefulPlayers = players.map(player => ({
      ...player,
      ...newPlayers.find(x => x.name === player.name),
    })) as StatefulPlayer[]
    this.setState({
      players: newStatefulPlayers,
    })

    if (this.props.hostView) {
      this.serviceApi.updateScores(this.props.roundId, newPlayers)
    }
  }

  updateRoundId = (newRoundId: string) => {
    this.props.updateRoundId && this.props.updateRoundId(newRoundId)
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
            setActivePlayer={this.onSetActivePlayer}
            onSetStrikeCount={this.onSetPlayerStrikes}
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
              onChangeRoundId={this.updateRoundId}
            />
          )}
        </Fragment>
      </div>
    )
  }
}

export default Playground
