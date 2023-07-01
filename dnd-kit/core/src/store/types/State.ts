import type { Coordinates, Optional } from '@nado/dnd-kit-utilities'

import type { UniqueIdentifier } from '../../types'
import type { DraggableNodes } from './DraggableNodes'
import type { DroppableContainers } from './DroppableContainers'

export interface State {
  droppable: {
    containers: DroppableContainers
  }
  draggable: {
    active: Optional<UniqueIdentifier>
    initialCoordinates: Coordinates
    nodes: DraggableNodes
    translate: Coordinates
  }
}
