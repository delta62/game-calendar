import { Component, JSX, RefObject, createRef, h } from 'preact'

import './swipeable.css'

export interface Props {
    loader(index: number): JSX.Element
    index: number
    duration: number
    onIndexChanged(newIndex: number): void
}

export interface State {
    diffX: number
    startX: number
}

export default class Swipeable extends Component<Props, State> {
    private viewport: RefObject<HTMLDivElement>

    constructor(props: Props) {
        super(props)
        this.viewport = createRef()
        document.addEventListener('touchstart', this.onTouchStarted)
    }

    public render() {
        let items = [
            { idx: this.props.index - 1, item: this.props.loader(this.props.index - 1) },
            { idx: this.props.index,     item: this.props.loader(this.props.index) },
            { idx: this.props.index + 1, item: this.props.loader(this.props.index + 1) },
        ]
        return (
            <div class="viewport">
                <div ref={this.viewport} class="pages">
                    {
                        items.map(({ idx, item }) => (
                            <div key={idx} class="page">{item}</div>
                        ))
                    }
                </div>
            </div>
        )
    }

    public shouldComponentUpdate(nextProps: Props) {
        return nextProps.index !== this.props.index
    }

    private onTouchStarted = (event: TouchEvent) => {
        if (event.touches.length !== 1) {
            return
        }

        let startX = event.touches[0].clientX
        this.viewport.current!.style.transition = ''
        this.setState({ startX, diffX: 0 })

        document.addEventListener('touchmove', this.onTouchMove)
        document.addEventListener('touchend', this.onTouchEnd)
        document.addEventListener('touchcancel', this.onTouchCancel)
    }

    private onTouchMove = (event: TouchEvent) => {
        let x = event.touches[0].clientX
        let diff = x - this.state.startX
        this.setState({ diffX: diff })
        this.viewport.current!.style.transform = `translateX(${diff}px)`
    }

    private onTouchEnd = () => {
        // If scrolled > 50% into left or right panel then transition
        let diff = this.state.diffX
        let width = this.viewport.current!.clientWidth / 3
        this.viewport.current!.style.transition = `transform ${this.props.duration}ms`

        if (diff > width / 2) {
            this.viewport.current!.style.transform = 'translateX(33.33%)'
            setTimeout(() => {
                this.props.onIndexChanged(this.props.index - 1)
                this.viewport.current!.style.transition = ''
                this.viewport.current!.style.transform = ''
            }, 300)
        } else if (diff < -(width / 2)) {
            this.viewport.current!.style.transform = 'translateX(-33.33%)'
            setTimeout(() => {
                this.props.onIndexChanged(this.props.index + 1)
                this.viewport.current!.style.transition = ''
                this.viewport.current!.style.transform = ''
            }, 300)
        } else {
            this.viewport.current!.style.transform = 'translateX(0)'
        }

        document.removeEventListener('touchmove', this.onTouchMove)
        document.addEventListener('touchend', this.onTouchEnd)
        document.addEventListener('touchcancel', this.onTouchEnd)
    }

    private onTouchCancel = () => {
        document.removeEventListener('touchmove', this.onTouchMove)
        document.addEventListener('touchend', this.onTouchEnd)
        document.addEventListener('touchcancel', this.onTouchEnd)
        this.viewport.current!.style.transform = 'translateX(0)'
    }
}
