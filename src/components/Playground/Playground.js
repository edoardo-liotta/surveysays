import './Playground.css';
import '../common.css';
import QuestionBox from '../QuestionBox/QuestionBox';
import ListGrid from '../ListGrid/ListGrid';

function Playground(props) {
  const { hostView, roundId, roundInfo } = props

  return (
      <div className="Playground">
        <header className="Playground-header">

        </header>
        <div className="spacer" />
        <QuestionBox key={JSON.stringify(roundInfo.questionItem)} hostView={hostView} roundId={roundId}
                     item={roundInfo.questionItem} />
        <div className="spacer" />
        <ListGrid hostView={hostView} roundId={roundId} items={roundInfo.items} />
      </div>
  );
}

export default Playground;
