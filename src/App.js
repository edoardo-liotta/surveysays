import './App.css';
import Playground from './components/Playground/Playground';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import ServiceApi from './api/service-api';

const serviceApi = new ServiceApi()

function App() {
  return (
      <Router basename={"surveysays"}>
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
  const playground = useRef()

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
      socketConnection.onopen = function (_) {
        setFetching(true)
      }
      socketConnection.onmessage = function (event) {
        console.log(event)
        const message = event.data;
        if ("need-update" === message) {
          setFetching(true)
        }
        if (message && message.startsWith("set-revealed ")) {
          const split = message.split(" ")
          playground.current.animateRevealed(split[1], split[2] === "true")
        }
        if (message && message.startsWith("set-player ")) {
          playground.current.setActivePlayer(message.slice(11))
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
          <Playground key={roundHash} ref={playground} hostView={hostView} roundId={roundId} roundInfo={roundInfo} />
        </header>
      </div>
  )
}

function Host() {
  return AppView(true, 1)
}

function Present() {
  return AppView(false, 1);
}

export default App;
