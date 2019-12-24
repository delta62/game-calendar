import { h } from 'preact'

import { Month } from '../models'
import Header from './header'
import MonthComponent from './month'

import './app.css'

export interface Props {
    monthUpdated(index: number, value: string): void
    months: Month[]
}

const App = (props: Props) => (
    <div class="app">
        <Header />
        <div class="months">
            {
                props.months.map((month, idx) => (
                    <MonthComponent index={idx} onChange={props.monthUpdated} {...month} />
                ))
            }
        </div>
    </div>
)

export default App
