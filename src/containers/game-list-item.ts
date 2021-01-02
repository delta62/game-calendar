import { connect } from 'react-redux'

import { State, getGame, reorderGame, selectGame } from '@store'
import GameListItem from '@components/game-list-item'

export interface Props {
  id: number
}

let mapState = (state: State, { id }: Props) => ({
  game: getGame(state, id),
})

let mapDispatch = {
  onReorder: reorderGame,
  onSelect: selectGame,
}

export default connect(mapState, mapDispatch)(GameListItem)
