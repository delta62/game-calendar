import { format } from 'date-fns'

import styles from './styles.scss'

export interface Props {
  startDate?: number
  finishDate?: number
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
  let classes = [styles.progress]
  if (props.startDate) {
    classes.push(styles.started)
  }
  if (props.finishDate) {
    classes.push(styles.finished)
  }
  if (props.completeDate) {
    classes.push(styles.completed)
  }
  return classes.join(' ')
}

export let Progress = (props: Props) => (
  <div className={getClass(props)}>
    <span className={styles.progressLabel}>{getText(props)}</span>
    <div className={styles.bars}>
      <span className={`${styles.sliver} ${styles.started}`} />
      <span className={`${styles.sliver} ${styles.finished}`} />
      <span className={`${styles.sliver} ${styles.completed}`} />
    </div>
  </div>
)
