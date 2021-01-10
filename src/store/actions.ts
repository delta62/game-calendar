import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { Game, State, User } from './models'

export interface AddGame extends Action<'ADD_GAME'> {
  id: number
  name: string
}

export interface CompleteGame extends Action<'COMPLETE_GAME'> {
  id: number
  time?: number
}

export interface FinishGame extends Action<'FINISH_GAME'> {
  id: number
  time?: number
}

export interface StartGame extends Action<'START_GAME'> {
  id: number
  time?: number
}

export interface SelectGame extends Action<'SELECT_GAME'> {
  id: number
}

export interface DeleteGame extends Action<'DELETE_GAME'> {
  id: number
}

export interface SetDuration extends Action<'SET_DURATION'> {
  duration: number
  id: number
}

export interface SetRating extends Action<'SET_RATING'> {
  id: number
  rating: number
}

export interface SetTitle extends Action<'SET_TITLE'> {
  id: number
  title: string
}

export interface ReorderGame extends Action<'REORDER_GAME'> {
  id: number
  before: boolean
  target: number
}

export interface FetchGames extends Action<'FETCH_GAMES'> {}

export interface FetchGamesOk extends Action<'FETCH_GAMES_OK'> {
  games: Game[]
}

export interface FetchGamesError extends Action<'FETCH_GAMES_ERROR'> {
  error: unknown
}

export interface LoggedIn extends Action<'LOGGED_IN'> {
  user: User
}

type AppAction =
  | AddGame
  | CompleteGame
  | DeleteGame
  | FetchGames
  | FetchGamesError
  | FetchGamesOk
  | FinishGame
  | LoggedIn
  | ReorderGame
  | SelectGame
  | SetDuration
  | SetRating
  | SetTitle
  | StartGame

export default AppAction

export type AsyncAction<R = unknown> = ThunkAction<R, State, {}, AppAction>
