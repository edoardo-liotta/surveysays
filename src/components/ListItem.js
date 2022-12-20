import logo from '..//logo.svg';
import './ListItem.css';

function ListItem(props) {
 const {itemNumber} = props
  return (
    <div className="ListItem">
      <header className="ListItem-header">
        <div className="ListItem-number">
            {itemNumber}
        </div>
      </header>
    </div>
  );
}

export default ListItem;
