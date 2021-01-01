import './trash.scss'

export interface Props {
  onClick(): void
}

let Trash = ({ onClick }: Props) => (
  <span class="trash" onClick={onClick}></span>
)

export default Trash
