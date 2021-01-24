import { JSX } from 'preact'

import './chevron.scss'

export interface Props extends JSX.DOMAttributes<HTMLSpanElement> {

}

let Chevron = ({ ...attrs }: Props) => (
  <span class="chevron" {...attrs} ></span>
)

export default Chevron
