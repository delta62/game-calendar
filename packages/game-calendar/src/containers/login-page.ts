import { connect } from 'react-redux'

import { State, actionCreators, selectors } from '@store'
import LoginPage from '@components/login-page'

let mapState = (state: State) => ({
  isLoggedIn: selectors.getIsLoggedIn(state),
})

let mapDispatch = {
  onLogin: actionCreators.loginRequest,
}

export default connect(mapState, mapDispatch)(LoginPage)
