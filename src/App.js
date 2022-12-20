import './App.css';
import Playground from './components/Playground/Playground';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/host" element={<Host />} />
          <Route path="/present" element={<Present />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
  )
}

function Home() {
  return <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/host">Host</Link>
      </li>
      <li>
        <Link to="/present">Present</Link>
      </li>
    </ul>
  </nav>;
}

function Host() {
  return (
      <div className="App">
        <header className="App-header">
          <Playground hostView={true} />
        </header>
      </div>
  )
}

function Present() {
  return (
      <div className="App">
        <header className="App-header">
          <Playground hostView={false} />
        </header>
      </div>
  )
}

export default App;
