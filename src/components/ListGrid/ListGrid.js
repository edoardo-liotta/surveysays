import './ListGrid.css';
import ListItem from '../ListItem/ListItem';

function ListGrid(props) {
 const {itemNumber, text, points} = props
  return (
    <div className="ListGrid">
      <ListItem itemNumber={1} />
      <ListItem text={"I capelli"} points={10} />
      <ListItem text={"I dentini davanti"} points={10} />
      <ListItem text={"Tutto quanto"} />
      <ListItem itemNumber={"ANTONIETTA"} />
      <ListItem itemNumber={6} />
      <ListItem itemNumber={7} />
      <ListItem itemNumber={8} />
    </div>
  );
}

export default ListGrid;
