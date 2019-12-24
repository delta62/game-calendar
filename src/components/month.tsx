import { h } from 'preact'
import { Award, Play, Flag } from 'react-feather'

import './month.css'

import { Month } from '../models'

export interface Props extends Month {
    index: number
    onChange(index: number, value: string): void
    onStartToggle(index: number): void
    onFinishToggle(index: number): void
    onCompleteToggle(index: number): void
}

const FlagI = Flag as any
const AwardI = Award as any
const PlayI = Play as any

const MonthComponent = (props: Props) => (
    <div class="month">
        <abbr class="month-name" title={props.monthName}>{props.monthAbbr}</abbr>
        <input
            class="game-name"
            onChange={(e) => props.onChange(props.index, (e.target as any).value)}
            value={props.gameName} />
        <PlayI
            class={props.startDate ? 'checked' : ''}
            onClick={() => props.onStartToggle(props.index)} />
        <FlagI
            class={props.completeDate ? 'checked' : ''}
            onClick={() => props.onFinishToggle(props.index)} />
        <AwardI
            class={props.hundredPercentDate ? 'checked' : ''}
            onClick={() => props.onCompleteToggle(props.index)} />
    </div>
)

export default MonthComponent
