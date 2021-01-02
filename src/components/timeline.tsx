import classnames from 'classnames'

import { Event } from '@store'
import StartedEvent from '@containers/started-event'
import FinishedEvent from '@containers/finished-event'
import CompletedEvent from '@containers/completed-event'

import './timeline.scss'

export interface Props {
  events: Event[]
  game: number
}

let Timeline = ({ events, game }: Props) => (
  <div class="timeline">
    {events.map(event => (
      <>
        <div class={classnames('event', { finished: !!event.time })}>
          {event.type === 'started' && <StartedEvent game={game} time={event.time} />}
          {event.type === 'finished' && <FinishedEvent game={game} time={event.time} />}
          {event.type === 'completed' && <CompletedEvent game={game} time={event.time} />}
        </div>
        <span class="line"></span>
      </>
    ))}
  </div>
)

export default Timeline
