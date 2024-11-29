import { Player } from '../domain/player'
import { RevealableItem } from '../domain/RevealableItem'
import { ScoreAdditionMode } from './score-addition-mode'

export type UpdateScoreFn = (
  playerName: string,
  scoreValue: number,
  players: Player[],
  scoreAdditionMode: string,
  answerItems: RevealableItem[],
) => Player[]

export type ScoringSystem = {
  updateScoreFn: UpdateScoreFn
  allScoreAdditionModes: ScoreAdditionMode[]
}
