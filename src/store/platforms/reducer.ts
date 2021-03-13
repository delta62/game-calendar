import { Action } from 'redux'

import { State, Platform } from './models'

const DEFAULT_STATE: Record<number, Platform> = {
  0: { id: 0, name: 'Gamecube' },
  1: { id: 1, name: 'PC' },
  2: { id: 2, name: 'Playstation' },
  3: { id: 3, name: 'Playstation 2' },
  4: { id: 4, name: 'Playstation 3' },
  5: { id: 5, name: 'Playstation 4' },
  6: { id: 6, name: 'Super Nintendo' },
  7: { id: 7, name: 'Playstation 5' },
  8: { id: 8, name: 'Wii' },
}

let platforms = (state: State = DEFAULT_STATE, action: Action): State => {
  switch (action.type) {
    default:
      return state
  }
}

export default platforms
