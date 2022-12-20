import './Playground.css';
import '../common.css';
import PlayerGrid from '../PlayerGrid/PlayerGrid';
import QuestionBox from '../QuestionBox/QuestionBox';
import ListGrid from '../ListGrid/ListGrid';
import { Component, createRef } from 'react';
import ServiceApi from '../../api/service-api';

function addRefs(answers) {
  const newAnswers = [...answers]
  newAnswers.forEach((item) => {
    item.ref = createRef()
  })
  return newAnswers
}

const ScoreAdditionMode = {
  ADD: "add",
  SET: "set"
}

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerItems: addRefs((props.roundInfo && props.roundInfo.items) || []),
      questionItem: (props.roundInfo && props.roundInfo.questionItem) || {},
      players: addRefs((props.roundInfo && props.roundInfo.players) || []),
      scoreAdditionMode: ScoreAdditionMode.ADD
    }
  }

  serviceApi = new ServiceApi()

  triggerSetActivePlayer = (activePlayerName) => {
    const currentPlayers = this.state.players
    this.setActivePlayer(activePlayerName)
    this.serviceApi.setActivePlayer(this.props.roundId, activePlayerName, () => {
    }, () => {
      let activePlayer = currentPlayers.find(x => x.active === true)
      this.setActivePlayer((activePlayer && activePlayer.name) || null)
    })
  }

  setActivePlayer = (activePlayerName) => {
    const newPlayers = [...this.state.players]
    newPlayers.forEach(player => {
      let newActive = activePlayerName === player.name;
      player.ref.current.setActive(newActive)
      player.active = newActive
    })

    this.setState({ players: newPlayers })
  }

  animateRevealed = (itemId, newRevealedState) => {
    const item = this.state.answerItems.find(x => itemId === x.id)
    if (item) {
      item.ref.current.animateToggle(newRevealedState)
    }
    if (itemId === this.state.questionItem.id) {
      this.toggleQuestionItemRevealed(newRevealedState)
    }
  }

  toggleQuestionItemRevealed = (stateChange) => {
    this.setState({
      questionItem: {
        ...this.state.questionItem,
        isRevealed: stateChange,
      },
    })
  }

  triggerToggleQuestionItemRevealed = () => {
    this.toggleQuestionItemRevealed(!this.state.questionItem.isRevealed)
  }

  answerItems = () => {
    const isHostView = this.props.hostView === true;
    const isQuestionItemNotRevealed = this.state.questionItem.isRevealed !== true
    const shouldCompressAnswerItems = isHostView && isQuestionItemNotRevealed
    const numberOfAnswerItems = this.state.answerItems.length
    return shouldCompressAnswerItems ? [{
      id: "compressed-answers",
      isRevealed: false,
      text: `${numberOfAnswerItems} risposte`
    }] : this.state.answerItems
  }

  onItemReveal = (itemId, newState) => {
    const item = this.state.answerItems.find(x => itemId === x.id)
    if (newState === true && item && item.points) {
      const activePlayer = this.state.players.find(x => x.active === true)
      if (activePlayer) {
        this.updateScore(activePlayer.name, item.points, this.state.scoreAdditionMode)
      }
    }
  }

  onManualEditScore = (targetPlayerName, newScore) => {
    this.updateScore(targetPlayerName, newScore, ScoreAdditionMode.SET)
    if (this.props.hostView) {
      this.serviceApi.forceRefresh(this.props.roundId)
    }
  }

  updateScore = (targetPlayerName, pointsToAdd, scoreAdditionMode) => {
    const newPlayers = [...this.state.players]
    const targetPlayer = newPlayers.find(x => x.name === targetPlayerName)
    if (targetPlayer) {
      if (ScoreAdditionMode.ADD === scoreAdditionMode) {
        const current = targetPlayer.ref.current;
        const score = current.state.score + pointsToAdd
        current.setScore(score)
        targetPlayer.score = score
      }
      if (ScoreAdditionMode.SET === scoreAdditionMode) {
        const current = targetPlayer.ref.current;
        const score = pointsToAdd
        current.setScore(score)
        targetPlayer.score = score
      }
    }

    this.setState({ players: newPlayers })

    if (this.props.hostView === true) {
      this.serviceApi.updateScores(this.props.roundId, newPlayers)
    }
  }

  render() {
    const { hostView, roundId } = this.props
    const { questionItem, players } = this.state

    return (
        <div className="Playground">
          <header className="Playground-header">

          </header>
          <div className="spacer" />
          <QuestionBox key={`question-${questionItem.id}-${questionItem.isRevealed}`} hostView={hostView}
                       roundId={roundId}
                       item={questionItem} onToggle={this.triggerToggleQuestionItemRevealed} />
          <div className="spacer" />
          <ListGrid hostView={hostView} roundId={roundId}
                    items={this.answerItems()} onToggleReveal={this.onItemReveal} />
          <div className="spacer" />
          <PlayerGrid hostView={hostView} onManualEditScore={this.onManualEditScore}
                      players={players} setActivePlayer={this.triggerSetActivePlayer} />
        </div>
    );
  }
}

export default Playground;
