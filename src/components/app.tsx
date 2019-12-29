import { Component, h } from 'preact'

import './app.css'
import Footer from './footer'
import Year from '../containers/year'

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
                <section class="years">
                    <Year
                        year={this.state.year}
                        onNextYear={this.onNextYear.bind(this)}
                        onPrevYear={this.onPrevYear.bind(this)} />
                </section>
                <Footer version={this.props.version} />
            </div>
        )
    }

    private onNextYear() {
        this.setState({ year: this.state.year + 1 })
    }

    private onPrevYear() {
        this.setState({ year: this.state.year - 1 })
    }
}
