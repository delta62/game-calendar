import { Platform } from './models'

export type State = Record<number, Platform>

const DEFAULT_STATE: State = {
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

export let reducer = (state: State = DEFAULT_STATE) => state
