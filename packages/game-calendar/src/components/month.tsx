import { h } from 'preact'

import './month.css'

import { Month } from '../models'

export interface Props extends Month {
    index: number
    onChange(index: number, value: string): void
}

const MonthComponent = (props: Props) => (
    <div class="month">
        <abbr class="month-name" title={props.monthName}>{props.monthAbbr}</abbr>
        <input
            class="game-name"
            onChange={(e) => props.onChange(props.index, (e.target as any).value)}
            value={props.gameName} />
    </div>
)

export default MonthComponent
