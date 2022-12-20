class ServiceApi {

  updateRound = (roundId, itemId, newDiscovered, catchCallback) => {
    fetch(`http://localhost:8080/round/${roundId}/update`, {
      method: 'POST',
      body: JSON.stringify({ id: itemId, isDiscovered: newDiscovered }),
      headers: { 'Content-Type': 'application/json' }
    })
        .then((res) => console.log(res))
        .catch(catchCallback)
  }

  getRound = (roundId) => {
    return fetch(`http://localhost:8080/round/${roundId}`).then(r => r.json())
  }
}

export default ServiceApi;