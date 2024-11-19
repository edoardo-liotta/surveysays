import ServiceApi from './api/service-api'
import React, { useEffect, useRef, useState } from 'react'
import { RoundInfo } from './domain/round-info'
import Playground from './components/Playground/Playground'
import { updateScoreClassic } from './update-score-fn/UpdateScoreClassic'

const serviceApi = new ServiceApi()
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

  const updateRoundId = (newRoundId: string) => {
    setRoundId(newRoundId)
    setFetching(true)
    if (hostView) {
      serviceApi.forceRefresh(newRoundId)
    }
  }
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
          updateRoundId(message.slice(12))
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
          key={`${roundId} ${roundHash}`}
          ref={playground}
          hostView={hostView}
          roundId={roundId}
          roundInfo={roundInfo}
          updateScoreFn={updateScoreClassic}
          updateRoundId={updateRoundId}
        />
      </header>
    </div>
  )
}

export const Host = ({ roundId }: { roundId: string }) =>
  AppView({ hostView: true, roundId })

export const Present = ({ roundId }: { roundId: string }) =>
  AppView({ hostView: false, roundId })
