import { Player } from '../domain/player'
import { RevealableItem } from '../domain/RevealableItem'

export const updateScoreClassic = (
  playerName: string,
  scoreValue: number,
  players: Player[],
  scoreAdditionMode: string,
  answerItems: RevealableItem[],
) => {
  const performSteal = (
    targetPlayer: Player,
    fixedNewPlayers: Record<string, Player>,
  ) => {
    let scoreToSteal = 0
    Object.entries(fixedNewPlayers).forEach(([k, v]) => {
      if (k !== playerName) {
        scoreToSteal += v.score
        v.score = 0
      }
    })

    return targetPlayer.score + scoreValue + scoreToSteal
  }

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
    let newFinalScore = targetPlayer.score
    if ('add' === scoreAdditionMode) {
      if (isAllAnswerItemsRevealed(answerItems)) {
        newFinalScore = performSteal(targetPlayer, newPlayers)
        const newFinalScore1 = Object.entries(newPlayers)
          .filter(([k]) => k !== playerName)
          .reduce((acc, [_, v]) => {
            return acc + v.score
          }, 0)
        Object.keys(newPlayers).forEach(k => {
          newPlayers[k].score = 0
        })
        newPlayers[playerName].score = newFinalScore1
      } else {
        newFinalScore = targetPlayer.score + scoreValue
        newPlayers[playerName].score = targetPlayer.score + scoreValue
      }
    }
    if ('set' === scoreAdditionMode) {
      newFinalScore = scoreValue
      newPlayers[playerName].score = scoreValue
    }
    if ('steal' === scoreAdditionMode) {
      scoreValue = 0
      newFinalScore = performSteal(targetPlayer, newPlayers)
      newPlayers[playerName].score = newFinalScore
    }

    targetPlayer.score = newFinalScore
  }
  return Object.values(newPlayers)
}
