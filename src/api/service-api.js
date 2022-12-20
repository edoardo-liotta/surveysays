import { getServiceUrl } from './config-api';

class ServiceApi {

  createSocketConnection = () => {
    const url = new URL(getServiceUrl());
    return new WebSocket(`${(url.protocol === "https:" ? "wss" : "ws")}://${url.host}/connect`);
  }

  getRound = (roundId) => {
    return fetch(`${(getServiceUrl())}/round/${roundId}`, {
      headers: { "ngrok-skip-browser-warning": "any" }
    }).then(r => r.json())
  }

  updateRound = (roundId, itemId, newRevealed, thenCallback, catchCallback) => {
    fetch(`${(getServiceUrl())}/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId, isRevealed: newRevealed }),
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any"
      }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  forceRefresh = (roundId, thenCallback, catchCallback) => {
    fetch(`${(getServiceUrl())}/round/${roundId}/force-refresh`, {
      method: "POST",
      headers: { "ngrok-skip-browser-warning": "any" }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  updateScores = (roundId, players, thenCallback, catchCallback) => {
    fetch(`${(getServiceUrl())}/round/${roundId}/set-scores`, {
      method: "POST",
      body: JSON.stringify(players.map(x => {
        return { name: x.name, score: x.score }
      })),
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any"
      }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  setActivePlayer = (roundId, name, thenCallback, catchCallback) => {
    fetch(`${(getServiceUrl())}/round/${roundId}/set-active-player`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "any"
      }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }
}

export default ServiceApi;