import './PlayerBox.css';
import '../common.css';
import { Component } from 'react';

const hostViewClass = "host-view"
const isActiveClass = "is-active"

class PlayerBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.active,
    }
  }

  setActive(newActive) {
    this.state.isActive = newActive
  }

  render() {
    const { name, score, hostView, setActivePlayer } = this.props
    const { isActive } = this.state

    function toggleState() {
      const newName = isActive ? null : name
      setActivePlayer(newName)
    }

    return (
        <div
            className={"PlayerBox " + (hostView ? hostViewClass : "") + " " + (this.state.isActive ? isActiveClass : "")}
            onClick={toggleState}>
          <span>{name}</span><br />
          <span>{score}</span>
        </div>
    );
  }
}

export default PlayerBox;
