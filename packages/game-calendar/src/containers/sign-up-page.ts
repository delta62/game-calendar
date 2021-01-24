import { connect } from 'react-redux'

import SignUpPage from '@components/sign-up-page'

let mapState = () => ({ })

let mapDispatch = {
  onSignUp: (username: string, password: string) => {
    console.log('onSignUp', username, password)
  },
}

export default connect(mapState, mapDispatch)(SignUpPage)
