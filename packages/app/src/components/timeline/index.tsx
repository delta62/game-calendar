import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { State, Event, selectors } from '@store'
import StartedEvent from '@components/started-event'
import FinishedEvent from '@components/finished-event'
import CompletedEvent from '@components/completed-event'

import styles from './styles.scss'

export interface Props {
  game: number
}

let Timeline = ({ game }: Props) => {
  let events = useSelector<State, Event[]>(state =>
    selectors.getEvents(state, game)
  )

  return (
    <div className={styles.timeline}>
      {events.map(event => (
        <Fragment key={event.type}>
          {event.type === 'started' && (
            <StartedEvent game={game} time={event.time} />
          )}
          {event.type === 'finished' && (
            <FinishedEvent game={game} time={event.time} />
          )}
          {event.type === 'completed' && (
            <CompletedEvent game={game} time={event.time} />
          )}
          <span className={styles.line}></span>
        </Fragment>
      ))}
    </div>
  )
}

export default Timeline
