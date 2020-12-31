import { Game, State } from '../models'

export let getInProgress = (state: State): number[] => state.games.allIds
  .map(id => state.games.byId[id])
  .filter(game => game.started)
  .map(game => game.id)

export let getNotStarted = (state: State): number[] => state.games.allIds
  .map(id => state.games.byId[id])
  .filter(game => !game.started)
  .map(game => game.id)

export let getGame = (state: State, id: number): Game => state.games.byId[id]

export let getIsActive = (state: State, id: number): boolean => state.selectedGame === id

export let getGames = (state: State): number[] => state.games.allIds
