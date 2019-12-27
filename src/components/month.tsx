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

function onStartToggle(props: Props) {
    if (props.completeDate || props.hundredPercentDate) {
        return
    }
    props.onStartToggle(props.index)
}

function onFinishToggle(props: Props) {
    if (!props.startDate || !!props.hundredPercentDate) {
        return
    }
    props.onFinishToggle(props.index)
}

function onCompleteToggle(props: Props) {
    if (!props.completeDate) {
        return
    }
    props.onCompleteToggle(props.index)
}

const MonthComponent = (props: Props) => (
    <div class="month">
        <abbr class="month-name" title={props.monthName}>{props.monthAbbr}</abbr>
        <input
            class="game-name"
            onChange={(e) => props.onChange(props.index, (e.target as any).value)}
            value={props.gameName} />
        <PlayI
            class={props.startDate ? 'checked' : ''}
            onClick={() => onStartToggle(props)} />
        <FlagI
            class={props.completeDate ? 'checked' : ''}
            onClick={() => onFinishToggle(props)} />
        <AwardI
            class={props.hundredPercentDate ? 'checked' : ''}
            onClick={() => onCompleteToggle(props)} />
    </div>
)

export default MonthComponent
