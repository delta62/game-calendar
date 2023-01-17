import classnames from 'classnames'
import { useCallback } from 'react'
import { Star } from 'react-feather'

import styles from './styles.scss'

export interface Props {
  onChange(rating: number): void
  rating: number
}

let Rating = ({ onChange, rating }: Props) => {
  let onChangeClick = useCallback(
    (i: number) => {
      return () => {
        onChange((i + 1) * 2)
      }
    },
    [onChange, rating]
  )

  return (
    <div className={styles.rating}>
      {Array.from({ length: 5 }).map((_, i) => {
        let filled = (i + 1) * 2 <= rating
        return (
          <Star
            key={i}
            className={classnames(styles.icon, { [styles.filled]: filled })}
            onClick={onChangeClick(i)}
          />
        )
      })}
    </div>
  )
}

export default Rating
