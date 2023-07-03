import type { UniqueIdentifier } from '../../types'
import type { DraggableNode } from './DraggableNode'

export interface DraggableElement {
  id: UniqueIdentifier
  index: number
  node: DraggableNode
  collection: string
  disabled: boolean
}
