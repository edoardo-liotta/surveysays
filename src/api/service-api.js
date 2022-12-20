class ServiceApi {

  host = `${window.location.hostname}:8080`
  schema = "http"
  //host = "d283-165-225-202-155.eu.ngrok.io"
  //schema = "https"

  updateRound = (roundId, itemId, newRevealed, thenCallback, catchCallback) => {
    fetch(`${this.schema}://${this.host}/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId, isRevealed: newRevealed }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  getRound = (roundId) => {
    return fetch(`${this.schema}://${this.host}/round/${roundId}`).then(r => r.json())
  }

  setActivePlayer = (roundId, name, thenCallback, catchCallback) => {
    fetch(`${this.schema}://${this.host}/round/${roundId}/set-active-player`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  updateScores = (roundId, players, thenCallback, catchCallback) => {
    fetch(`${this.schema}://${this.host}/round/${roundId}/set-scores`, {
      method: 'POST',
      body: JSON.stringify(players.map(x => {
        return { name: x.name, score: x.score }
      })),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  createSocketConnection = () => {
    return new WebSocket(`ws://${this.host}/connect`);
  }

  forceRefresh = (roundId, thenCallback, catchCallback) => {
    fetch(`${this.schema}://${this.host}/round/${roundId}/force-refresh`, {
      method: 'POST'
    })
        .then(thenCallback)
        .catch(catchCallback)
  }
}

export default ServiceApi;