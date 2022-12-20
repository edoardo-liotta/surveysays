import './ListGrid.css';
import '../common.css';

import ListItem from '../ListItem/ListItem';

function ListGrid(props) {
  const { hostView } = props
  return (
      <div className="ListGrid">
        <ListItem hostView={hostView} isDiscovered={false} itemNumber={1} text={"La risata"} points={10} />
        <ListItem hostView={hostView} isDiscovered={true} itemNumber={2} text={"I capelli"} points={10} />
        <ListItem hostView={hostView} isDiscovered={true} itemNumber={3} text={"I dentini davanti"} points={10} />
        <ListItem hostView={hostView} isDiscovered={false} itemNumber={4} text={"Tutto quanto"} points={10} />
        <ListItem hostView={hostView} isDiscovered={true} itemNumber={5} />
        <ListItem hostView={hostView} isDiscovered={true} itemNumber={6} />
        <ListItem hostView={hostView} isDiscovered={true} itemNumber={7} />
        <ListItem />
      </div>
  );
}

export default ListGrid;
