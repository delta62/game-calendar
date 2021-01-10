import { Game } from '@store'
import { ClientOpts } from './index'

export let getGames = async (_options: ClientOpts, _userId: string): Promise<Game[]> => {
  return Promise.resolve([ ])
}

export let saveGame = (_options: ClientOpts, _userId: string, _game: Game): Promise<void> => {
  return Promise.resolve()
}
