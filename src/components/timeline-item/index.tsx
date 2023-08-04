import { PropsWithChildren } from 'react'
import classnames from 'classnames'
import Button from '@components/button'
import styles from './styles.scss'

export interface Props {
  label: string
  callToAction: string
  callToActionClick(): void
  buttonType?: 'primary'
  past: boolean
}

let TimelineItem = ({
  callToAction,
  buttonType,
  children,
  label,
  callToActionClick,
  past,
}: PropsWithChildren<Props>) => (
  <div
    className={classnames(styles.event, {
      [styles.past]: past,
    })}
  >
    <p>{label}</p>
    {children}
    <Button text={callToAction} type={buttonType} onClick={callToActionClick} />
  </div>
)

export default TimelineItem
