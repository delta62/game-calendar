import { PropsWithChildren } from 'react'
import classnames from 'classnames'

import styles from './styles.scss'

export interface Props {
  className?: string
  title: string
}

let Page = ({ children, className, title }: PropsWithChildren<Props>) => (
  <div className={classnames(styles.page, className)}>
    <h1>{title}</h1>
    {children}
  </div>
)

export default Page
