import styles from './styles.scss'

export interface Props {
  onClick(): void
}

export let Trash = ({ onClick }: Props) => (
  <span className={styles.trash} onClick={onClick}></span>
)
