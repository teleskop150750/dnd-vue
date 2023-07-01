import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect, UniqueIdentifier } from '../../types'
import type { DataRef } from './data'
import type { MutableRefObject } from './foo'

export interface Active {
  id: UniqueIdentifier
  rect: MutableRefObject<{
    initial: Optional<ClientRect>
    translated: Optional<ClientRect>
  }>
  data: DataRef
}
