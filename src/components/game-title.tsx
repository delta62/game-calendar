import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { Edit } from 'react-feather'

import './game-title.scss'

export interface Props {
  onChange(title: string): void
  text: string
}

let GameTitle = ({ text, onChange }: Props) => {
  let [ editing, setEditing ] = useState(false)

  let ref = useRef<HTMLInputElement>()

  let onBodyClick = useCallback(() => {
    setEditing(false)
  }, [ ref, setEditing ])

  useEffect(() => {
    document.addEventListener('click', onBodyClick)
    return () => document.removeEventListener('click', onBodyClick)
  }, [ ])

  let onTitleClick = useCallback((event: MouseEvent) => {
    if (!editing) {
      setEditing(true)
      setTimeout(() => ref.current?.select())
    }
    event.stopPropagation()
  }, [ editing, setEditing ])

  let onKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        onChange(ref.current?.value ?? '')
        setEditing(false)
        break
      case 'Escape':
        setEditing(false)
        break
    }
  }, [ ref, onChange ])

  if (!editing) {
    return (
      <div class="game-title" onClick={onTitleClick}>
        <h1 class="text">{text}</h1>
        <Edit className="icon" />
      </div>
    )
  } else {
    return (
      <input
        type="text"
        ref={ref}
        onClick={onTitleClick}
        value={text}
        onKeyUp={onKeyUp}
      />
    )
  }
}

export default GameTitle
