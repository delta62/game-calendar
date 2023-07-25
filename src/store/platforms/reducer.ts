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
  9: { id: 9, name: 'Nintendo 64' },
  10: { id: 10, name: 'Nintendo' },
  11: { id: 11, name: 'Game Boy' },
  12: { id: 12, name: 'Game Boy Color' },
  13: { id: 13, name: 'Game Boy Advance' },
}

let platforms = (state: State = DEFAULT_STATE, action: Action): State => {
  switch (action.type) {
    default:
      return state
  }
}

export default platforms
