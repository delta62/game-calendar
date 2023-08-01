import { Event, Game } from './models'
import { State } from '../models'
import { createSelector } from 'reselect'

export let getGame = (state: State, id: number | null): Game | null => {
  if (id != null) {
    return state.games.byId[id] ?? null
  } else {
    return null
  }
}

let selectAllIds = (state: State) => state.games.allIds
let selectAllGames = (state: State) => state.games.byId

export let startedGames = createSelector(
  selectAllIds,
  selectAllGames,
  (ids, games) =>
    ids
      .filter(id => {
        let game = games[id]
        return game?.started && !game?.finished
      })
      .map(id => games[id]!)
      .sort((a, b) => b.started! - a.started!)
)

export let backlogGames = createSelector(
  selectAllIds,
  selectAllGames,
  (ids, games) =>
    ids
      .filter(id => {
        let game = games[id]
        return !game?.started
      })
      .map(id => games[id]!)
      .sort((a, b) => a.id - b.id)
)

export let finishedGames = createSelector(
  selectAllIds,
  selectAllGames,
  (ids, games) =>
    ids
      .filter(id => {
        let game = games[id]
        return game?.finished
      })
      .map(id => games[id]!)
      .sort((a, b) => b.finished! - a.finished!)
)

export let getEvents = createSelector(
  selectAllGames,
  (_: State, gameId: number) => gameId,
  (games, gameId) => {
    let game = games[gameId]
    let started: Event = { type: 'started' }
    let ret = [started]

    if (!game) return ret

    if (game.started) {
      started.time = game.started

      ret.push({
        type: 'finished',
        time: game.finished,
      })
    }

    if (game.finished) {
      ret.push({
        type: 'completed',
        time: game.completed,
      })
    }

    return ret
  }
)

export let hasGames = (state: State): boolean => state.games.allIds.length > 0

export let getFinishDuration = (state: State, game: number) =>
  state.games.byId[game]!.finishDuration

export let getCompleteDuration = (
  state: State,
  game: number
): number | undefined => state.games.byId[game]!.completeDuration

export let getNextPage = (state: State) => state.games.nextPage.next

export let hasNextPage = (state: State) => state.games.nextPage.hasNext

export let getIsLoading = (state: State): boolean => {
  return state.games.isLoading && state.games.allIds.length === 0
}
