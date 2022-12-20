import logo from './logo.svg';
import './App.css';
import ListItem from './components/ListItem/ListItem';
import ListGrid from './components/ListGrid/ListGrid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ListGrid />
      </header>
    </div>
  );
}

export default App;
