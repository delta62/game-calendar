import apiClient from '@client'
import {
  AddGame,
  AsyncAction,
  CompleteGame,
  DeleteGame,
  FinishGame,
  ReorderGame,
  SelectGame,
  SetDuration,
  SetRating,
  SetTitle,
  StartGame,
} from './actions'

export let addGame = (userId: string, name: string): AddGame => {
  let game = {
    id: Date.now(),
    name,
  }

  apiClient.saveGame(userId, game)

  return {
    type: 'ADD_GAME',
    ...game,
  }
}

export let startGame = (id: number, state: boolean): StartGame => ({
  type: 'START_GAME',
  id,
  time: state ? Date.now() : undefined,
})

export let finishGame = (id: number, state: boolean): FinishGame => ({
  type: 'FINISH_GAME',
  id,
  time: state ? Date.now() : undefined,
})

export let completeGame = (id: number, state: boolean): CompleteGame => ({
  type: 'COMPLETE_GAME',
  id,
  time: state ? Date.now() : undefined,
})

export let selectGame = (id: number): SelectGame => ({
  type: 'SELECT_GAME',
  id,
})

export let deleteGame = (id: number): DeleteGame => ({
  type: 'DELETE_GAME',
  id,
})

export let setDuration = (id: number, duration: number): SetDuration => ({
  type: 'SET_DURATION',
  id,
  duration,
})

export let setRating = (id: number, rating: number): SetRating => ({
  type: 'SET_RATING',
  id,
  rating,
})

export let setTitle = (id: number, title: string): SetTitle => ({
  type: 'SET_TITLE',
  id,
  title,
})

export let fetchGames = (userId: string): AsyncAction => {
  return async dispatch => {
    dispatch({ type: 'FETCH_GAMES' })
    try {
      let games = await apiClient.getGames(userId)
      dispatch({ type: 'FETCH_GAMES_OK', games })
    } catch (error) {
      dispatch({ type: 'FETCH_GAMES_ERROR', error })
    }
  }
}

export let login = (email: string, password: string): AsyncAction => {
  return async dispatch => {
    try {
      let user = await apiClient.login(email, password)
      dispatch({ type: 'LOGGED_IN', user })
    } catch (error) {
      console.error('Error logging in', error)
    }
  }
}

export let reorderGame = (
  id: number,
  before: boolean,
  target: number
): ReorderGame => ({
  type: 'REORDER_GAME',
  id,
  before,
  target,
})
