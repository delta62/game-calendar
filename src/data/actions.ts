import { Action } from "redux"

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

type AppAction =
  | AddGame
  | CompleteGame
  | DeleteGame
  | FinishGame
  | SelectGame
  | SetDuration
  | SetRating
  | SetTitle
  | StartGame

export default AppAction
