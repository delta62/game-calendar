import { jsx as _jsx } from "preact/jsx-runtime";
import { createContext } from 'preact';
import { useEffect, useContext, useRef, useCallback } from 'preact/hooks';
const CLASS_NAME = '__draggable__';
let DragContext = createContext({
    key: null,
    setKey() { },
    setLastCoords() { },
    setPreviewNode() { },
});
DragContext.displayName = 'Drag';
let hitTest = (el, x, y) => {
    let rect = el.getBoundingClientRect();
    let hitX = x >= rect.left && x <= rect.left + rect.width;
    let hitY = y >= rect.top && y <= rect.top + rect.height;
    if (hitX && hitY) {
        let above = y < rect.top + rect.height / 2;
        let below = !above;
        let left = x < rect.left + rect.width / 2;
        let right = !left;
        return { above, below, left, right };
    }
    else {
        return null;
    }
};
export let DragProvider = ({ children }) => {
    let ref = useRef({
        key: null,
        lastX: 0,
        lastY: 0,
        preview: null,
        setKey(key) {
            ref.current.key = key;
        },
        setLastCoords(x, y) {
            ref.current.lastX = x;
            ref.current.lastY = y;
        },
        setPreviewNode(node, initialX, initialY) {
            let clone = node.cloneNode(true);
            clone.classList.add('drag-preview');
            clone.classList.remove(CLASS_NAME);
            let { width } = window.getComputedStyle(node);
            clone.style.width = `${width}`;
            clone.style.left = '0';
            clone.style.top = '0';
            clone.style.transform = `translate(${initialX}px, ${initialY}px)`;
            node.parentNode.insertBefore(clone, node);
            ref.current.preview = clone;
        },
    });
    let updateState = useCallback((props) => {
        let entries = Object.entries(props);
        for (let [k, v] of entries) {
            ref.current[k] = v;
        }
    }, [ref]);
    let onMove = useCallback((event) => {
        if (!ref.current.key) {
            return;
        }
        // Prevent iOS from scrolling like a maniac
        event.preventDefault();
        let x = event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;
        let y = event instanceof MouseEvent ? event.pageY : event.touches[0].pageY;
        if (ref.current.preview) {
            ref.current.preview.style.transform = `translate(${x}px, ${y}px)`;
        }
        let dropTargets = document.getElementsByClassName(CLASS_NAME);
        for (let target of dropTargets) {
            let isHovered = hitTest(target, x, y);
            let wasHovered = hitTest(target, ref.current.lastX, ref.current.lastY);
            if (!wasHovered && isHovered) {
                target.dispatchEvent(new CustomEvent('draggable:dragover', {
                    detail: isHovered,
                }));
            }
            else if (isHovered) {
                target.dispatchEvent(new CustomEvent('draggable:dragmove', {
                    detail: isHovered,
                }));
            }
            else if (wasHovered && !isHovered) {
                target.dispatchEvent(new CustomEvent('draggable:dragout'));
            }
        }
        updateState({
            lastX: x,
            lastY: y,
        });
    }, [ref]);
    let onDrop = useCallback(() => {
        var _a;
        if (!ref.current.key) {
            return;
        }
        let dropTargets = document.getElementsByClassName(CLASS_NAME);
        for (let target of dropTargets) {
            let isHovered = hitTest(target, ref.current.lastX, ref.current.lastY);
            if (isHovered) {
                target.dispatchEvent(new CustomEvent('draggable:drop', {
                    detail: Object.assign({ key: ref.current.key }, isHovered),
                }));
            }
            target.dispatchEvent(new CustomEvent('draggable:dragend'));
        }
        (_a = ref.current.preview) === null || _a === void 0 ? void 0 : _a.parentNode.removeChild(ref.current.preview);
        updateState({
            key: null,
            lastX: 0,
            lastY: 0,
            preview: null,
        });
    }, [document, updateState, ref]);
    useEffect(() => {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('mouseup', onDrop);
        document.addEventListener('touchend', onDrop);
        return () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('mouseup', onDrop);
            document.removeEventListener('touchend', onDrop);
        };
    }, [document, onMove, onDrop]);
    return (_jsx(DragContext.Provider, Object.assign({ value: ref.current }, { children: children }), void 0));
};
export let useDrag = (data, preview) => {
    let { setKey, setPreviewNode, setLastCoords } = useContext(DragContext);
    let onDragStart = useCallback((event) => {
        var _a, _b;
        let e = event;
        let x = (_a = e.pageX) !== null && _a !== void 0 ? _a : e.touches[0].pageX;
        let y = (_b = e.pageY) !== null && _b !== void 0 ? _b : e.touches[0].pageY;
        setKey(data);
        setLastCoords(x, y);
        preview && preview.current && setPreviewNode(preview.current, x, y);
    }, [preview, setKey, data]);
    return {
        onMouseDown: onDragStart,
        onTouchStart: onDragStart,
    };
};
export function useDrop({ onDragEnd, onDragMove, onDragOut, onDragOver, onDrop, }) {
    let ref = useRef(null);
    useEffect(() => {
        let el = ref.current;
        if (!el) {
            return;
        }
        onDragMove && el.addEventListener('draggable:dragmove', onDragMove);
        onDragOver && el.addEventListener('draggable:dragover', onDragOver);
        onDragOut && el.addEventListener('draggable:dragout', onDragOut);
        onDrop && el.addEventListener('draggable:drop', onDrop);
        onDragEnd && el.addEventListener('draggable:dragend', onDragEnd);
        return () => {
            onDragMove &&
                el.removeEventListener('draggable:dragmove', onDragMove);
            onDragEnd &&
                el.removeEventListener('draggable:dragend', onDragEnd);
            onDragOver &&
                el.removeEventListener('draggable:dragover', onDragOver);
            onDragOut &&
                el.removeEventListener('draggable:dragout', onDragOut);
            onDrop && el.removeEventListener('draggable:drop', onDrop);
        };
    }, [onDragEnd, onDragOver, onDragOut, onDrop, ref.current]);
    return {
        forwardRef: ref,
        forwardClass: CLASS_NAME,
    };
}
//# sourceMappingURL=draggable.js.map