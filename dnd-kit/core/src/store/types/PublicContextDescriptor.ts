import type { DeepRequired, Optional } from '@nado/dnd-kit-utilities'
import type { Ref } from 'vue'

import type { ClientRect, UniqueIdentifier } from '../../types'
import type { Active } from './Active'
import type { DraggableNodes } from './DraggableNodes'
import type { DroppableContainers } from './DroppableContainers'
import type { MutableRefObject } from './foo'
import type { Over } from './Over'
import type { RectMap } from './RectMap'

// TODO
type Collision = any
type MeasuringConfiguration = any

export interface PublicContextDescriptor {
  activatorEvent: Optional<Event>
  active: Optional<Active>
  activeNode: Optional<HTMLElement>
  activeNodeRect: Optional<ClientRect>
  collisions: Optional<Collision[]>
  containerNodeRect: Optional<ClientRect>
  draggableNodes: DraggableNodes
  droppableContainers: DroppableContainers
  droppableRects: RectMap
  over: Optional<Over>
  dragOverlay: {
    nodeRef: Ref<MutableRefObject<Optional<HTMLElement>>>
    rect: Ref<Optional<ClientRect>>
    setRef: (element: Optional<HTMLElement>) => void
  }
  scrollableAncestors: Element[]
  scrollableAncestorRects: ClientRect[]
  measuringConfiguration: DeepRequired<MeasuringConfiguration>
  measureDroppableContainers: (ids: UniqueIdentifier[]) => void
  measuringScheduled: boolean
  windowRect: Optional<ClientRect>
}
