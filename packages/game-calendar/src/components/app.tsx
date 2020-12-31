// import { Component, JSX } from "preact"
//
// import Footer from "./footer"
// import Year from "../containers/year"
// import Swipeable from "./swipeable"
// import ThemePicker from "./theme-picker"
//
// import "./app.scss"
//
// export interface Props {
//   onThemeChanged(theme: string): void
//   theme: string
//   version: string
// }
//
// interface State {
//   year: number
// }
//
// export default class App extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props)
//     this.state = {
//       year: new Date().getFullYear(),
//     }
//   }
//
//   public render() {
//     document.body.className = this.props.theme
//     return (
//       <div class="app">
//         <ThemePicker onToggle={this.props.onThemeChanged} />
//         <Swipeable
//           index={this.state.year}
//           duration={200}
//           loader={this.loader.bind(this)}
//           onIndexChanged={this.onIndexChanged.bind(this)}
//         />
//         <Footer version={this.props.version} />
//       </div>
//     )
//   }
//
//   private onIndexChanged(newIndex: number) {
//     this.setState({ year: newIndex })
//   }
//
//   private loader(index: number): JSX.Element {
//     return (
//       <Year
//         year={index}
//         onNextYear={this.onNextYear.bind(this)}
//         onPrevYear={this.onPrevYear.bind(this)}
//       />
//     )
//   }
//
//   private onNextYear() {
//     this.setState({ year: this.state.year + 1 })
//   }
//
//   private onPrevYear() {
//     this.setState({ year: this.state.year - 1 })
//   }
// }
