import { getServiceUrl } from './config-api'
import { Player } from '../domain/player'

class ServiceApi {
  createSocketConnection = () => {
    const url = new URL(getServiceUrl())
    return new WebSocket(
      `${url.protocol === 'https:' ? 'wss' : 'ws'}://${url.host}/connect`,
    )
  }

  getRound = async (roundId: string) => {
    const r = await fetch(`${getServiceUrl()}/round/${roundId}`, {
      headers: { 'ngrok-skip-browser-warning': 'any' },
    })
    return await r.json()
  }

  updateRound = (
    roundId: string,
    itemId: string,
    newRevealed: boolean,
    thenCallback?:
      | ((value: Response) => Response | PromiseLike<Response>)
      | null,
    catchCallback?: ((reason: any) => PromiseLike<never>) | null,
  ) => {
    fetch(`${getServiceUrl()}/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId, isRevealed: newRevealed }),
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
      },
    })
      .then(thenCallback)
      .catch(catchCallback)
  }

  forceRefresh = (
    roundId: string,
    thenCallback?:
      | ((value: Response) => Response | PromiseLike<Response>)
      | null,
    catchCallback?: ((reason: any) => PromiseLike<never>) | null,
  ) => {
    fetch(`${getServiceUrl()}/round/${roundId}/force-refresh`, {
      method: 'POST',
      headers: { 'ngrok-skip-browser-warning': 'any' },
    })
      .then(thenCallback)
      .catch(catchCallback)
  }

  updateScores = (
    roundId: string,
    players: Player[],
    thenCallback?:
      | ((value: Response) => Response | PromiseLike<Response>)
      | null,
    catchCallback?: ((reason: any) => PromiseLike<never>) | null,
  ) => {
    fetch(`${getServiceUrl()}/round/${roundId}/set-scores`, {
      method: 'POST',
      body: JSON.stringify(
        players.map(x => {
          return { name: x.name, score: x.score }
        }),
      ),
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
      },
    })
      .then(thenCallback)
      .catch(catchCallback)
  }

  setActivePlayer = (
    roundId: string,
    name?: string,
    thenCallback?:
      | ((value: Response) => Response | PromiseLike<Response>)
      | null,
    catchCallback?: ((reason: any) => PromiseLike<never>) | null,
  ) => {
    fetch(`${getServiceUrl()}/round/${roundId}/set-active-player`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
      },
    })
      .then(thenCallback)
      .catch(catchCallback)
  }

  setPlayerStrikes = (
    roundId: string,
    name: string,
    strikes: number,
    thenCallback?:
      | ((value: Response) => Response | PromiseLike<Response>)
      | null,
    catchCallback?: ((reason: any) => PromiseLike<never>) | null,
  ) => {
    fetch(`${getServiceUrl()}/round/${roundId}/set-player-strikes`, {
      method: 'POST',
      body: JSON.stringify({ name, strikes }),
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
      },
    })
      .then(thenCallback)
      .catch(catchCallback)
  }

  setScoreAdditionMode = (
    roundId: string,
    newMode: string,
    thenCallback?:
      | ((value: Response) => Response | PromiseLike<Response>)
      | null,
    catchCallback?: ((reason: any) => PromiseLike<never>) | null,
  ) => {
    fetch(`${getServiceUrl()}/round/${roundId}/set-score-addition-mode`, {
      method: 'POST',
      body: JSON.stringify({ mode: newMode }),
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'any',
      },
    })
      .then(thenCallback)
      .catch(catchCallback)
  }

  showStrike = (
    thenCallback?:
      | ((value: Response) => Response | PromiseLike<Response>)
      | null,
    catchCallback?: ((reason: any) => PromiseLike<never>) | null,
  ) => {
    fetch(`${getServiceUrl()}/show-strike`, {
      method: 'POST',
      headers: {
        'ngrok-skip-browser-warning': 'any',
      },
    })
      .then(thenCallback)
      .catch(catchCallback)
  }
}

export const setScoreAdditionMode = (
  roundId: string,
  newMode: string,
  thenCallback?: ((value: Response) => Response | PromiseLike<Response>) | null,
  catchCallback?: ((reason: any) => PromiseLike<never>) | null,
) => {
  fetch(`${getServiceUrl()}/round/${roundId}/set-score-addition-mode`, {
    method: 'POST',
    body: JSON.stringify({ mode: newMode }),
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'any',
    },
  })
    .then(thenCallback)
    .catch(catchCallback)
}

export default ServiceApi
