import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'preact/hooks'
import { Edit } from 'react-feather'
import { Context } from '@delta62/micro-router'

import Chevron from '@components/chevron'

import './game-title.scss'

export interface Props {
  onChange(title: string): void
  text: string
}

let GameTitle = ({ text, onChange }: Props) => {
  let [editing, setEditing] = useState(false)
  let { setPath } = useContext(Context)

  let ref = useRef<HTMLInputElement>(null)

  let onBodyClick = useCallback(() => {
    setEditing(false)
  }, [ref, setEditing])

  useEffect(() => {
    document.addEventListener('click', onBodyClick)
    return () => document.removeEventListener('click', onBodyClick)
  }, [])

  let onTitleClick = useCallback(
    (event: MouseEvent) => {
      if (!editing) {
        setEditing(true)
        setTimeout(() => ref.current?.select())
      }
      event.stopPropagation()
    },
    [editing, setEditing]
  )

  let onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          onChange(ref.current?.value ?? '')
          setEditing(false)
          break
        case 'Escape':
          setEditing(false)
          break
      }
    },
    [ref, onChange]
  )

  let onBackClick = useCallback(() => {
    setPath('/')
  }, [setPath])

  if (!editing) {
    return (
      <div class="game-title" onClick={onTitleClick}>
        <Chevron onClick={onBackClick} />
        <h1 class="text">{text}</h1>
        <Edit className="icon" />
      </div>
    )
  } else {
    return (
      <>
        <Chevron onClick={onBackClick} />
        <input
          type="text"
          ref={ref}
          onClick={onTitleClick}
          value={text}
          onKeyUp={onKeyUp}
        />
      </>
    )
  }
}

export default GameTitle
