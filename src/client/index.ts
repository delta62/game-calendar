import { Game } from '@store'
import * as Firebase from './firebase'

export interface ClientOpts {
  projectId: string
}

export interface Client {
  getGames(userId: string): Promise<Game[]>
  saveGame(userId: string, game: Game): Promise<void>
}

let getClient = (opts: ClientOpts): Client => ({
  getGames: (userId: string) => Firebase.getGames(opts, userId),
  saveGame: (userId: string, game: Game) => Firebase.saveGame(opts, userId, game),
})

export default getClient({
  projectId: '',
})
