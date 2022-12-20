import './PlayerBox.css';
import '../common.css';
import { useState } from 'react';
import ServiceApi from '../../api/service-api';

const hostViewClass = "host-view"
const isActiveClass = "is-active"
const serviceApi = new ServiceApi()

function PlayerBox(props) {
  const { name, active, score, hostView } = props
  const [isActive, setActive] = useState(active)

  function toggleState() {
    let newState = !isActive;
    setActive(newState)
  }

  return (
      <div className={"PlayerBox " + (hostView ? hostViewClass : "") + " " + (isActive ? isActiveClass : "")}
           onClick={toggleState}>
        <span>{name}</span><br />
        <span>{score}</span>
      </div>
  );
}

export default PlayerBox;
