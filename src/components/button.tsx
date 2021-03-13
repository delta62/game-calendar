import classnames from 'classnames'

import './button.scss'

export interface Props {
  onClick(): void
  text: string
  type?: 'primary'
}

let Button = ({ onClick, text, type }: Props) => (
  <input
    type="button"
    class={classnames('button', type)}
    value={text}
    onClick={onClick}
  />
)

export default Button
