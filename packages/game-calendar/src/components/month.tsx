// import { Component } from "preact"
// import { Award, Play, Flag } from "react-feather"
//
// import "./month.scss"
// import { Month } from "../models"
// import Progress from "./progress"
//
// export interface Props extends Month {
//   monthName: string
//   monthAbbr: string
//   onChange(value: string): void
//   onStartToggle(): void
//   onFinishToggle(): void
//   onCompleteToggle(): void
// }
//
// export default class MonthComponent extends Component<Props> {
//   public render() {
//     let { startDate, finishDate, completeDate } = this.props
//     return (
//       <div class="month">
//         <abbr class="month-name" title={this.props.monthName}>
//           {this.props.monthAbbr}
//         </abbr>
//         <div class="primary">
//           <input
//             class="game-name"
//             disabled={!!this.props.startDate}
//             onChange={(e) => this.props.onChange((e.target as any).value)}
//             value={this.props.game || ""}
//           />
//           <Progress
//             startDate={startDate}
//             finishDate={finishDate}
//             completeDate={completeDate}
//           />
//         </div>
//         <Play
//           class={this.iconClass(!!startDate)}
//           onClick={this.onStartToggle.bind(this)}
//         />
//         <Flag
//           class={this.iconClass(!!finishDate)}
//           onClick={this.onFinishToggle.bind(this)}
//         />
//         <Award
//           class={this.iconClass(!!completeDate)}
//           onClick={this.onCompleteToggle.bind(this)}
//         />
//       </div>
//     )
//   }
//
//   private iconClass(checked: boolean) {
//     return `icon${checked ? " checked" : ""}`
//   }
//
//   private preventClick(target: Element, duration: number) {
//     target.classList.add("disabled")
//     setTimeout(() => target.classList.remove("disabled"), duration)
//   }
//
//   private onStartToggle(e: Event) {
//     if (!this.props.game || this.props.finishDate || this.props.completeDate) {
//       return this.preventClick(e.currentTarget as Element, 200)
//     }
//     this.props.onStartToggle()
//   }
//
//   private onFinishToggle(e: Event) {
//     if (!this.props.game || !this.props.startDate || this.props.completeDate) {
//       return this.preventClick(e.currentTarget as Element, 200)
//     }
//     this.props.onFinishToggle()
//   }
//
//   private onCompleteToggle(e: Event) {
//     if (!this.props.game || !this.props.finishDate) {
//       return this.preventClick(e.currentTarget as Element, 200)
//     }
//     this.props.onCompleteToggle()
//   }
// }
