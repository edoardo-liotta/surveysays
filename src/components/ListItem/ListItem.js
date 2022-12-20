import logo from '../../logo.svg';
import './ListItem.css';

function ListItem(props) {
 const {itemNumber, text, points} = props
  return (
    <div className="ListItem">
      <header className="ListItem-header">
        {itemNumber &&
            <div className="ListItem-number">
              <div className="spacer" />
              <div className="spacer" />
              <div>{itemNumber}</div>
              <div className="spacer" />
              <div className="spacer" />
            </div>
        }
        {text &&
            <div className="ListItem-answer">
              <div className="ListItem-text">
                <div className="spacer"/>
                {text}
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
