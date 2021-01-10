import { State } from '@store'

export let getIsLoggedIn = (state: State): boolean => !!state.user.data

export let getUserId = (state: State): string | null =>
  state.user.data?.id ?? null
