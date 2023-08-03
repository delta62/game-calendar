import classNames from 'classnames'
import styles from './styles.scss'

export interface Props extends React.HTMLProps<HTMLSpanElement> {
  direction?: 'back'
}

export let Chevron = ({ direction, className, ...attrs }: Props) => (
  <span
    className={classNames(
      className,
      styles.chevron,
      direction && styles[direction]
    )}
    {...attrs}
  ></span>
)
