import classnames from 'classnames'
import { useCallback } from 'react'
import { Star } from 'react-feather'

import './styles.scss'

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
    <div className="rating">
      {new Array(5).fill(0).map((_, i) => {
        let filled = (i + 1) * 2 <= rating
        return (
          <Star
            className={classnames('icon', { filled })}
            onClick={onChangeClick(i)}
          />
        )
      })}
    </div>
  )
}

export default Rating
