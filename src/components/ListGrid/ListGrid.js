import './ListGrid.css';
import ListItem from '../ListItem/ListItem';

function ListGrid() {
  return (
    <div className="ListGrid">
      <ListItem hostView={false} isDiscovered={false} itemNumber={1} text={"La risata"} points={10} />
      <ListItem hostView={false} isDiscovered={true} itemNumber={2} text={"I capelli"} points={10} />
      <ListItem hostView={true} isDiscovered={true} itemNumber={3} text={"I dentini davanti"} points={10} />
      <ListItem hostView={true} isDiscovered={false} itemNumber={4} text={"Tutto quanto"} points={10} />
      <ListItem hostView={false} isDiscovered={true} itemNumber={5} />
      <ListItem hostView={false} isDiscovered={true} itemNumber={6} />
      <ListItem hostView={false} isDiscovered={true} itemNumber={7} />
      <ListItem />
    </div>
  );
}

export default ListGrid;
