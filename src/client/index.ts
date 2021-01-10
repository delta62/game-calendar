import { Game, User } from '@store'
import * as firebaseClient from './firebase'

export interface Client {
  getGames(userId: string, authToken: string): Promise<Game[]>
  login(email: string, password: string): Promise<User>
  refreshToken(refreshToken: string): Promise<Partial<User>>
  saveGame(userId: string, game: Game): Promise<void>
}

let client: Client = firebaseClient

export default client
