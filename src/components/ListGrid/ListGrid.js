import './ListGrid.css';
import '../common.css';

import ListItem from '../ListItem/ListItem';

function ListGrid(props) {
  const { hostView, roundId, items } = props

  function listItem(item) {
    if (item) {
      return <ListItem key={JSON.stringify(item)} roundId={roundId} id={item.id} hostView={hostView}
                       isDiscovered={item.isDiscovered}
                       coverText={item.coverText}
                       text={item.text} points={item.points} />
    } else if (!hostView) {
      return <ListItem />
    } else {
      return <></>
    }
  }

  return (
      <div className="ListGrid">
        {items && Array.from({ ...items, length: 8 }).map(function (item, i) {
          return listItem(item)
        })}
      </div>
  );
}

export default ListGrid;