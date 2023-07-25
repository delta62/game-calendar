import classNames from 'classnames'
import styles from './styles.scss'

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  direction?: 'back'
}

let Chevron = ({ direction, ...attrs }: Props) => (
  <span
    className={classNames(styles.chevron, direction && styles[direction])}
    {...attrs}
  ></span>
)

export default Chevron
