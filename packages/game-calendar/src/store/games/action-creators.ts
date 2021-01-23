import { Game } from './models'
import {
  ADD_GAME,
  DELETE_GAME,
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  REORDER_GAME,
  SELECT_GAME,
  UPDATE_ERROR,
  UPDATE_GAME,
  AddGame,
  DeleteGame,
  FetchError,
  FetchRequest,
  FetchSuccess,
  ReorderGame,
  SelectGame,
  UpdateError,
  UpdateGame,
} from './actions'

export let addGame = (name: string): AddGame => ({
  type: ADD_GAME,
  id: Date.now(),
  name,
})

export let startGame = (id: number, state: boolean): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    started: state ? Date.now() : undefined,
  },
})

export let finishGame = (id: number, state: boolean): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    finished: state ? Date.now() : undefined,
  },
})

export let completeGame = (id: number, state: boolean): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    completed: state ? Date.now() : undefined,
  },
})

export let selectGame = (id: number): SelectGame => ({
  type: SELECT_GAME,
  id,
})

export let deleteGame = (id: number): DeleteGame => ({
  type: DELETE_GAME,
  id,
})

export let setDuration = (id: number, duration: number): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    duration,
  }
})

export let setRating = (id: number, rating: number): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    rating,
  },
})

export let setTitle = (id: number, name: string): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    name,
  },
})

export let fetchRequest = (): FetchRequest => ({
  type: FETCH_REQUEST,
})

export let fetchSuccess = (games: Game[]): FetchSuccess => ({
  type: FETCH_SUCCESS,
  games,
})

export let fetchError = (error: any): FetchError => ({
  type: FETCH_ERROR,
  error,
})

export let updateError = (error: any): UpdateError => ({
  type: UPDATE_ERROR,
  error,
})

export let setPlatform = (id: number, platform: number): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    platform,
  },
})

export let reorderGame = (
  id: number,
  before: boolean,
  target: number
): ReorderGame => ({
  type: REORDER_GAME,
  id,
  before,
  target,
})
