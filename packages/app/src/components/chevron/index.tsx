import styles from './styles.scss'

let Chevron = ({ ...attrs }: React.HTMLProps<HTMLSpanElement>) => (
  <span className={styles.chevron} {...attrs}></span>
)

export default Chevron
