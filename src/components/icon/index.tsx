import styles from './styles.scss'

export type IconType = 'handle' | 'spinner'

export interface Props {
  type: IconType
}

let Icon = ({ type, ...props }: Props) => (
  <span className={styles.icon} {...props}>
    <span className={styles[type]}></span>
  </span>
)

export default Icon
