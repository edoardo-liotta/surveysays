import './App.css'
import Playground from './components/Playground/Playground'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import ServiceApi from './api/service-api'
import Configuration from './components/Configuration/Configuration'
import { ConfigurationType, getRoundId } from './api/config-api'
import React from 'react'
import { RoundInfo } from './domain/round-info'

const serviceApi = new ServiceApi()

const Home = ({
  onSave,
}: {
  onSave: (newConfig: ConfigurationType) => void
}) => (
  <>
    <nav>
      <ul>
        <li>
          <Link to="/host">Host</Link>
        </li>
        <li>
          <Link to="/present">Present</Link>
        </li>
      </ul>
    </nav>
    <Configuration onSave={onSave} />
  </>
)

const App = () => {
  const [roundId, setRoundId] = useState(getRoundId())

  const onSaveConfig = (newConfig?: ConfigurationType) => {
    if (newConfig) {
      setRoundId(newConfig.roundId)
    }
  }

  return (
    <Router basename={'surveysays'}>
      <Routes>
        <Route path="/host" element={<Host roundId={roundId} />} />
        <Route
          path="/present"
          element={<Present key={'appview-present'} roundId={roundId} />}
        />
        <Route path="/" element={<Home onSave={onSaveConfig} />} />
      </Routes>
    </Router>
  )
}

const AppView = ({
  hostView,
  roundId: initialRoundId,
}: {
  hostView: boolean
  roundId: string
}) => {
  const [roundInfo, setRoundInfo] = useState<RoundInfo>({
    players: [],
    questionItem: { id: '', isRevealed: false, text: '' },
    items: [],
  })
  const [roundId, setRoundId] = useState<string>(initialRoundId)
  const [roundHash, setRoundHash] = useState<string>('')
  const [fetching, setFetching] = useState<boolean>(false)
  const [socketConnection, setSocketConnection] = useState<
    WebSocket | undefined
  >()
  const playground = useRef<Playground>(null)

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
        const message = event.data
        if (message && message.startsWith('need-update ')) {
          setRoundId(message.slice(12))
          setFetching(true)
        }
        if ('show-strike' === message) {
          playground.current?.showStrike()
        }
        if (message && message.startsWith('set-revealed ')) {
          const split = message.split(' ')
          playground.current?.animateRevealed(split[1], split[2] === 'true')
        }
        if (message && message.startsWith('set-player ')) {
          playground.current?.setActivePlayer(message.slice(11))
        }
        if (message && message.startsWith('set-score-addition-mode ')) {
          const newMode = message.slice(24)
          console.log('Setting score addition mode to ' + newMode)
          playground.current?.setScoreAdditionMode(newMode)
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
        <Playground
          key={roundHash}
          ref={playground}
          hostView={hostView}
          roundId={roundId}
          roundInfo={roundInfo}
        />
      </header>
    </div>
  )
}

function Host({ roundId }: { roundId: string }) {
  return AppView({ hostView: true, roundId })
}

function Present({ roundId }: { roundId: string }) {
  return AppView({ hostView: false, roundId })
}

export default App
