import { getServiceUrl } from './config-api'

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
