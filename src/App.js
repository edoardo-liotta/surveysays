import './App.css';
import ListGrid from './components/ListGrid/ListGrid';
import QuestionBox from './components/QuestionBox/QuestionBox';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          player view, discovered<br />
          <QuestionBox hostView={false} isDiscovered={true} coverText={"Abbiamo chiesto a Edoardo..."} text={"Qual è la caratteristica più bella di Cloe?"}/>
          player view, hidden<br />
          <QuestionBox hostView={false} isDiscovered={false} coverText={"Abbiamo chiesto a Edoardo..."} text={"Qual è la caratteristica più bella di Cloe?"}/>
          host view, discovered<br />
          <QuestionBox hostView={true} isDiscovered={true} coverText={"Abbiamo chiesto a Edoardo..."} text={"Qual è la caratteristica più bella di Cloe?"}/>
          host view, hidden<br />
          <QuestionBox hostView={true} isDiscovered={false} coverText={"Abbiamo chiesto a Edoardo..."} text={"Qual è la caratteristica più bella di Cloe?"}/>
        </header>
      </div>
  );
}

export default App;
