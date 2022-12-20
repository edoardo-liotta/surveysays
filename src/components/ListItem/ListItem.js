import './ListItem.css';
import '../common.css';
import { useRef, useState } from 'react';
import ServiceApi from '../../api/service-api';
import { CSSTransition } from 'react-transition-group';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"
const serviceApi = new ServiceApi()

function ListItem(props) {
  const { roundId, id, hostView, isDiscovered, coverText, text, points } = props

  const [discovered, setDiscovered] = useState(isDiscovered)
  const [animateDiscovered, setAnimateDiscovered] = useState(isDiscovered)

  function animateToggle() {
    setAnimateDiscovered(!discovered)
  }

  function toggleState() {
    let initialState = discovered;
    let newDiscovered = !initialState;
    setDiscovered(newDiscovered)
    if (id && "compressed-answers" !== id) {
      serviceApi.updateRound(roundId, id, newDiscovered, (_) => {
      }, (_) => setDiscovered(initialState))
    }
  }

  const nodeRef = useRef(null);

  return (
      <div className="ListItem" key={id} onClick={animateToggle}>
        <header
            className={"ListItem-header " + (hostView ? hostViewClass : "") + " " + (discovered ? isDiscoveredClass : "")}>
          <CSSTransition nodeRef={nodeRef} in={animateDiscovered} timeout={300}
                         classNames={isDiscoveredClass} onEntering={toggleState} onExited={toggleState}>
            <div ref={nodeRef}>
              {coverText && !hostView && !discovered &&
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
                      className={"ListItem-answer " + (hostView ? hostViewClass : "") + " " + (discovered ? isDiscoveredClass : "")}>
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
