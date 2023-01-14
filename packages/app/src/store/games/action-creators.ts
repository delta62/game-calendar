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

export let fetchRequest = (nextPage: string | null): FetchRequest => ({
  type: FETCH_REQUEST,
  nextPage,
})

export let fetchSuccess = (games: Game[], nextPage: string): FetchSuccess => ({
  type: FETCH_SUCCESS,
  games,
  nextPage,
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

export let setFinishDuration = (id: number, finishDuration: number): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    finishDuration,
  },
})

export let setCompleteDuration = (id: number, completeDuration: number): UpdateGame => ({
  type: UPDATE_GAME,
  game: {
    id,
    completeDuration,
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
