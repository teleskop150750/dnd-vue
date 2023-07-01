import type { Optional } from '@nado/dnd-kit-utilities'

import type { UniqueIdentifier } from '../../types'
import type { DataRef } from './data'
import type { MutableRefObject } from './foo'

export interface DraggableNode {
  id: UniqueIdentifier
  key: UniqueIdentifier
  // TODO ref
  node: MutableRefObject<Optional<HTMLElement>>
  activatorNode: MutableRefObject<Optional<HTMLElement>>
  data: DataRef
}
