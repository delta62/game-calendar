import { Event, Game, State } from '../models'

export let getInProgress = (state: State): number[] => (
  state.games.allIds
    .map(id => state.games.byId[id])
    .filter(game => game.started)
    .map(game => game.id)
)

export let getNotStarted = (state: State): number[] => (
  state.games.allIds
    .map(id => state.games.byId[id])
    .filter(game => !game.started)
    .map(game => game.id)
)

export let getGame = (state: State, id: number): Game => (
  state.games.byId[id]
)

export let getIsActive = (state: State, id: number): boolean => (
  state.selectedGame === id
)

export let getGames = (state: State): number[] => (
  state.games.allIds
)

export let getEvents = (state: State, id: number): Event[] => {
  let game = state.games.byId[id]

  let started: Event = { type: 'started' }
  if (game.started) {
    started.time = game.started
  }
  let ret = [ started ]

  if (game.finished) {
    ret.push({
      type: 'finished',
      time: game.finished,
    })
  }

  if (game.completed) {
    ret.push({
      type: 'completed',
      time: game.completed,
    })
  }

  return ret
}