import './ListGrid.css';
import '../common.css';

import ListItem from '../ListItem/ListItem';

function ListGrid(props) {
  const { hostView, roundId, items } = props

  function listItem(item, i) {
    if (item) {
      return <ListItem key={JSON.stringify(item) + i} roundId={roundId} id={item.id} hostView={hostView}
                       isRevealed={item.isRevealed}
                       coverText={item.coverText}
                       text={item.text} points={item.points} />
    } else if (!hostView) {
      return <ListItem key={i} />
    } else {
      return <div key={`listitem-${i}`}></div>
    }
  }

  return (
      <div className="ListGrid">
        {items && Array.from({ ...items, length: 8 }).map(function (item, i) {
          return listItem(item, i)
        })}
      </div>
  );
}

export default ListGrid;