export interface Game {
  id: number
  name: string
  platform?: number
  started?: number
  finished?: number
  completed?: number
  duration?: number
  rating?: number
}

export interface State {
  allIds: number[]
  byId: Record<number, Game>
}

export interface Event {
  type: 'started' | 'finished' | 'completed'
  time?: number
}
