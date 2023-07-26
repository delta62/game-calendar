import { PropsWithChildren } from 'react'
import styles from './styles.scss'

export interface Props {
  name: string
}

export let ListGroup = ({ name, children }: PropsWithChildren<Props>) => (
  <div>
    <div className={styles.title}>{name}</div>
    <div>{children}</div>
  </div>
)
