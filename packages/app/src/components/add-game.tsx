import { useRef, useCallback } from 'react'

import './add-game.scss'

export interface Props {
  addGame(name: string): void
}

let AddGame = ({ addGame }: Props) => {
  let ref = useRef<HTMLInputElement>(null)

  let onClick = useCallback(() => {
    let value = ref.current?.value.trim()
    if (value) {
      addGame(value)
      ref.current!.value = ''
    }
  }, [addGame])

  let onKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        onClick()
      }
    },
    [onClick, addGame]
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
