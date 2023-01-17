import styles from './styles.scss'

export interface Props {
  type: 'handle'
}

let Icon = ({ type, ...props }: Props) => (
  <span className={styles.icon} {...props}>
    <span className={styles[type]}></span>
  </span>
)

export default Icon
