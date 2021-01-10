import Action from '../actions'
import { User } from '../models'

type State = User | null

let user = (state: State = null, action: Action): State => {
  switch (action.type) {
    case 'LOGGED_IN':
      return action.user
    default:
      return state
  }
}

export default user
