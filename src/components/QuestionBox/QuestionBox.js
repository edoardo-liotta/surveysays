import './QuestionBox.css';
import '../common.css';
import { useState } from 'react';
import ServiceApi from '../../api/service-api';

const hostViewClass = "host-view"
const isRevealedClass = "is-revealed"
const serviceApi = new ServiceApi()

function QuestionBox(props) {
  const { hostView, roundId, item, onToggle } = props

  const [revealed, setRevealed] = useState(item && item.isRevealed === true)

  function toggleState() {
    let initialState = revealed;
    let newRevealed = !initialState;
    setRevealed(newRevealed);
    onToggle(newRevealed);
    serviceApi.updateRound(roundId, item.id, newRevealed, (_) => {
    }, (_) => setRevealed(initialState));
  }

  return (
      <div className="QuestionBox" onClick={toggleState}>
        <header className="QuestionBox-header">
          {item && item.coverText && !hostView && !revealed &&
              <div className="QuestionBox-cover">
                <div className="spacer" />
                <div>{item.coverText}</div>
                <div className="spacer" />
              </div>
          }
          {item && item.text &&
              <div
                  className={"QuestionBox-question " + (hostView ? hostViewClass : "") + " " + (revealed ? isRevealedClass : "")}>
                <div className="QuestionBox-text">
                  {(revealed || hostView) && <>
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
