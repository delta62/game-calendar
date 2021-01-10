import { Action } from 'redux'

import { Game } from './models'

export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

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

export interface FetchRequest extends Action<typeof FETCH_REQUEST> {}

export interface FetchSuccess extends Action<typeof FETCH_SUCCESS> {
  games: Game[]
}

export interface FetchError extends Action<typeof FETCH_ERROR> {
  error: unknown
}

type AppAction =
  | AddGame
  | CompleteGame
  | DeleteGame
  | FetchError
  | FetchRequest
  | FetchSuccess
  | FinishGame
  | ReorderGame
  | SelectGame
  | SetDuration
  | SetRating
  | SetTitle
  | StartGame

export default AppAction
