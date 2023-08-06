import classNames from 'classnames'
import styles from './styles.scss'

export type IconType = 'handle' | 'spinner'

export interface Props {
  className?: string
  type: IconType
}

export let Icon = ({ type, className }: Props) => (
  <span className={styles.icon}>
    <span className={classNames(styles[type], className)}></span>
  </span>
)
