import { Game, User } from '@store'
import { ClientOpts } from '../index'
import unwrap from './unwrap'
import wrap from './wrap'

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
  email: string,
  password: string
): Promise<User> => {
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${options.apiKey}`

  let init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  }

  return fetch(url, init)
    .then(res => res.json())
    .then((body: FirebaseToken) => ({
      email: body.email,
      id: body.localId,
      idToken: body.idToken,
      refreshToken: body.refreshToken,
      tokenExpires: Date.now() + parseInt(body.expiresIn, 10) * 1000,
    }))
}

export let getGames = async (
  options: ClientOpts,
  userId: string
): Promise<Game[]> => {
  let url = `https://firestore.googleapis.com/v1/projects/${options.projectId}/databases/(default)/documents/users/${userId}/games`

  return fetch(url)
    .then(res => res.json())
    .then(body => body.documents.map((doc: any) => unwrap(doc)))
}

export let saveGame = (
  options: ClientOpts,
  userId: string,
  game: Game
): Promise<void> => {
  let path = `projects/${options.projectId}/databases/(default)/documents/users/${userId}/games/${game.id}`
  let url = `https://firestore.googleapis.com/v1/${path}`

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
