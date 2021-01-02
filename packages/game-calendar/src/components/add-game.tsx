import { useRef, useCallback } from 'preact/hooks'

import './add-game.scss'

export interface Props {
  addGame(name: string): void
}

let AddGame = ({ addGame }: Props) => {
  let ref = useRef<HTMLInputElement>()

  let onClick = useCallback(() => {
    let value = ref.current?.value.trim()
    if (value) {
      addGame(value)
      ref.current!.value = ''
    }
  }, [ addGame ])

  let onKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClick()
    }
  }, [ onClick, addGame ])

  return (
    <div class="add-game">
      <input
        class="text-input"
        type="text"
        ref={ref}
        placeholder="Add a game"
        onKeyUp={onKeyUp}
      />
      <input
        class="add-button"
        type="button"
        value="+"
        onClick={onClick}
      />
    </div>
  )
}

export default AddGame
