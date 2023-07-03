import type { Optional } from '@nado/dnd-kit-utilities'

import type { SyntheticListeners } from '../../hooks/utilities/useSyntheticListeners'
import type { ClientRect, UniqueIdentifier } from '../../types'
import type { Active } from './Active'
import type { DraggableNodes } from './DraggableNodes'
import type { Over } from './Over'

export interface InternalContextDescriptor {
  activatorEvent: Optional<Event>
  activators: SyntheticListeners
  active: Optional<Active>
  activeNodeRect: Optional<ClientRect>
  ariaDescribedById: {
    draggable: string
  }
  dispatch: any
  draggableNodes: DraggableNodes
  over: Optional<Over>
  measureDroppableContainers: (ids: UniqueIdentifier[]) => void
}
