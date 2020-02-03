import { compose, createStore, combineReducers } from 'redux'
import persistState from 'redux-localstorage'

import Action from './actions'
import { Month } from '../models'

type State = Record<number, Month[]>

function updateYear(state: State, year: number, month: number, replacement: Partial<Month>): State
function updateYear(state: State, year: number, month: number, replacement: (oldVal: Month) => Month): State
function updateYear(state: State, year: number, month: number, replacement: any): State {
    let ret = { ...state }
    let months = ret.hasOwnProperty(year) ? ret[year].slice() : new Array(12)

    let oldVal = months[month]
    if (typeof replacement === 'function') {
        replacement = replacement(oldVal)
    }
    months.splice(month, 1, { ...oldVal, ...replacement })
    ret[year] = months

    return ret
}

function months(state: State = { }, action: Action): Record<number, Month[]> {
    switch (action.type) {
        case 'MONTH_UPDATED':
            return updateYear(state, action.year, action.month, { game: action.game })
        case 'START_TOGGLED':
            return updateYear(state, action.year, action.month, last => ({ startDate: last.startDate ? undefined : action.time }))
        case 'FINISH_TOGGLED':
            return updateYear(state, action.year, action.month, last => ({ finishDate: last.finishDate ? undefined : action.time }))
        case 'COMPLETE_TOGGLED':
            return updateYear(state, action.year, action.month, last => ({ completeDate: last.completeDate ? undefined : action.time }))
        default:
            return state
    }
}

function theme(state: string = 'light', action: Action): string {
    switch (action.type) {
        case 'THEME_CHANGED':
            return action.theme
        default:
            return state
    }
}

const reducers = combineReducers({ months, theme })
const enhancer = compose(persistState()) as any
const store = createStore(reducers, enhancer)
export default store
