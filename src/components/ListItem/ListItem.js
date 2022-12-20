import logo from '../../logo.svg';
import './ListItem.css';

const hostViewClass = "host-view"
const isDiscoveredClass = "is-discovered"

function ListItem(props) {
 const {hostView, isDiscovered, itemNumber, text, points} = props


  return (
    <div className="ListItem">
      <header className="ListItem-header">
        {itemNumber && !hostView && !isDiscovered &&
            <div className="ListItem-number">
              <div className="spacer" />
              <div className="spacer" />
              <div>{itemNumber}</div>
              <div className="spacer" />
              <div className="spacer" />
            </div>
        }
        {text &&
            <div className={"ListItem-answer " + (hostView ? hostViewClass : "") +" "+ (isDiscovered ? isDiscoveredClass : "")}>
              <div className="ListItem-text">
                {itemNumber &&
                    <div className="ListItem-answer-number">
                      <div className="spacer" />
                      <div>{itemNumber}</div>
                      <div className="spacer" />
                    </div>
                }
                <div className="spacer"/>
                {text}
                <div className="spacer"/>
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
