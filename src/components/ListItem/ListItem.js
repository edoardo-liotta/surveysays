import './ListItem.css';
import '../common.css';
import { useState } from 'react';
import ServiceApi from '../../api/service-api';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"
const serviceApi = new ServiceApi()

function ListItem(props) {
  const { roundId, id, hostView, isDiscovered, coverText, text, points } = props

  const [discovered, setDiscovered] = useState(isDiscovered)

  function toggleState() {
    let initialState = discovered;
    let newDiscovered = !initialState;
    setDiscovered(newDiscovered)
    if ("compressed-answers" !== id) {
      serviceApi.updateRound(roundId, id, newDiscovered, (_) => {
      }, (_) => setDiscovered(initialState))
    }
  }

  return (
      <div className="ListItem" key={id} onClick={toggleState}>
        <header
            className={"ListItem-header " + (hostView ? hostViewClass : "") + " " + (discovered ? isDiscoveredClass : "")}>
          {coverText && !hostView && !discovered &&
              <div className="ListItem-number">
                <div className="spacer" />
                <div className="spacer" />
                <div>{coverText}</div>
                <div className="spacer" />
                <div className="spacer" />
              </div>
          }
          {text && (hostView || discovered) &&
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

        </header>
      </div>
  );
}

export default ListItem;
