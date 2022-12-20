import './ListItem.css';
import '../common.css';
import { useRef, useState } from 'react';
import ServiceApi from '../../api/service-api';
import { CSSTransition } from 'react-transition-group';

const hostViewClass = "host-view"
const isRevealedClass = "is-revealed"
const serviceApi = new ServiceApi()

function ListItem(props) {
  const { roundId, id, hostView, isRevealed, coverText, text, points } = props

  const [revealed, setRevealed] = useState(isRevealed)
  const [animateRevealed, setAnimateRevealed] = useState(isRevealed)

  function animateToggle() {
    setAnimateRevealed(!revealed)
  }

  function toggleState() {
    let initialState = revealed;
    let newRevealed = !initialState;
    setRevealed(newRevealed)
    if (id && "compressed-answers" !== id) {
      serviceApi.updateRound(roundId, id, newRevealed, (_) => {
      }, (_) => setRevealed(initialState))
    }
  }

  const nodeRef = useRef(null);

  return (
      <div className="ListItem" key={id} onClick={animateToggle}>
        <header
            className={"ListItem-header " + (hostView ? hostViewClass : "") + " " + (revealed ? isRevealedClass : "")}>
          <CSSTransition nodeRef={nodeRef} in={animateRevealed} timeout={300}
                         classNames={isRevealedClass} onEntering={toggleState} onExited={toggleState}>
            <div ref={nodeRef}>
              {coverText && !hostView && !revealed &&
                  <div className="ListItem-number">
                    <div className="spacer" />
                    <div className="spacer" />
                    <div>{coverText}</div>
                    <div className="spacer" />
                    <div className="spacer" />
                  </div>
              }

              {text &&
                  <div
                      className={"ListItem-answer " + (hostView ? hostViewClass : "") + " " + (revealed ? isRevealedClass : "")}>
                    <div className="ListItem-text">
                      {coverText &&
                          <div className="ListItem-number">
                            <div className="spacer" />
                            <div>{coverText}</div>
                            <div className="spacer" />
                          </div>
                      }
                      <div className="spacer" />
                      {text}
                      <div className="spacer" />
                    </div>
                    {points &&
                        <div className="ListItem-points">
                          {points}
                        </div>
                    }
                  </div>
              }
            </div>
          </CSSTransition>
        </header>
      </div>
  );
}

export default ListItem;
