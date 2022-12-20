import './ListItem.css';
import '../common.css';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function ListItem(props) {
  const { id, hostView, isDiscovered, coverText, text, points } = props

  return (
      <div className="ListItem" key={id}>
        <header className="ListItem-header">
          {coverText && !hostView && !isDiscovered &&
              <div className="ListItem-number">
                <div className="spacer" />
                <div className="spacer" />
                <div>{coverText}</div>
                <div className="spacer" />
                <div className="spacer" />
              </div>
          }
          {text && (hostView || isDiscovered) &&
              <div
                  className={"ListItem-answer " + (hostView ? hostViewClass : "") + " " + (isDiscovered ? isDiscoveredClass : "")}>
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
