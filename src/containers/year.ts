import { Dispatch } from "redux"
import { connect } from "react-redux"

import {
  startToggled,
  completeToggled,
  finishToggled,
  monthUpdated,
} from "../data/actions"
import Year, { Props } from "../components/year"
import { StoreState } from "../models"
import monthNames from "../data/months"

function mapStateToProps(state: StoreState, { year }: Props) {
  let storeMonths = state.months[year] || []
  let months = monthNames.map((names, idx) => ({
    ...names,
    ...storeMonths[idx],
  }))
  return { months }
}

function mapDispatchToProps(dispatch: Dispatch, { year }: Props) {
  return {
    onChange: (month: number, game: string) =>
      dispatch(monthUpdated(year, month, game)),
    onStartToggle: (month: number) => dispatch(startToggled(year, month)),
    onFinishToggle: (month: number) => dispatch(finishToggled(year, month)),
    onCompleteToggle: (month: number) => dispatch(completeToggled(year, month)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Year)
