import { RenderableProps, createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'

interface SelectionContext {
  id: number | null
  setId(id: number | null): void
}

let Context = createContext<SelectionContext>({
  id: null,
  setId() { },
})
Context.displayName = 'Selection'

export let SelectionProvider = ({ children }: RenderableProps<{}>) => {
  let [ id, setId ] = useState<number | null>(null)
  let value = { id, setId }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export let useSelection = (): [ number | null, (x: number | null) => void ] => {
  let { id, setId } = useContext(Context)
  return [ id, setId ]
}
