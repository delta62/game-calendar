import { h } from "preact"

import "./footer.scss"

export interface Props {
  version: string
}

const Footer = ({ version }: Props) => (
  <footer class="footer">
    <span>Sam Noedel, 2020</span>
    <span>
      This is open source software. Check out the code on{" "}
      <a href="https://github.com/delta62/game-calendar">GitHub</a>!
    </span>
    <span>Version {version}</span>
  </footer>
)

export default Footer
