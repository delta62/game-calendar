import { Action } from "redux"

export const monthUpdated = (
  year: number,
  month: number,
  game: string
): MonthGameUpdateAction => ({ type: "MONTH_UPDATED", year, month, game })

export const startToggled = (
  year: number,
  month: number
): StartToggledAction => ({
  type: "START_TOGGLED",
  year,
  month,
  time: new Date().getTime(),
})

export const finishToggled = (
  year: number,
  month: number
): FinishToggledAction => ({
  type: "FINISH_TOGGLED",
  year,
  month,
  time: new Date().getTime(),
})

export const completeToggled = (
  year: number,
  month: number
): CompleteToggledAction => ({
  type: "COMPLETE_TOGGLED",
  year,
  month,
  time: new Date().getTime(),
})

interface MonthGameUpdateAction extends Action<"MONTH_UPDATED"> {
  year: number
  month: number
  game: string
}

interface StartToggledAction extends Action<"START_TOGGLED"> {
  year: number
  month: number
  time: number
}

interface FinishToggledAction extends Action<"FINISH_TOGGLED"> {
  year: number
  month: number
  time: number
}

interface CompleteToggledAction extends Action<"COMPLETE_TOGGLED"> {
  year: number
  month: number
  time: number
}

interface ThemeChangedAction extends Action<"THEME_CHANGED"> {
  theme: string
}

type AppAction =
  | MonthGameUpdateAction
  | ThemeChangedAction
  | StartToggledAction
  | FinishToggledAction
  | CompleteToggledAction

export default AppAction
