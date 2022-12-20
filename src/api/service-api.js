import { getServiceUrl } from './config-api';

class ServiceApi {

  serviceUrl = getServiceUrl()
  host = new URL(this.serviceUrl).host
  protocol = new URL(this.serviceUrl).protocol

  createSocketConnection = () => {
    return new WebSocket(`${(this.protocol === "https:" ? "wss" : "ws")}://${this.host}/connect`);
  }

  getRound = (roundId) => {
    return fetch(`${this.serviceUrl}/round/${roundId}`).then(r => r.json())
  }

  updateRound = (roundId, itemId, newRevealed, thenCallback, catchCallback) => {
    fetch(`${this.serviceUrl}/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId, isRevealed: newRevealed }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  forceRefresh = (roundId, thenCallback, catchCallback) => {
    fetch(`${this.serviceUrl}/round/${roundId}/force-refresh`, {
      method: 'POST'
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  updateScores = (roundId, players, thenCallback, catchCallback) => {
    fetch(`${this.serviceUrl}/round/${roundId}/set-scores`, {
      method: 'POST',
      body: JSON.stringify(players.map(x => {
        return { name: x.name, score: x.score }
      })),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  setActivePlayer = (roundId, name, thenCallback, catchCallback) => {
    fetch(`${this.serviceUrl}/round/${roundId}/set-active-player`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }
}

export default ServiceApi;