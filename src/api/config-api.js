const defaultConfiguration = () => {
  return {
    roundId: 1,
    serviceUrl: "http://localhost:8080"
  }
}

const getConfiguration = () => {
  if (window && window.localStorage) {
    if (window.localStorage.getItem("configuration") === null) {
      window.localStorage.setItem("configuration", JSON.stringify(defaultConfiguration()))
    }

    return JSON.parse(window.localStorage.getItem("configuration"))
  }

  return defaultConfiguration()
}

const setConfiguration = (newConfiguration) => {
  if (window && window.localStorage) {
    window.localStorage.setItem("configuration", JSON.stringify(newConfiguration))
  }
}

const resetConfiguration = () => {
  if (window && window.localStorage) {
    window.localStorage.removeItem("configuration")
  }
}

const getRoundId = () => {
  return getConfiguration().roundId
}

const getServiceUrl = () => {
  return getConfiguration().serviceUrl
}

export { getConfiguration, getRoundId, getServiceUrl, resetConfiguration, setConfiguration }