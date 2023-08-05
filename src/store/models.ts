import { State as UserState } from './user'
import { State as GamesState } from './games'
import { State as PlatformsState } from './platforms'
import { State as ViewState } from './view'

export interface State {
  games: GamesState
  platforms: PlatformsState
  user: UserState
  view: ViewState
}
