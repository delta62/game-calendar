import { View } from './reducer'
import { ToggleView } from './actions'

export let toggleView = (view: View, expanded: boolean): ToggleView => ({
  type: 'TOGGLE_VIEW',
  view,
  expanded,
})
