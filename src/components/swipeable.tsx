import { Component, JSX, RefObject, createRef, h } from "preact"

import "./swipeable.scss"

export interface Props {
  loader(index: number): JSX.Element
  index: number
  duration: number
  onIndexChanged(newIndex: number): void
}

export interface State {
  diffX: number
  startX: number
  startY: number
  lockY: boolean
}

export default class Swipeable extends Component<Props, State> {
  private content: RefObject<HTMLDivElement>

  constructor(props: Props) {
    super(props)

    this.content = createRef()
    this.state = {
      diffX: 0,
      lockY: false,
      startX: 0,
      startY: 0,
    }

    document.addEventListener("touchstart", this.onTouchStarted)
  }

  public render() {
    let items = [
      {
        idx: this.props.index - 1,
        item: this.props.loader(this.props.index - 1),
      },
      { idx: this.props.index, item: this.props.loader(this.props.index) },
      {
        idx: this.props.index + 1,
        item: this.props.loader(this.props.index + 1),
      },
    ]
    return (
      <div class="viewport">
        <div ref={this.content} class="pages">
          {items.map(({ idx, item }) => (
            <div key={idx} class="page">
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  }

  public shouldComponentUpdate(nextProps: Props) {
    return nextProps.index !== this.props.index
  }

  public componentWillUnmount() {
    document.removeEventListener("touchstart", this.onTouchStarted)
  }

  private onTouchStarted = (event: TouchEvent) => {
    if (event.touches.length !== 1 || !this.content.current) {
      return
    }

    let { clientX, clientY } = event.touches[0]
    this.content.current.style.transition = ""
    this.setState({ startY: clientY, startX: clientX, diffX: 0 })

    document.addEventListener("touchmove", this.onTouchMove, { passive: false })
    document.addEventListener("touchend", this.onTouchEnd)
    document.addEventListener("touchcancel", this.onTouchCancel)
  }

  private onTouchMove = (event: TouchEvent) => {
    let { clientX, clientY } = event.touches[0]
    let diffX = clientX - this.state.startX
    let diffY = clientY - this.state.startY
    if (this.state.lockY) {
      event.preventDefault()
      // Compute X position
      this.setState({ diffX })
      this.content.current!.style.transform = `translateX(${diffX}px)`
    } else {
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Lock Y
        event.preventDefault()
        this.setState({ lockY: true })
      } else {
        // Lock X. Just remove the event listeners.
        this.removeListeners()
      }
    }
  }

  private removeListeners() {
    document.removeEventListener("touchmove", this.onTouchMove)
    document.removeEventListener("touchend", this.onTouchEnd)
    document.removeEventListener("touchcancel", this.onTouchCancel)
  }

  private onTouchEnd = () => {
    let content = this.content.current!
    let diff = this.state.diffX
    let width = content.clientWidth / 3
    content.style.transition = `transform ${this.props.duration}ms`

    if (diff > width / 2) {
      content.style.transform = "translateX(33.33%)"
      setTimeout(() => {
        this.props.onIndexChanged(this.props.index - 1)
        content.style.transition = ""
        content.style.transform = ""
      }, this.props.duration + 100)
    } else if (diff < -(width / 2)) {
      content.style.transform = "translateX(-33.33%)"
      setTimeout(() => {
        this.props.onIndexChanged(this.props.index + 1)
        content.style.transition = ""
        content.style.transform = ""
      }, this.props.duration + 100)
    } else {
      content.style.transform = "translateX(0)"
    }

    this.setState({ lockY: false })
    this.removeListeners()
  }

  private onTouchCancel = () => {
    this.setState({ lockY: false })
    this.removeListeners()
    this.content.current!.style.transform = "translateX(0)"
  }
}
