import './QuestionBox.css';
import '../common.css';
import { useState } from 'react';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function QuestionBox(props) {
  const { hostView, item } = props

  const [discovered, setDiscovered] = useState(item && item.isDiscovered)

  function toggleState() {
    setDiscovered(!discovered)
  }

  return (
      <div className="QuestionBox" onClick={toggleState}>
        <header className="QuestionBox-header">
          {item && item.coverText && !hostView && !discovered &&
              <div className="QuestionBox-cover">
                <div className="spacer" />
                <div className="spacer" />
                <div>{item.coverText}</div>
                <div className="spacer" />
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
