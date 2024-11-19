import { Player } from '../domain/player'
import { RevealableItem } from '../domain/RevealableItem'

export const lastRevealBonus = (
  playerName: string,
  scoreValue: number,
  players: Player[],
  scoreAdditionMode: string,
  answerItems: RevealableItem[],
) => {
  const isAllAnswerItemsRevealed = (answerItems: RevealableItem[]) => {
    return answerItems.every(x => x.isRevealed)
  }

  const newPlayers = [...players].reduce(
    (acc, p) => {
      acc[p.name] = p
      return acc
    },
    {} as Record<string, Player>,
  )
  const targetPlayer = newPlayers[playerName]

  if (targetPlayer) {
    switch (scoreAdditionMode) {
      case 'add':
        targetPlayer.score += scoreValue
        if (isAllAnswerItemsRevealed(answerItems)) {
          targetPlayer.score += 50
        }
        break
      case 'set':
        targetPlayer.score = scoreValue
        break
      default:
        throw new Error(`unsupported score addition mode ${scoreAdditionMode}`)
    }
  }
  return Object.values(newPlayers)
}
