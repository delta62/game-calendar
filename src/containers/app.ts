import { connect } from 'react-redux'

import { State, getIsLoggedIn } from '@store'
import App from '@components/app'

let mapState = (state: State) => ({
  isLoggedIn: getIsLoggedIn(state),
})

export default connect(mapState)(App)
