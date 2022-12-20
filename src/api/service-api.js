class ServiceApi {

  host = `${window.location.hostname}:8080`

  updateRound = (roundId, itemId, newDiscovered, catchCallback) => {
    fetch(`http://${this.host}/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId, isDiscovered: newDiscovered }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => console.log(res))
        .catch(catchCallback)
  }

  getRound = (roundId) => {
    return fetch(`http://${this.host}/round/${roundId}`).then(r => r.json())
  }

  createSocketConnection = () => {
    return new WebSocket(`ws://${this.host}/connect`);
  }
}

export default ServiceApi;