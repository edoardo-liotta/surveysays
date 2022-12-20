import './App.css';
import ListGrid from './components/ListGrid/ListGrid';
import QuestionBox from './components/QuestionBox/QuestionBox';
import Playground from './components/Playground/Playground';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <Playground hostView={false} />
        </header>
      </div>
  );
}

export default App;
