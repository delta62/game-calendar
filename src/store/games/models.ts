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

export interface NextPage {
  hasNext: boolean
  next: string | null
}

export interface State {
  allIds: number[]
  byId: Record<number, Game>
  nextPage: NextPage
}

export interface Event {
  type: 'started' | 'finished' | 'completed'
  time?: number
}
