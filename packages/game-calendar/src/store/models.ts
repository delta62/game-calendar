import { State as UserState } from './user'
import { State as GamesState } from './games'

export interface State {
  games: GamesState
  user: UserState
}
