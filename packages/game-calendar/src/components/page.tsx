import { RenderableProps } from 'preact'
import classnames from 'classnames'

import './page.scss'

export interface Props {
  className: string
  title: string
}

let Page = ({ children, className, title }: RenderableProps<Props>) => (
  <div class={classnames('page', className)}>
    <h1>{title}</h1>
    {children}
  </div>
)

export default Page
