import './chevron.scss'

let Chevron = ({ ...attrs }: React.HTMLProps<HTMLSpanElement>) => (
  <span className="chevron" {...attrs}></span>
)

export default Chevron
