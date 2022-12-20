class ServiceApi {

  //host = `${window.location.hostname}:8080`
  host = "d283-165-225-202-155.eu.ngrok.io"
  schema = "https"

  updateRound = (roundId, itemId, newDiscovered, thenCallback, catchCallback) => {
    fetch(`${this.schema}://${this.host}/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId, isDiscovered: newDiscovered }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then(thenCallback)
        .catch(catchCallback)
  }

  getRound = (roundId) => {
    return fetch(`${this.schema}://${this.host}/round/${roundId}`).then(r => r.json())
  }

  createSocketConnection = () => {
    return new WebSocket(`ws://${this.host}/connect`);
  }
}

export default ServiceApi;