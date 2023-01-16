import './trash.scss'

export interface Props {
  onClick(): void
}

let Trash = ({ onClick }: Props) => (
  <span className="trash" onClick={onClick}></span>
)

export default Trash
