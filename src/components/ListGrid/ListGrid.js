import './ListGrid.css';
import '../common.css';

import ListItem from '../ListItem/ListItem';

function ListGrid(props) {
  const { hostView, items } = props

  function listItem(hostView, item) {
    return <ListItem key={item.id} id={item.id} hostView={hostView} isDiscovered={item.isDiscovered}
                     coverText={item.coverText}
                     text={item.text} points={item.points} />
  }

  return (
      <div className="ListGrid">
        {items && items.map(function (item, i) {
          return listItem(hostView, item)
        })}
      </div>
  );
}

export default ListGrid;