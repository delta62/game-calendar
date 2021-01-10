import { connect } from 'react-redux'

import { login } from '@store'
import LoginPage from '@components/login-page'

let mapState = () => ({ })

let mapDispatch = {
  onLogin: login,
}

export default connect(mapState, mapDispatch)(LoginPage)
