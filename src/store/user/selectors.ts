import { State } from '@store'
import { User } from './models'

export let getIsLoggedIn = (state: State): boolean => !!state.user.data

export let getUser = (state: State): User | null => state.user.data

export let getUserId = (state: State): string | null =>
  state.user.data?.id ?? null

export let getExpiresAt = (state: State): number =>
  state.user.data?.tokenExpires ?? 0

export let getRefreshToken = (state: State): string =>
  state.user.data?.refreshToken ?? ''

export let getAuthToken = (state: State): string =>
  state.user.data?.idToken ?? ''
