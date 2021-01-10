import { connect } from 'react-redux'

import { actionCreators } from '@store'
import LoginPage from '@components/login-page'

let mapState = () => ({})

let mapDispatch = {
  onLogin: actionCreators.loginRequest,
}

export default connect(mapState, mapDispatch)(LoginPage)
