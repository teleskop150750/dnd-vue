import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect, UniqueIdentifier } from '../../types'
import type { DataRef } from './data'
import type { MutableRefObject } from './foo'

export interface DroppableContainer {
  id: UniqueIdentifier
  key: UniqueIdentifier
  node: MutableRefObject<Optional<HTMLElement>>
  disabled: boolean
  rect: MutableRefObject<Optional<ClientRect>>
  data: DataRef
}
