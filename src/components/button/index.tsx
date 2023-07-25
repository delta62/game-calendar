import classnames from 'classnames'

import styles from './styles.scss'

export interface Props {
  onClick(): void
  text: string
  type?: 'primary'
}

let Button = ({ onClick, text, type }: Props) => (
  <input
    type="button"
    className={classnames(styles.button, type && styles[type])}
    value={text}
    onClick={onClick}
  />
)

export default Button
