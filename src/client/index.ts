import { Game, User } from '@store'
import * as Firebase from './firebase'

export interface ClientOpts {
  apiKey: string
  projectId: string
}

export interface Client {
  getGames(userId: string): Promise<Game[]>
  login(email: string, password: string): Promise<User>
  saveGame(userId: string, game: Game): Promise<void>
}

let getClient = (opts: ClientOpts): Client => ({
  getGames: (userId: string) => Firebase.getGames(opts, userId),
  login: (email: string, password: string) =>
    Firebase.login(opts, email, password),
  saveGame: (userId: string, game: Game) =>
    Firebase.saveGame(opts, userId, game),
})

export default getClient({
  apiKey: 'AIzaSyA1hiQ-CrYWvVymh6S2u3iCdABTA6Lr3Zk',
  projectId: 'game-calendar-d681b',
})
