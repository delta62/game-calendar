import { State } from '../models'

export let getPlatformOptions = (state: State) => {
  return Object.values(state.platforms)
    .sort((a, b) => a.name < b.name ? -1 : 1)
    .map(platform => ({
      value: `${platform.id}`,
      name: platform.name,
    }))
}
