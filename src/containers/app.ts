import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import App from '../components/app'
import { StoreState } from '../models'

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        monthUpdated: (idx: number, val: string) => dispatch({ type: 'MONTH_UPDATED', idx, val })
    }
}

function mapStateToProps(state: StoreState) {
    return {
        months: state.months
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App as any) as any
