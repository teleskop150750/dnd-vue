import type { ClientRect, UniqueIdentifier } from '../../types'
import type { DataRef } from './data'

export interface Over {
  id: UniqueIdentifier
  disabled: boolean
  rect: ClientRect
  data: DataRef
}
