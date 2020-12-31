// import MonthComponent from "./month"
// import { Month } from "../models"
//
// import "./year.scss"
//
// export interface Props {
//   year: number
//   months: Month[]
//   onChange(month: number, game: string): void
//   onStartToggle(month: number): void
//   onFinishToggle(month: number): void
//   onCompleteToggle(month: number): void
//   onNextYear(): void
//   onPrevYear(): void
// }
//
// const YearComponent = (props: Props) => (
//   <section class="year">
//     <header>
//       <a class="year-link" href="#" onClick={props.onPrevYear}>
//         &lt; {props.year - 1}
//       </a>
//       <time class="year-number">{props.year}</time>
//       <a class="year-link" href="#" onClick={props.onNextYear}>
//         {props.year + 1} &gt;
//       </a>
//     </header>
//     <div class="months">
//       {props.months.map((month, idx) => (
//         <MonthComponent
//           key={idx}
//           monthName="cheese"
//           monthAbbr="chs"
//           onChange={(game: string) => props.onChange(idx, game)}
//           onStartToggle={() => props.onStartToggle(idx)}
//           onFinishToggle={() => props.onFinishToggle(idx)}
//           onCompleteToggle={() => props.onCompleteToggle(idx)}
//           {...month}
//         />
//       ))}
//     </div>
//   </section>
// )
//
// export default YearComponent
