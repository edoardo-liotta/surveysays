import './Playground.css';
import '../common.css';
import PlayerGrid from '../PlayerGrid/PlayerGrid';
import QuestionBox from '../QuestionBox/QuestionBox';
import ListGrid from '../ListGrid/ListGrid';
import { Component, createRef } from 'react';
import ServiceApi from '../../api/service-api';

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerItems: (this.props.roundInfo && this.props.roundInfo.items) || [],
      questionItemRevealed: ((this.props.roundInfo && this.props.roundInfo.questionItem && this.props.roundInfo.questionItem.isRevealed === true) || false),
      players: [{
        name: "Player 1",
        active: false,
        score: 0,
        ref: createRef()
      }, { name: "Player 2", active: false, score: 0, ref: createRef() }]
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

  toggleQuestionItemRevealed = (stateChange) => {
    this.setState({
      questionItemRevealed: stateChange
    })
  }

  answerItems = () => {
    const shouldCompressAnswerItems = this.props.hostView === true && !this.state.questionItemRevealed
    const numberOfAnswerItems = this.state.answerItems.length
    return shouldCompressAnswerItems ? [{
      id: "compressed-answers",
      isRevealed: false,
      text: `${numberOfAnswerItems} risposte`
    }] : this.state.answerItems
  }

  render() {
    const { hostView, roundId, roundInfo } = this.props
    const { answerItems, players } = this.state

    return (
        <div className="Playground">
          <header className="Playground-header">

          </header>
          <div className="spacer" />
          <QuestionBox key={`${JSON.stringify(roundInfo.questionItem)}-question`} hostView={hostView} roundId={roundId}
                       item={roundInfo.questionItem} onToggle={this.toggleQuestionItemRevealed} />
          <div className="spacer" />
          <ListGrid key={JSON.stringify(answerItems)} hostView={hostView} roundId={roundId}
                    items={this.answerItems()} />
          <div className="spacer" />
          <PlayerGrid
              players={players} setActivePlayer={this.triggerSetActivePlayer} />
        </div>
    );
  }
}

export default Playground;
