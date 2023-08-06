import { Icon } from '@components'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from './styles.scss'

export interface Props {
  isLoading: boolean
}

export let Splash = ({ isLoading }: Props) => {
  let [hidden, setHidden] = useState(true)
  let className = classNames(styles.splash, { [styles.fadeOut]: !isLoading })

  useEffect(() => {
    if (isLoading) {
      setHidden(false)
      return () => {}
    } else {
      let id = setTimeout(() => setHidden(true), 400)
      return () => clearTimeout(id)
    }
  }, [isLoading])

  if (hidden) return null

  return (
    <div className={className}>
      <Icon className={styles.icon} type="spinner" />
      <h2>Loading your games...</h2>
    </div>
  )
}
