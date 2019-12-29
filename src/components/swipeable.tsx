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
    private content: RefObject<HTMLDivElement>

    constructor(props: Props) {
        super(props)
        this.content = createRef()
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
                <div ref={this.content} class="pages">
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
        if (event.touches.length !== 1 || !this.content.current) {
            return
        }

        let startX = event.touches[0].clientX
        this.content.current.style.transition = ''
        this.setState({ startX, diffX: 0 })

        document.addEventListener('touchmove', this.onTouchMove)
        document.addEventListener('touchend', this.onTouchEnd)
        document.addEventListener('touchcancel', this.onTouchCancel)
    }

    private onTouchMove = (event: TouchEvent) => {
        let x = event.touches[0].clientX
        let diffX = x - this.state.startX
        this.setState({ diffX })
        this.content.current!.style.transform = `translateX(${diffX}px)`
    }

    private onTouchEnd = () => {
        let content = this.content.current!
        let diff = this.state.diffX
        let width = content.clientWidth / 3
        content.style.transition = `transform ${this.props.duration}ms`

        if (diff > width / 2) {
            content.style.transform = 'translateX(33.33%)'
            setTimeout(() => {
                this.props.onIndexChanged(this.props.index - 1)
                content.style.transition = ''
                content.style.transform = ''
            }, this.props.duration + 100)
        } else if (diff < -(width / 2)) {
            content.style.transform = 'translateX(-33.33%)'
            setTimeout(() => {
                this.props.onIndexChanged(this.props.index + 1)
                content.style.transition = ''
                content.style.transform = ''
            }, this.props.duration + 100)
        } else {
            content.style.transform = 'translateX(0)'
        }

        document.removeEventListener('touchmove', this.onTouchMove)
        document.addEventListener('touchend', this.onTouchEnd)
        document.addEventListener('touchcancel', this.onTouchEnd)
    }

    private onTouchCancel = () => {
        document.removeEventListener('touchmove', this.onTouchMove)
        document.addEventListener('touchend', this.onTouchEnd)
        document.addEventListener('touchcancel', this.onTouchEnd)
        this.content.current!.style.transform = 'translateX(0)'
    }
}
