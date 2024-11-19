import { RevealableItem } from '../domain/RevealableItem'

export const isAllAnswerItemsRevealed = (answerItems: RevealableItem[]) => {
  return answerItems.every(x => x.isRevealed)
}
