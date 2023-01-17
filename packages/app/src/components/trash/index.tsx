import styles from './styles.scss'

export interface Props {
  onClick(): void
}

let Trash = ({ onClick }: Props) => (
  <span className={styles.trash} onClick={onClick}></span>
)

export default Trash
