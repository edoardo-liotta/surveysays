import './ListGrid.css';
import '../common.css';

import ListItem from '../ListItem/ListItem';

function ListGrid(props) {
  const { hostView } = props
  return (
      <div className="ListGrid">
        <ListItem hostView={hostView} isDiscovered={false} coverText={1} text={"La risata"} points={10} />
        <ListItem hostView={hostView} isDiscovered={true} coverText={2} text={"I capelli"} points={10} />
        <ListItem hostView={hostView} isDiscovered={true} coverText={3} text={"I dentini davanti"} points={10} />
        <ListItem hostView={hostView} isDiscovered={false} coverText={4} text={"Tutto quanto"} points={10} />
        <ListItem hostView={hostView} isDiscovered={true} coverText={5} />
        <ListItem hostView={hostView} isDiscovered={true} coverText={6} />
        <ListItem hostView={hostView} isDiscovered={true} coverText={7} />
        <ListItem />
      </div>
  );
}

export default ListGrid;
