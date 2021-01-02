import { connect } from 'react-redux'

import GameList from '@components/game-list'
import { State } from '@store'

export interface Props {
  selector(state: State): number[]
}

let mapState = (state: State, ownProps: Props) => ({
  games: ownProps.selector(state),
})

export default connect(mapState)(GameList)
