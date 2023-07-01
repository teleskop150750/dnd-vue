import type { Data, DroppableContainer, RectMap } from '../../store'
import type { ClientRect, Coordinates, UniqueIdentifier } from '../../types'

export interface Collision {
  id: UniqueIdentifier
  data?: Data
}

export interface CollisionDescriptor extends Collision {
  data: {
    droppableContainer: DroppableContainer
    value: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
}

export type CollisionDetection = (args: {
  collisionRect: ClientRect
  droppableRects: RectMap
  droppableContainers: DroppableContainer[]
  pointerCoordinates: Coordinates | null
}) => Collision[]
