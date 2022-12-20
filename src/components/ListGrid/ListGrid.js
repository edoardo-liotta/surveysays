import './ListGrid.css';
import '../common.css';

import ListItem from '../ListItem/ListItem';

function ListGrid(props) {
  const { hostView, roundId, items } = props

  function listItem(item) {
    return <ListItem key={JSON.stringify(item)} roundId={roundId} id={item.id} hostView={hostView}
                     isDiscovered={item.isDiscovered}
                     coverText={item.coverText}
                     text={item.text} points={item.points} />
  }

  return (
      <div className="ListGrid">
        {items && items.map(function (item, i) {
          return listItem(item)
        })}
      </div>
  );
}

export default ListGrid;