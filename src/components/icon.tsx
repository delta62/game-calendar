import './icon.scss'

export interface Props {
  type: 'handle'
}

let Icon = ({ type, ...props }: Props) => (
  <span class="icon" {...props}>
    <span class={type}></span>
  </span>
)

export default Icon
