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
  user: User | null
}

export interface Event {
  type: 'started' | 'finished' | 'completed'
  time?: number
}

export interface User {
  email: string
  id: string
  idToken: string
  refreshToken: string
  tokenExpires: number
}
