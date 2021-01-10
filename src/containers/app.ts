import { connect } from 'react-redux'

import { State, selectors } from '@store'
import App from '@components/app'

let mapState = (state: State) => ({
  isLoggedIn: selectors.getIsLoggedIn(state),
})

export default connect(mapState)(App)
