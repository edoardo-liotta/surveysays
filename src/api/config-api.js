const defaultConfiguration = () => {
  return {
    roundId: 1
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

const getRoundId = () => {
  return getConfiguration().roundId
}

export { defaultConfiguration, getRoundId, setConfiguration }