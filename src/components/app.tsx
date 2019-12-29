import { Component, JSX, h } from 'preact'

import './app.css'
import Footer from './footer'
import Year from '../containers/year'
import Swipeable from './swipeable'

export interface Props {
    version: string
}

interface State {
    year: number
}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            year: new Date().getFullYear()
        }
    }

    public render() {
        return (
            <div class="app">
                <Swipeable
                    index={this.state.year}
                    duration={200}
                    loader={this.loader.bind(this)}
                    onIndexChanged={this.onIndexChanged.bind(this)}
                />
                <Footer version={this.props.version} />
            </div>
        )
    }

    private onIndexChanged(newIndex: number) {
        this.setState({ year: newIndex })
    }

    private loader(index: number): JSX.Element {
        return (
            <Year
                year={index}
                onNextYear={this.onNextYear.bind(this)}
                onPrevYear={this.onPrevYear.bind(this)} />
        )
    }

    private onNextYear() {
        this.setState({ year: this.state.year + 1 })
    }

    private onPrevYear() {
        this.setState({ year: this.state.year - 1 })
    }
}
