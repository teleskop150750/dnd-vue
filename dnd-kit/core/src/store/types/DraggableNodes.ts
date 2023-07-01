import type { Optional } from '@nado/dnd-kit-utilities'

import type { UniqueIdentifier } from '../../types'
import type { DraggableNode } from './DraggableNode'

export type DraggableNodes = Map<UniqueIdentifier, Optional<DraggableNode>>
