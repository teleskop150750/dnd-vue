import { computedEager } from '@nado/dnd-kit-utilities'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

import type { SyntheticEventName, UniqueIdentifier } from '../../types'

export interface SyntheticListener {
  eventName: SyntheticEventName
  handler: (event: Event, id: UniqueIdentifier) => void
}

export type SyntheticListeners = SyntheticListener[]

export type SyntheticListenerMap = Record<string, Function>

export function useSyntheticListeners(listeners: SyntheticListeners, id: MaybeRefOrGetter<UniqueIdentifier>) {
  return computedEager(() => {
    const idVal = toValue(id)

    return listeners.reduce<SyntheticListenerMap>((acc, { eventName, handler }) => {
      acc[eventName] = (event: Event) => {
        handler(event, idVal)
      }

      return acc
    }, {} as SyntheticListenerMap)
  })
}
