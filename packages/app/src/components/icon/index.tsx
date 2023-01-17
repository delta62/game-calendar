import './styles.scss'

export interface Props {
  type: 'handle'
}

let Icon = ({ type, ...props }: Props) => (
  <span className="icon" {...props}>
    <span className={type}></span>
  </span>
)

export default Icon
