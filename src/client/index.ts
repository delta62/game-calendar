import { Game, User } from '@store'
import * as firebaseClient from './firebase'

export interface Client {
  getGames(userId: string, authToken: string, nextPageToken: string | null): Promise<{ games: Game[], nextPage: string | null }>
  login(email: string, password: string): Promise<User>
  refreshToken(refreshToken: string): Promise<Partial<User>>
  saveGame(userId: string, game: Game): Promise<void>

  create<T extends {}>(path: string, documentId: string, authToken: string, document: T): Promise<void>
  drop(path: string, authToken: string): Promise<void>
  patch<T extends {}>(path: string, authToken: string, document: T): Promise<void>
}

let client: Client = firebaseClient

export default client
