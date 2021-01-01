import classnames from 'classnames'

import { Event } from '../models'
import StartedEvent from './started-event'
import FinishedEvent from './finished-event'
import CompletedEvent from './completed-event'
import './timeline.scss'

export interface Props {
  events: Event[]
}

let Timeline = ({ events }: Props) => (
  <div class="timeline">
    {events.map(event => (
      <>
        <div class={classnames('event', event.type)}>
          {event.type === 'started' && <StartedEvent time={event.time} />}
          {event.type === 'finished' && <FinishedEvent time={event.time} />}
          {event.type === 'completed' && <CompletedEvent time={event.time} />}
        </div>
        <span class="line"></span>
      </>
    ))}
  </div>
)

export default Timeline
