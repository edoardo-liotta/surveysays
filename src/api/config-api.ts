export type ConfigurationType = {
  roundId: number
  serviceUrl: string
}

const defaultConfiguration = () => {
  return {
    roundId: 1,
    serviceUrl: 'http://localhost:8080',
  }
}

export const getConfiguration = () => {
  if (window && window.localStorage) {
    if (window.localStorage.getItem('configuration') === null) {
      window.localStorage.setItem(
        'configuration',
        JSON.stringify(defaultConfiguration()),
      )
    }

    return JSON.parse(window.localStorage.getItem('configuration')!)
  }

  return defaultConfiguration()
}

export const setConfiguration = (newConfiguration: ConfigurationType) => {
  if (window && window.localStorage) {
    window.localStorage.setItem(
      'configuration',
      JSON.stringify(newConfiguration),
    )
  }
}

export const resetConfiguration = () => {
  if (window && window.localStorage) {
    window.localStorage.removeItem('configuration')
  }
}

export const getRoundId = () => {
  return getConfiguration().roundId
}

export const getServiceUrl = () => {
  return getConfiguration().serviceUrl
}
