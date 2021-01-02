import {
  AddGame,
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

export let addGame = (name: string): AddGame => ({
  type: 'ADD_GAME',
  id: Date.now(),
  name,
})

export let startGame = (id: number, state: boolean): StartGame => ({
  type: 'START_GAME',
  id,
  time: state ? Date.now() : undefined
})

export let finishGame = (id: number, state: boolean): FinishGame => ({
  type: 'FINISH_GAME',
  id,
  time: state ? Date.now() : undefined
})

export let completeGame = (id: number, state: boolean): CompleteGame => ({
  type: 'COMPLETE_GAME',
  id,
  time: state ? Date.now() : undefined
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

export let reorderGame = (id: number, before: boolean, target: number): ReorderGame => ({
  type: 'REORDER_GAME',
  id,
  before,
  target,
})
