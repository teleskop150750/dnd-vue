import { isNil, type Optional } from '@nado/dnd-kit-utilities'

import type { UniqueIdentifier } from '../types'
import type { DroppableContainer } from './types'

type Identifier = Optional<UniqueIdentifier>

export class DroppableContainersMap extends Map<UniqueIdentifier, DroppableContainer> {
  public override get(id: Identifier) {
    return !isNil(id) ? super.get(id) ?? undefined : undefined
  }

  public toArray(): DroppableContainer[] {
    return [...this.values()]
  }

  public getEnabled(): DroppableContainer[] {
    return this.toArray().filter(({ disabled }) => !disabled)
  }

  public getNodeFor(id: Identifier) {
    return this.get(id)?.node.current ?? undefined
  }
}
