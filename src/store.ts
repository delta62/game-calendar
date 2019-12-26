import { compose, createStore, combineReducers } from 'redux'
import persistState from 'redux-localstorage'

import Action from './actions'
import { Month } from './models'

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

function updateArray<T>(array: T[], index: number, replacer: (input: T) => T): T[] {
    let newArray = array.slice()
    let oldElement = newArray[index]
    let newElement = replacer(oldElement)
    console.log(oldElement, newElement)
    newArray.splice(index, 1, newElement)
    return newArray
}

function months(state: Month[] = DEFAULT_MONTHS, action: Action) {
    switch (action.type) {
        case 'MONTH_UPDATED':
            return updateArray(state, action.idx, oldMonth => ({
                ...oldMonth,
                gameName: action.val,
            }))
        case 'START_TOGGLED':
            return updateArray(state, action.idx, oldMonth => ({
                ...oldMonth,
                startDate: oldMonth.startDate ? undefined : action.time,
            }))
        case 'FINISH_TOGGLED':
            return updateArray(state, action.idx, oldMonth => ({
                ...oldMonth,
                completeDate: oldMonth.completeDate ? undefined : action.time,
            }))
        case 'COMPLETE_TOGGLED':
            return updateArray(state, action.idx, oldMonth => ({
                ...oldMonth,
                hundredPercentDate: oldMonth.hundredPercentDate ? undefined : action.time
            }))
        default:
            return state
    }
}

const reducers = combineReducers({ months })
const enhancer = compose(persistState()) as any
const store = createStore(reducers, enhancer)
export default store
