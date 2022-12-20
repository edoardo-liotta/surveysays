import './App.css';
import Playground from './components/Playground/Playground';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceApi from './api/service-api';

const serviceApi = new ServiceApi()

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/host" element={<Host />} />
          <Route path="/present" element={<Present key={"appview-present"} />} />
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

function AppView(hostView, roundId) {
  const [roundInfo, setRoundInfo] = useState({ questionItem: {}, items: [] })
  const [roundHash, setRoundHash] = useState("")
  const [fetching, setFetching] = useState(false)
  const [socketConnection, setSocketConnection] = useState()

  useEffect(() => {
    console.log(roundInfo)
    if (hostView && !fetching) {
      setFetching(true)
    }
    if (!hostView) {
      setSocketConnection(serviceApi.createSocketConnection())
    }
  }, [])

  useEffect(() => {
    if (fetching) {
      setFetching(false)
      serviceApi.getRound(roundId).then(j => setRoundInfo(j))
    }
  }, [fetching])

  useEffect(() => {
    console.log(roundInfo)
    console.log(roundInfo.items)
    setRoundHash(JSON.stringify(roundInfo))
  }, [roundInfo])

  useEffect(() => {
    if (socketConnection !== undefined) {
      socketConnection.onopen = function (event) {
        setFetching(true)
      }
      socketConnection.onmessage = function (event) {
        let message = event.data;
        if ("need-update" === message) {
          setFetching(true)
        }
      }
      socketConnection.onclose = function (event) {
        console.log(event)
        setSocketConnection(undefined)
      }
      socketConnection.onerror = function (event) {
        console.log(event)
        setSocketConnection(undefined)
      }
    }
  }, [socketConnection])

  return (
      <div className="App">
        <header className="App-header">
          <Playground key={roundHash} hostView={hostView} roundId={roundId} roundInfo={roundInfo} />
        </header>
      </div>
  )
}

function Host() {
  return AppView(true, 2)
}

function Present() {
  return AppView(false, 2);
}

export default App;
