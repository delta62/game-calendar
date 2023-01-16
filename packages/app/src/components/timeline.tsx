import classnames from 'classnames'
import { useSelector } from 'react-redux'

import { State, Event, selectors } from '@store'
import StartedEvent from '@components/started-event'
import FinishedEvent from '@components/finished-event'
import CompletedEvent from '@components/completed-event'

import './timeline.scss'

export interface Props {
  game: number
}

let Timeline = ({ game }: Props) => {
  let events = useSelector<State, Event[]>(state =>
    selectors.getEvents(state, game)
  )

  return (
    <div className="timeline">
      {events.map(event => (
        <>
          <div className={classnames('event', { finished: !!event.time })}>
            {event.type === 'started' && (
              <StartedEvent game={game} time={event.time} />
            )}
            {event.type === 'finished' && (
              <FinishedEvent game={game} time={event.time} />
            )}
            {event.type === 'completed' && (
              <CompletedEvent game={game} time={event.time} />
            )}
          </div>
          <span className="line"></span>
        </>
      ))}
    </div>
  )
}

export default Timeline
