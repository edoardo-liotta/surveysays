import { Player } from '../../domain/player'
import { RevealableItem } from '../../domain/RevealableItem'

export const updatePlayers = (
  playerName: string,
  scoreValue: number,
  players: Player[],
  scoreAdditionMode: string,
  answerItems: RevealableItem[],
) => {
  const performSteal = (targetPlayer: Player, newPlayers1: Player[]) => {
    let scoreToSteal = 0
    newPlayers1.forEach(x => {
      if (x.name !== playerName) {
        scoreToSteal += x.score
        x.score = 0
      }
    })

    return targetPlayer.score + scoreValue + scoreToSteal
  }

  const isAllAnswerItemsRevealed = (answerItems: RevealableItem[]) => {
    return answerItems.every(x => x.isRevealed)
  }

  const newPlayers = [...players]
  const fixedNewPlayers = [...players].reduce(
    (acc, p) => {
      acc[p.name] = p
      return acc
    },
    {} as Record<string, Player>,
  )
  const targetPlayer = newPlayers.find(x => x.name === playerName)

  if (targetPlayer) {
    let newFinalScore = targetPlayer.score
    if ('add' === scoreAdditionMode) {
      if (isAllAnswerItemsRevealed(answerItems)) {
        newFinalScore = performSteal(targetPlayer, newPlayers)
        const newFinalScore1 = Object.entries(fixedNewPlayers)
          .filter(([k]) => k !== playerName)
          .reduce((acc, [_, v]) => {
            return acc + v.score
          }, 0)
        Object.keys(fixedNewPlayers).forEach(k => {
          fixedNewPlayers[k].score = 0
        })
        fixedNewPlayers[playerName].score = newFinalScore1
      } else {
        newFinalScore = targetPlayer.score + scoreValue
        fixedNewPlayers[playerName].score = targetPlayer.score + scoreValue
      }
    }
    if ('set' === scoreAdditionMode) {
      newFinalScore = scoreValue
      fixedNewPlayers[playerName].score = scoreValue
    }
    if ('steal' === scoreAdditionMode) {
      scoreValue = 0
      newFinalScore = performSteal(targetPlayer, newPlayers)
      fixedNewPlayers[playerName].score = newFinalScore
    }

    targetPlayer.score = newFinalScore
  }
  return Object.values(fixedNewPlayers)
}
