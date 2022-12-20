import logo from './logo.svg';
import './App.css';
import ListItem from './components/ListItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ListItem itemNumber={1} />
        <ListItem text={"I capelli"} points={10} />
        <ListItem text={"I dentini davanti"} points={10} />
        <ListItem itemNumber={4} />
        <ListItem itemNumber={5} />
        <ListItem itemNumber={6} />
        <ListItem itemNumber={7} />
        <ListItem itemNumber={8} />
      </header>
    </div>
  );
}

export default App;
