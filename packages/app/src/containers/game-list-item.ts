import { connect } from 'react-redux'

import { State, selectors, actionCreators } from '@store'
import GameListItem from '@components/game-list-item'

export interface Props {
  id: number
}

let mapState = (state: State, { id }: Props) => ({
  game: selectors.getGame(state, id),
})

let mapDispatch = {
  onReorder: actionCreators.reorderGame,
  onSelect: actionCreators.selectGame,
}

export default connect(mapState, mapDispatch)(GameListItem)
