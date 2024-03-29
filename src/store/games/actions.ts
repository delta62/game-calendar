import { Action } from 'redux'

import { Game } from './models'

export const ADD_GAME = 'ADD_GAME'
export const DELETE_GAME = 'DELETE_GAME'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const SELECT_GAME = 'SELECT_GAME'
export const UPDATE_ERROR = 'UPDATE_ERROR'
export const UPDATE_GAME = 'UPDATE_GAME'
export const UNRATE_GAME = 'UNRATE_GAME'

export interface AddGame extends Action<typeof ADD_GAME> {
  id: number
  name: string
}

export interface UpdateGame extends Action<typeof UPDATE_GAME> {
  game: Pick<Game, 'id'> & Partial<Game>
}

export interface UnrateGame extends Action<typeof UNRATE_GAME> {
  id: number
}

export interface SelectGame extends Action<typeof SELECT_GAME> {
  id: number
}

export interface DeleteGame extends Action<typeof DELETE_GAME> {
  id: number
}

export interface FetchRequest extends Action<typeof FETCH_REQUEST> {
  nextPage: string | null
}

export interface FetchSuccess extends Action<typeof FETCH_SUCCESS> {
  games: Game[]
  nextPage: string | null
}

export interface FetchError extends Action<typeof FETCH_ERROR> {
  error: unknown
}

export interface UpdateError extends Action<typeof UPDATE_ERROR> {
  error: unknown
}

type AppAction =
  | AddGame
  | DeleteGame
  | FetchError
  | FetchRequest
  | FetchSuccess
  | SelectGame
  | UpdateError
  | UpdateGame
  | UnrateGame

export default AppAction
