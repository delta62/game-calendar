import { Game, User } from '@store'
import { ClientOpts } from '../index'
import { json } from '../http'
import { FirestoreResponse } from './models'
import unwrap from './unwrap'
import wrap from './wrap'

const ID_API_ROOT = 'https://identitytoolkit.googleapis.com/v1'
const API_ROOT = 'https://firestore.googleapis.com/v1'

interface FirebaseToken {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: boolean
}

export let login = async (
  options: ClientOpts,
  userEmail: string,
  password: string
): Promise<User> => {
  let url = `${ID_API_ROOT}/accounts:signInWithPassword?key=${options.apiKey}`

  let init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userEmail,
      password,
      returnSecureToken: true,
    }),
  }

  let { email, localId, idToken, refreshToken, expiresIn } = await json<FirebaseToken>(url, init)
  let tokenExpires = Date.now() + parseInt(expiresIn, 10) * 1000

  return { email, id: localId, idToken, refreshToken, tokenExpires }
}

export let getGames = async (
  { projectId }: ClientOpts,
  userId: string
): Promise<Game[]> => {
  let url = `${API_ROOT}/projects/${projectId}/databases/(default)/documents/users/${userId}/games`
  let response = await json<FirestoreResponse>(url)
  return response.documents?.map(unwrap) ?? [ ]
}

export let saveGame = (
  options: ClientOpts,
  userId: string,
  game: Game
): Promise<void> => {
  let path = `projects/${options.projectId}/databases/(default)/documents/users/${userId}/games/${game.id}`
  let url = `${API_ROOT}/${path}`

  let init: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: path,
      ...wrap(game),
    }),
  }

  return fetch(url, init).then(res => {
    if (!res.ok) {
      throw new Error(`Got status code ${res.status} from ${url}`)
    }
  })
}
