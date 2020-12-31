import { RefObject, RenderableProps, createContext } from 'preact'
import { useEffect, useContext, useRef, useCallback } from 'preact/hooks'

interface DragLocationData {
  above: boolean
  below: boolean
  left: boolean
  right: boolean
}

interface DropLocationData extends DragLocationData {
  key: string
}

type DraggableEndEvent = CustomEvent
type DraggableMoveEvent = CustomEvent<DragLocationData>
type DraggableOverEvent = CustomEvent<DragLocationData>
type DraggableOutEvent = CustomEvent
type DraggableDropEvent = CustomEvent<DropLocationData>

interface DragContextState {
  key: string | null
  setKey(key: string): void
  setPreviewNode(node: Node, initialX: number, initialY: number): void
}

const CLASS_NAME = '__draggable__'

let DragContext = createContext<DragContextState>({
  key: null,
  setKey() { },
  setPreviewNode() { },
})
DragContext.displayName = 'Drag'

interface HitResult {
  above: boolean
  below: boolean
  left: boolean
  right: boolean
}

let hitTest = (el: Element, x: number, y: number): HitResult | null => {
  let rect = el.getBoundingClientRect()
  let hitX = x >= rect.left && x <= rect.left + rect.width
  let hitY = y >= rect.top && y <= rect.top + rect.height

  if (hitX && hitY) {
    let above = y < rect.top + rect.height / 2
    let below = !above
    let left = x < rect.left + rect.width / 2
    let right = !left
    return { above, below, left, right }
  } else {
    return null
  }
}

interface ContextState {
  key: null | string
  lastX: number
  lastY: number
  preview: HTMLElement | null
  setKey(key: string): void
  setPreviewNode(node: HTMLElement, initialX: number, initialY: number): void
}

export let DragProvider = ({ children }: RenderableProps<{}>) => {
  let ref = useRef<ContextState>({
    key: null,
    lastX: 0,
    lastY: 0,
    preview: null,
    setKey(key: string) { ref.current.key = key },
    setPreviewNode(node: HTMLElement, initialX: number, initialY: number) {
      let clone = node.cloneNode(true) as HTMLElement
      clone.classList.add('drag-preview')
      clone.classList.remove(CLASS_NAME)
      let { width } = window.getComputedStyle(node)
      clone.style.width = `${width}`
      clone.style.left = '0'
      clone.style.top = '0'
      clone.style.transform = `translate(${initialX}px, ${initialY}px)`
      node.parentNode!.insertBefore(clone, node)
      ref.current.preview = clone
    },
  })

  let updateState = useCallback((props: Partial<ContextState>) => {
    let entries = Object.entries(props) as [keyof ContextState, never][]
    for (let [k, v] of entries) {
      ref.current[k] = v
    }
  }, [ ref ])

  let onMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!ref.current.key) {
      return
    }

    // Prevent iOS from scrolling like a maniac
    event.preventDefault()

    let x = event instanceof MouseEvent ? event.pageX : event.touches[0].pageX
    let y = event instanceof MouseEvent ? event.pageY : event.touches[0].pageY

    if (ref.current.preview) {
      ref.current.preview.style.transform = `translate(${x}px, ${y}px)`
    }

    let dropTargets = document.getElementsByClassName(CLASS_NAME)
    for (let target of dropTargets) {
      let isHovered = hitTest(target, x, y)
      let wasHovered = hitTest(target, ref.current.lastX, ref.current.lastY)

      if (!wasHovered && isHovered) {
        target.dispatchEvent(new CustomEvent('draggable:dragover', {
          detail: isHovered
        }))
      } else if (isHovered) {
        target.dispatchEvent(new CustomEvent('draggable:dragmove', {
          detail: isHovered
        }))
      } else if (wasHovered && !isHovered) {
        target.dispatchEvent(new CustomEvent('draggable:dragout'))
      }
    }

    updateState({
      lastX: x,
      lastY: y,
    })
  }, [ ref ])

  let onDrop = useCallback(() => {
    if (!ref.current.key) {
      return
    }

    let dropTargets = document.getElementsByClassName(CLASS_NAME)
    for (let target of dropTargets) {
      let isHovered = hitTest(target, ref.current.lastX, ref.current.lastY)

      if (isHovered) {
        target.dispatchEvent(new CustomEvent('draggable:drop', {
          detail: {
            key: ref.current.key,
            ...isHovered,
          },
        }))
      }

      target.dispatchEvent(new CustomEvent('draggable:dragend'))
    }

    ref.current.preview?.parentNode!.removeChild(ref.current.preview)

    updateState({
      key: null,
      lastX: 0,
      lastY: 0,
      preview: null,
    })

  }, [ document, updateState, ref ])

  useEffect(() => {
    document.addEventListener('mousemove', onMove)
    document.addEventListener('touchmove', onMove)
    document.addEventListener('mouseup', onDrop)
    document.addEventListener('touchend', onDrop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('mouseup', onDrop)
      document.removeEventListener('touchend', onDrop)
    }
  }, [ document, onMove, onDrop ])

  return (
    <DragContext.Provider value={ref.current}>
      {children}
    </DragContext.Provider>
  )
}

export let useDrag = (data: string, preview?: RefObject<HTMLElement>) => {
  let { setKey, setPreviewNode } = useContext(DragContext)

  let onDragStart = useCallback((event: MouseEvent | TouchEvent) => {
    let e = event as any
    let x = e.pageX ?? e.touches[0].pageX
    let y = e.pageY ?? e.touches[0].pageY

    setKey(data)
    preview && preview.current && setPreviewNode(preview.current, x, y)
  }, [ preview, setKey, data ])

  return {
    onMouseDown: onDragStart,
    onTouchStart: onDragStart,
  }
}

interface UseDropArgs {
  onDragEnd?(event: DraggableEndEvent): void
  onDragMove?(event: DraggableMoveEvent): void
  onDragOut?(event: DraggableOutEvent): void
  onDragOver?(event: DraggableOverEvent): void
  onDrop?(event: DraggableDropEvent): void
}

export function useDrop<T extends HTMLElement>({
  onDragEnd,
  onDragMove,
  onDragOut,
  onDragOver,
  onDrop
}: UseDropArgs) {
  let ref = useRef<T>(null)

  useEffect(() => {
    let el = ref.current
    if (!el) {
      return
    }

    onDragMove && el.addEventListener('draggable:dragmove', onDragMove as any)
    onDragOver && el.addEventListener('draggable:dragover', onDragOver as any)
    onDragOut  && el.addEventListener('draggable:dragout',  onDragOut as any)
    onDrop     && el.addEventListener('draggable:drop',     onDrop as any)
    onDragEnd  && el.addEventListener('draggable:dragend',  onDragEnd as any)

    return () => {
      onDragMove && el!.removeEventListener('draggable:dragmove', onDragMove as any)
      onDragEnd  && el!.removeEventListener('draggable:dragend',  onDragEnd as any)
      onDragOver && el!.removeEventListener('draggable:dragover', onDragOver as any)
      onDragOut  && el!.removeEventListener('draggable:dragout',  onDragOut as any)
      onDrop     && el!.removeEventListener('draggable:drop',     onDrop as any)
    }
  }, [ onDragEnd, onDragOver, onDragOut, onDrop, ref.current ])

  return {
    forwardRef: ref,
    forwardClass: CLASS_NAME,
  }
}
