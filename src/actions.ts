import { Action } from 'redux'

interface MonthGameUpdateAction extends Action<'MONTH_UPDATED'> {
    idx: number
    val: string
}

interface StartToggledAction extends Action<'START_TOGGLED'> {
    idx: number
    time: Date
}

interface FinishToggledAction extends Action<'FINISH_TOGGLED'> {
    idx: number
    time: Date
}

interface CompleteToggledAction extends Action<'COMPLETE_TOGGLED'> {
    idx: number
    time: Date
}

type AppAction =
    MonthGameUpdateAction
    | StartToggledAction
    | FinishToggledAction
    | CompleteToggledAction

export default AppAction
