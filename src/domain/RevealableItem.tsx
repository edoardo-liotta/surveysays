import { Referrable } from './referrable'

export type RevealableItem = {
  id: string
  text: string
  coverText?: string
  isRevealed: boolean
  points?: number
}

export type ReferrableRevealableItem = Referrable<any> & RevealableItem
