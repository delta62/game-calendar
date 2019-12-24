import { Action, Store, compose, createStore, combineReducers } from 'redux'
import persistState from 'redux-localstorage'

import { Month, StoreState } from './models'

const DEFAULT_MONTHS: Month[] = [
    { monthName: "January",   monthAbbr: "Jan" },
    { monthName: "February",  monthAbbr: "Feb" },
    { monthName: "March",     monthAbbr: "Mar" },
    { monthName: "April",     monthAbbr: "Apr" },
    { monthName: "May",       monthAbbr: "May" },
    { monthName: "June",      monthAbbr: "Jun" },
    { monthName: "July",      monthAbbr: "Jul" },
    { monthName: "August",    monthAbbr: "Aug" },
    { monthName: "September", monthAbbr: "Sep" },
    { monthName: "October",   monthAbbr: "Oct" },
    { monthName: "November",  monthAbbr: "Nov" },
    { monthName: "December",  monthAbbr: "Dec" },
]

function months(state: Month[] = DEFAULT_MONTHS, action: Action) {
    switch (action.type) {
        case 'MONTH_UPDATED':
            let idx: number = (action as any).idx
            let val: string = (action as any).val
            let newState = state.slice()
            let month: Month = {
                ...newState[idx],
                gameName: val,
            }
            newState.splice(idx, 1, month)
            return newState
        default:
            return state
    }
    return state
}

const reducers = combineReducers({ months })
const enhancer = compose(persistState()) as any
const store = createStore(reducers, enhancer)
export default store
