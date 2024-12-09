import { RevealableItem } from './RevealableItem'
import { StatefulPlayer } from './player'

export type RoundInfo = {
  id: string
  items: RevealableItem[]
  players: StatefulPlayer[]
  questionItem: RevealableItem
}
