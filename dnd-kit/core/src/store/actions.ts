import type { Coordinates, UniqueIdentifier } from '../types'
import type { DroppableContainer } from './types'

export enum Action {
  DragStart = 'dragStart',
  DragMove = 'dragMove',
  DragEnd = 'dragEnd',
  DragCancel = 'dragCancel',
  DragOver = 'dragOver',
  RegisterDroppable = 'registerDroppable',
  SetDroppableDisabled = 'setDroppableDisabled',
  UnregisterDroppable = 'unregisterDroppable',
}

export type Actions =
  | ActionDragStart
  | ActionDragMove
  | ActionDragEnd
  | ActionDragCancel
  | ActionRegisterDroppable
  | ActionSetDroppableDisabled
  | ActionUnregisterDroppable

interface ActionDragStart {
  type: Action.DragStart
  active: UniqueIdentifier
  initialCoordinates: Coordinates
}

interface ActionDragMove {
  type: Action.DragMove
  coordinates: Coordinates
}

interface ActionDragEnd {
  type: Action.DragEnd
}

interface ActionDragCancel {
  type: Action.DragCancel
}

interface ActionRegisterDroppable {
  type: Action.RegisterDroppable
  element: DroppableContainer
}

interface ActionSetDroppableDisabled {
  type: Action.SetDroppableDisabled
  id: UniqueIdentifier
  key: UniqueIdentifier
  disabled: boolean
}

interface ActionUnregisterDroppable {
  type: Action.UnregisterDroppable
  id: UniqueIdentifier
  key: UniqueIdentifier
}
