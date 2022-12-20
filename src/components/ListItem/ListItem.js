import './ListItem.css';
import '../common.css';
import { useState } from 'react';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function ListItem(props) {
  const { roundId, id, hostView, isDiscovered, coverText, text, points } = props

  const [discovered, setDiscovered] = useState(isDiscovered)

  function toggleState() {
    let initialState = discovered;
    setDiscovered(!initialState)
    fetch(`http://localhost:8080/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id, isDiscovered: true }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => console.log(res))
        .catch((_) => {
          setDiscovered(initialState)
        })
  }

  return (
      <div className="ListItem" key={id} onClick={toggleState}>
        <header className="ListItem-header">
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
                      <div className="ListItem-answer-number">
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
