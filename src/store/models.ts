import { State as UserState } from './user'
import { State as GamesState } from './games'
import { State as PlatformsState } from './platforms'

export interface State {
  games: GamesState
  platforms: PlatformsState
  user: UserState
}
