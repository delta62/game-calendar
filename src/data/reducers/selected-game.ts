import Action from '../actions'

type State = number | null

let selectedGame = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'SELECT_GAME':
      return action.id
    case 'DELETE_GAME':
      return state === action.id ? null : state
    default:
      return state
  }
}

export default selectedGame
