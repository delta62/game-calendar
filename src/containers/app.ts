import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import App from '../components/app'
import { StoreState } from '../models'

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        startToggled:    (idx: number) => dispatch({ type: 'START_TOGGLED', idx, time: new Date() }),
        finishToggled:   (idx: number) => dispatch({ type: 'FINISH_TOGGLED', idx, time: new Date() }),
        completeToggled: (idx: number) => dispatch({ type: 'COMPLETE_TOGGLED', idx, time: new Date() }),
        monthUpdated: (idx: number, val: string) => dispatch({ type: 'MONTH_UPDATED', idx, val })
    }
}

function mapStateToProps(state: StoreState) {
    return {
        months: state.months
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App as any) as any
