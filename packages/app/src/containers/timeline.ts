import { connect } from 'react-redux'

import { State, selectors } from '@store'
import Timeline from '@components/timeline'

export interface Props {
  id: number
}

let mapState = (state: State, ownProps: Props) => ({
  events: selectors.getEvents(state, ownProps.id),
  game: ownProps.id,
})

export default connect(mapState)(Timeline)
