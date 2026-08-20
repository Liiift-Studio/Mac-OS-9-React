// Public hook surface for the component library.

export { usePointerGesture } from './usePointerGesture';
export type { PointerGesture, PointerGestureHandlers } from './usePointerGesture';

export { useDraggable } from './useDraggable';
export type { DragPoint, UseDraggableOptions, UseDraggableResult } from './useDraggable';

export { useResizable } from './useResizable';
export type {
	ResizeDirection,
	ResizeRect,
	UseResizableOptions,
	UseResizableResult,
} from './useResizable';

export { useOutsideClick } from './useOutsideClick';
export type { UseOutsideClickOptions } from './useOutsideClick';

export { clamp, measureContainingBlock, measureOffset } from './gestureGeometry';
export type { ContainingBlock } from './gestureGeometry';
