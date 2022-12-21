import buzzFx from '../audiofx/incorrect-buzz.mp3'
import dingFx from '../audiofx/correct-ding.mp3'

const playAudio = (audioFile, thenCallback, catchCallback) => {
  new Audio(audioFile).play().then(thenCallback).catch(catchCallback)
}

const playBuzz = (thenCallback, catchCallback) => {
  playAudio(buzzFx, thenCallback, catchCallback)
}

const playDing = (thenCallback, catchCallback) => {
  playAudio(dingFx, thenCallback, catchCallback)
}

export { playBuzz, playDing }