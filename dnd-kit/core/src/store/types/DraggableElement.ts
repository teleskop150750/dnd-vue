import type { UniqueIdentifier } from '../../types'
import type { DraggableNode } from './DraggableNode'

export interface DraggableElement {
  node: DraggableNode
  id: UniqueIdentifier
  index: number
  collection: string
  disabled: boolean
}
