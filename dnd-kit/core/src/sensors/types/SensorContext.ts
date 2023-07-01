import type { Optional } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'

import type { Active, DraggableNodes, DroppableContainers, Over, RectMap } from '../../store'
import type { ClientRect, Translate } from '../../types'
import type { Collision } from '../../utilities'

export interface SensorContext {
  activatorEvent: Optional<Event>
  active: Optional<ComputedRef<Optional<Active>>>
  activeNode: Optional<HTMLElement>
  collisionRect: Optional<ClientRect>
  collisions: Optional<Collision[]>
  draggableNodes: DraggableNodes
  draggingNode: Optional<HTMLElement>
  draggingNodeRect: Optional<ClientRect>
  droppableRects: RectMap
  droppableContainers: DroppableContainers
  over: Optional<Over>
  scrollableAncestors: Element[]
  scrollAdjustedTranslate: Optional<Translate>
}
