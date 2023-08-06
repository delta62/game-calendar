import { useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '@store'
import styles from './styles.scss'

export let AddGame = () => {
  let ref = useRef<HTMLInputElement>(null)
  let dispatch = useDispatch()

  let onClick = useCallback(() => {
    let value = ref.current?.value.trim()
    if (value) {
      dispatch(actionCreators.addGame(value))
      ref.current!.value = ''
    }
  }, [dispatch])

  let onKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClick()
      }
    },
    [onClick]
  )

  return (
    <div className={styles.addGame}>
      <input
        className={styles.textInput}
        type="text"
        ref={ref}
        placeholder="Add a game"
        onKeyUp={onKeyUp}
      />
      <input
        className={styles.addButton}
        type="button"
        value="+"
        onClick={onClick}
      />
    </div>
  )
}
