import buzzFx from '../audiofx/incorrect-buzz.mp3'
import dingFx from '../audiofx/correct-ding.mp3'

const playAudio = (
  audioFile: string,
  thenCallback?: ((value: void) => void | PromiseLike<void>) | null,
  catchCallback?: ((reason: any) => PromiseLike<never>) | null,
) => {
  new Audio(audioFile).play()?.then(thenCallback).catch(catchCallback)
}

export const playBuzz = (
  thenCallback?: ((value: void) => void | PromiseLike<void>) | null,
  catchCallback?: ((reason: any) => PromiseLike<never>) | null,
) => {
  playAudio(buzzFx, thenCallback, catchCallback)
}

export const playDing = (
  thenCallback?: ((value: void) => void | PromiseLike<void>) | null,
  catchCallback?: ((reason: any) => PromiseLike<never>) | null,
) => {
  playAudio(dingFx, thenCallback, catchCallback)
}
