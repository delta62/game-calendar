export interface Game {
  id: number
  name: string
  started?: number
  finished?: number
  completed?: number
  duration?: number
  rating?: number
}

export interface Normalized<Id extends string | number | symbol, Model> {
  allIds: Id[]
  byId: Record<Id, Model>
}

export interface State {
  games: Normalized<number, Game>
  selectedGame: number | null
}
