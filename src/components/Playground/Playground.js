import './Playground.css';
import '../common.css';
import QuestionBox from '../QuestionBox/QuestionBox';
import ListGrid from '../ListGrid/ListGrid';
import { useEffect, useState } from 'react';

function Playground(props) {
  const { hostView, roundId, roundInfo } = props
  const [answerItems, setAnswerItems] = useState()
  const [stateChange, triggerStateChange] = useState(((roundInfo && roundInfo.questionItem && roundInfo.questionItem.isDiscovered === true) || false))

  useEffect(() => {
    const shouldCompressAnswerItems = hostView === true && !stateChange
    const numberOfAnswerItems = (roundInfo && roundInfo.items && roundInfo.items.length) || 0
    setAnswerItems(shouldCompressAnswerItems ? [{
      id: "compressed-answers",
      isDiscovered: false,
      text: `${numberOfAnswerItems} risposte`
    }] : (roundInfo && roundInfo.items) || [])
  }, [stateChange])

  return (
      <div className="Playground">
        <header className="Playground-header">

        </header>
        <div className="spacer" />
        <QuestionBox key={JSON.stringify(roundInfo.questionItem)} hostView={hostView} roundId={roundId}
                     item={roundInfo.questionItem} onToggle={triggerStateChange} />
        <div className="spacer" />
        <ListGrid key={JSON.stringify(answerItems)} hostView={hostView} roundId={roundId} items={answerItems} />
      </div>
  );
}

export default Playground;
