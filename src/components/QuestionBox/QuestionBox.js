import './QuestionBox.css';
import '../common.css';
import { useState } from 'react';
import ServiceApi from '../../api/service-api';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function QuestionBox(props) {
  const { hostView, roundId, item } = props

  const [discovered, setDiscovered] = useState(item && item.isDiscovered === true)

  function toggleState() {
    let initialState = discovered;
    let newDiscovered = !initialState;
    setDiscovered(newDiscovered)
    new ServiceApi().updateRound(roundId, item.id, newDiscovered, (_) => setDiscovered(initialState))
  }

  return (
      <div className="QuestionBox" onClick={toggleState}>
        <header className="QuestionBox-header">
          {item && item.coverText && !hostView && !discovered &&
              <div className="QuestionBox-cover">
                <div className="spacer" />
                <div>{item.coverText}</div>
                <div className="spacer" />
              </div>
          }
          {item && item.text &&
              <div
                  className={"QuestionBox-question " + (hostView ? hostViewClass : "") + " " + (discovered ? isDiscoveredClass : "")}>
                <div className="QuestionBox-text">
                  {(discovered || hostView) && <>
                    <div className="spacer" />
                    {item.text}
                    <div className="spacer" />
                  </>}
                </div>
              </div>
          }

        </header>
      </div>
  );
}

export default QuestionBox;
