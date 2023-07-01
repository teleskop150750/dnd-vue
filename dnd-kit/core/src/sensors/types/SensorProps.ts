import type { DraggableNode } from '../../store'
import type { MutableRefObject } from '../../store/types/foo'
import type { Coordinates, UniqueIdentifier } from '../../types'
import type { SensorContext } from './SensorContext'

export interface SensorProps<T> {
  active: UniqueIdentifier
  activeNode: DraggableNode
  event: Event
  context: MutableRefObject<SensorContext>
  options: T
  onStart: (coordinates: Coordinates) => void
  onCancel: () => void
  onMove: (coordinates: Coordinates) => void
  onEnd: () => void
}
