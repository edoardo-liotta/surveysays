import './PlayerBox.css';
import '../common.css';
import { Component } from 'react';
import CountUp from 'react-countup';

const hostViewClass = "host-view"
const isActiveClass = "is-active"

class PlayerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.active,
      score: props.score || 0,
      targetScore: props.score || 0
    }
  }

  setActive = (newActive) => {
    this.setState({
      isActive: newActive
    })
  }

  setScore = (newScore) => {
    this.setState({ targetScore: newScore })
  }

  afterAnimateScore = () => {
    this.setState({ score: this.state.targetScore })
  }

  render() {
    const { name, hostView, setActivePlayer } = this.props
    const { isActive, score, targetScore } = this.state

    function toggleState() {
      const newName = isActive ? null : name
      setActivePlayer(newName)
    }

    return (
        <div
            className={"PlayerBox " + (hostView ? hostViewClass : "") + " " + (this.state.isActive ? isActiveClass : "")}
            onClick={toggleState}>
          <span>{name}</span><br />
          <span><CountUp start={score} end={targetScore} onEnd={this.afterAnimateScore} /></span>
        </div>
    );
  }
}

export default PlayerBox;
