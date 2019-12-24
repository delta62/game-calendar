import { h } from 'preact'

import { Month } from '../models'
import Header from './header'
import MonthComponent from './month'

import './app.css'

export interface Props {
    monthUpdated(index: number, value: string): void
    finishToggled(index: number): void
    completeToggled(index: number): void
    startToggled(index: number): void
    months: Month[]
}

const App = (props: Props) => (
    <div class="app">
        <Header />
        <div class="months">
            {
                props.months.map((month, idx) => (
                    <MonthComponent
                        index={idx}
                        onChange={props.monthUpdated}
                        onStartToggle={props.startToggled}
                        onCompleteToggle={props.completeToggled}
                        onFinishToggle={props.finishToggled}
                        {...month} />
                ))
            }
        </div>
    </div>
)

export default App
