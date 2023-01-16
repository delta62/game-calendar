import { useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { actionCreators } from '@store'

import './add-game.scss'

let AddGame = () => {
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
    <div className="add-game">
      <input
        className="text-input"
        type="text"
        ref={ref}
        placeholder="Add a game"
        onKeyUp={onKeyUp}
      />
      <input className="add-button" type="button" value="+" onClick={onClick} />
    </div>
  )
}

export default AddGame
