import styles from './styles.scss'
import classNames from 'classnames'

export type IconType = 'handle' | 'spinner'

export interface Props {
  className?: string
  type: IconType
}

let Icon = ({ type, className }: Props) => (
  <span className={styles.icon}>
    <span className={classNames(styles[type], className)}></span>
  </span>
)

export default Icon
