import './App.css';
import ListGrid from './components/ListGrid/ListGrid';
import QuestionBox from './components/QuestionBox/QuestionBox';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <QuestionBox hostView={false} isDiscovered={true} text={"Qual è la caratteristica più bella di Cloe?"}/>
          <QuestionBox hostView={true} isDiscovered={false} coverText={"Abbiamo chiesto a Edoardo..."} text={"Qual è la caratteristica più bella di Cloe?"}/>
          <QuestionBox hostView={false} isDiscovered={false} coverText={"Abbiamo chiesto a Edoardo..."} text={"Qual è la caratteristica più bella di Cloe?"}/>
        </header>
      </div>
  );
}

export default App;
