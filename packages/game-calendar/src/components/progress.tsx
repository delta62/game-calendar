import { h } from 'preact'
import { format } from 'date-fns'

import './progress.css'

export interface Props {
    startDate?:    number
    finishDate?:   number
    completeDate?: number
}

function getText(props: Props): string {
    let date: number | undefined
    let text: string | undefined
    if (props.completeDate) {
        date = props.completeDate
        text = 'Completed'
    } else if (props.finishDate) {
        date = props.finishDate
        text = 'Finished'
    } else if (props.startDate) {
        date = props.startDate
        text = 'Started'
    }
    if (!date || !text) {
        return ''
    }
    return `${text} ${format(date, 'LLL do')}`
}

function getClass(props: Props): string {
    let classes = [ 'progress' ]
    if (props.startDate) {
        classes.push('started')
    }
    if (props.finishDate) {
        classes.push('finished')
    }
    if (props.completeDate) {
        classes.push('completed')
    }
    return classes.join(' ')
}

const Progress = (props: Props) => (
    <div class={getClass(props)}>
        <span class="progress-label">{getText(props)}</span>
        <div class="bars">
            <span class="sliver started" />
            <span class="sliver finished" />
            <span class="sliver completed" />
        </div>
    </div>
)

export default Progress
