import { Action } from 'redux'
import { View } from './reducer'

export const TOGGLE_VIEW = 'TOGGLE_VIEW'

export interface ToggleView extends Action<typeof TOGGLE_VIEW> {
  view: View
  expanded: boolean
}

export default ToggleView
