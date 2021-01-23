export interface Game {
  completed?: number
  completeDuration?: number
  finishDuration?: number
  finished?: number
  id: number
  name: string
  platform?: number
  rating?: number
  started?: number
}

export interface State {
  allIds: number[]
  byId: Record<number, Game>
}

export interface Event {
  type: 'started' | 'finished' | 'completed'
  time?: number
}
