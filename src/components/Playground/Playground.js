import './Playground.css';
import '../common.css';
import QuestionBox from '../QuestionBox/QuestionBox';
import ListGrid from '../ListGrid/ListGrid';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function Playground(props) {
  const { hostView } = props

  return (
      <div className="Playground">
        <header className="Playground-header">

        </header>
        <div className="spacer" />
        <QuestionBox hostView={hostView} isDiscovered={true} text={"Qual è la caratteristica più bella di Cloe?"} />
        <div className="spacer" />
        <ListGrid />
      </div>
  );
}

export default Playground;
