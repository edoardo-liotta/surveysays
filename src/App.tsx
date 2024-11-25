import './App.css'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import React, { useState } from 'react'
import Configuration from './components/Configuration/Configuration'
import { ConfigurationType, getRoundId } from './api/config-api'
import { Host, Present } from './AppView'
import PlayerGrid from './components/PlayerGrid/PlayerGrid'

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
        <li>
          <Link to={'/component'}>Component test</Link>
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
        <Route
          path={'/component'}
          element={
            <PlayerGrid
              hostView={true}
              onManualEditScore={() => {}}
              setActivePlayer={() => {}}
              onSetStrikeCount={() => {}}
              players={[
                {
                  name: 'Player',
                  score: 50,
                  active: true,
                  strikes: 1,
                  ref: { current: null },
                },
              ]}
            />
          }
        />
        <Route path="/" element={<Home onSave={onSaveConfig} />} />
      </Routes>
    </Router>
  )
}

export default App
