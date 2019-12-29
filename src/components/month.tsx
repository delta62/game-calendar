import { Component, h } from 'preact'
import { Award, Play, Flag } from 'react-feather'

import './month.css'
import { Month } from '../models'

export interface Props extends Month {
    monthName: string
    monthAbbr: string
    onChange(value: string): void
    onStartToggle(): void
    onFinishToggle(): void
    onCompleteToggle(): void
}

const FlagI = Flag as any
const AwardI = Award as any
const PlayI = Play as any

export default class MonthComponent extends Component<Props> {
    public render() {
        return (
            <div class="month">
                <abbr class="month-name" title={this.props.monthName}>{this.props.monthAbbr}</abbr>
                <input
                    class="game-name"
                    readOnly={!!this.props.startDate}
                    onChange={(e) => this.props.onChange((e.target as any).value)}
                    value={this.props.game || ''} />
                <PlayI
                    class={this.props.startDate ? 'icon checked' : 'icon '}
                    onClick={() => this.onStartToggle()} />
                <FlagI
                    class={this.props.finishDate ? 'icon checked' : 'icon '}
                    onClick={() => this.onFinishToggle()} />
                <AwardI
                    class={this.props.completeDate ? 'icon checked' : 'icon '}
                    onClick={() => this.onCompleteToggle()} />
            </div>
        )
    }

    private onStartToggle() {
        if (!this.props.game || this.props.finishDate || this.props.completeDate) {
            return
        }
        this.props.onStartToggle()
    }

    private onFinishToggle() {
        if (!this.props.game || !this.props.startDate || this.props.completeDate) {
            return
        }
        this.props.onFinishToggle()
    }

    private onCompleteToggle() {
        if (!this.props.game || !this.props.finishDate) {
            return
        }
        this.props.onCompleteToggle()
    }
}
