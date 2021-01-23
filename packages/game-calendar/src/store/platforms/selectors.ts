import { State } from '../models'

export let getPlatformOptions = (state: State) => {
  return Object.values(state.platforms)
    .map(platform => ({
      value: `${platform.id}`,
      name: platform.name,
    }))
}
