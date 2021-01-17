import { Game, User } from '@store'
import { json } from '../http'
import { FirestoreResponse, RefreshResponse } from './models'
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
  userEmail: string,
  password: string
): Promise<User> => {
  let url = `${ID_API_ROOT}/accounts:signInWithPassword?key=${__API_KEY__}`

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

  let {
    email,
    localId,
    idToken,
    refreshToken,
    expiresIn,
  } = await json<FirebaseToken>(url, init)
  let tokenExpires = Date.now() + parseInt(expiresIn, 10) * 1000

  return { email, id: localId, idToken, refreshToken, tokenExpires }
}

export let getGames = async (
  userId: string,
  authToken: string
): Promise<Game[]> => {
  let url = `${API_ROOT}/projects/${__PROJECT_ID__}/databases/(default)/documents/users/${userId}/games`
  let init: RequestInit = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
  let response = await json<FirestoreResponse>(url, init)
  return response.documents?.map(unwrap) ?? []
}

export let saveGame = async (userId: string, game: Game): Promise<void> => {
  let path = `projects/${__PROJECT_ID__}/databases/(default)/documents/users/${userId}/games/${game.id}`
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

  let res = await fetch(url, init)
  if (!res.ok) {
    throw new Error(`Got status code ${res.status} from ${url}`)
  }
}

export let create = async<T extends {}>(
  path: string,
  documentId: string,
  authToken: string,
  document: T,
): Promise<void> => {
  path = `projects/${__PROJECT_ID__}/databases/(default)/documents/${path}?documentId=${documentId}`
  let url = `${API_ROOT}/${path}`

  let init: RequestInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...wrap(document),
    }),
  }

  await fetch(url, init)
}

export let drop = async(
  path: string,
  authToken: string,
): Promise<void> => {
  path = `projects/${__PROJECT_ID__}/databases/(default)/documents/${path}`
  let url = `${API_ROOT}/${path}`
  let init: RequestInit = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }

  await fetch(url, init)
}

export let patch = async <T extends {}>(
  path: string,
  authToken: string,
  document: T,
): Promise<void> => {
  let updateMask = Object
    .keys(document)
    .map(x => `updateMask.fieldPaths=${encodeURIComponent(x)}`)
    .join('&')

  path = `projects/${__PROJECT_ID__}/databases/(default)/documents/${path}?${updateMask}`
  let url = `${API_ROOT}/${path}`


  let init: RequestInit = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: path,
      ...wrap(document),
    }),
  }

  await fetch(url, init)
}

export let refreshToken = async (
  refreshToken: string
): Promise<Partial<User>> => {
  let url = `https://securetoken.googleapis.com/v1/token?key=${__API_KEY__}`

  let init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(
      refreshToken
    )}`,
  }

  let res = await json<RefreshResponse>(url, init)

  let tokenExpires = Date.now() + parseInt(res.expires_in, 10) * 1000

  return {
    refreshToken: res.refresh_token,
    idToken: res.id_token,
    tokenExpires,
  }
}
