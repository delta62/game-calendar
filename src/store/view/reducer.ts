import Action, { TOGGLE_VIEW } from './actions'
export type View = 'backlog' | 'inprogress' | 'finished'
export type State = Record<View, boolean>

const DEFAULT_STATE: State = {
  backlog: true,
  inprogress: true,
  finished: false,
}

export let reducer = (
  state = DEFAULT_STATE,
  action: Action
): unknown | null => {
  if (action.type === TOGGLE_VIEW) {
    return {
      ...state,
      [action.view]: action.expanded,
    }
  }

  return state
}
