import './Playground.css';
import '../common.css';
import QuestionBox from '../QuestionBox/QuestionBox';
import ListGrid from '../ListGrid/ListGrid';
import { useEffect, useState } from 'react';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function Playground(props) {
  const { hostView, roundId } = props

  const [roundInfo, setRoundInfo] = useState({ question: {}, items: [] })
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    console.log(roundInfo)
    if (!fetching) {
      setFetching(true)
    }
  }, [])

  useEffect(() => {
    if (fetching) {
      fetch(`http://localhost:8080/round/${roundId}`).then(r => {
        console.log(r)
        r.json().then(j => setRoundInfo(j))
      }).finally(() => {
        setFetching(false)
        console.log(roundInfo)
        console.log(roundInfo.items)
      })
    }
  }, [fetching, roundInfo])

  return (
      <div className="Playground">
        <header className="Playground-header">

        </header>
        <div className="spacer" />
        <QuestionBox hostView={hostView} roundId={roundId} item={roundInfo.question} />
        <div className="spacer" />
        <ListGrid hostView={hostView} roundId={roundId} items={roundInfo.items} />
      </div>
  );
}

export default Playground;
