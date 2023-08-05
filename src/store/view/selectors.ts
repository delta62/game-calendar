import { View } from './reducer'
import { State } from '../models'

export let getIsExpanded = (state: State, view: View): boolean => {
  return state.view[view]
}
