import PlayerBox from '../components/PlayerBox/PlayerBox'
import { Referrable } from './referrable'

export type Player = {
  name: string
  score: number
}
export type StatefulPlayer = Player &
  Referrable<PlayerBox> & {
    active: boolean
  }
