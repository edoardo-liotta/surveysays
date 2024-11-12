import { RevealableItem } from './RevealableItem'
import { StatefulPlayer } from './player'

export type RoundInfo = {
  items: RevealableItem[]
  players: StatefulPlayer[]
  questionItem: RevealableItem
}
