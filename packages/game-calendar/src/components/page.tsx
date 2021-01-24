import { RenderableProps } from 'preact'

import './page.scss'

export interface Props {
  title: string
}

let Page = ({ children, title }: RenderableProps<Props>) => (
  <div class="page">
    <h1>{title}</h1>
    {children}
  </div>
)

export default Page
