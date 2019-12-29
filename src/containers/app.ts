import { connect } from 'react-redux'

import * as pkg from '../../package.json'
import App from '../components/app'

function mapStateToProps() {
    return {
        version: pkg.version,
    }
}

export default connect(mapStateToProps)(App)
