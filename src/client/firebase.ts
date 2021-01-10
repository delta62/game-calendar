import { Game, User } from '@store'
import { ClientOpts } from './index'

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
  password: string,
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
      tokenExpires: Date.now() + (parseInt(body.expiresIn, 10) * 1000),
    }))
}

export let getGames = async (
  _options: ClientOpts,
  _userId: string
): Promise<Game[]> => {
  // let url = `https://firestore.googleapis.com/v1beta1/projects/${options.projectId}/databases/(default)/documents/users/${userId}/games`
  return Promise.resolve([])
}

export let saveGame = (
  _options: ClientOpts,
  _userId: string,
  _game: Game
): Promise<void> => {
  return Promise.resolve()
}
