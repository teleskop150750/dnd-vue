import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { SyntheticEventName, UniqueIdentifier } from '../../types'

export interface SyntheticListener {
  eventName: SyntheticEventName
  handler: (event: any, id: UniqueIdentifier) => void
}

export type SyntheticListeners = SyntheticListener[]

export type SyntheticListenerMap = Record<string, Function>

export function useSyntheticListeners(
  listeners: SyntheticListeners,
  id: ComputedRef<UniqueIdentifier>,
): ComputedRef<SyntheticListenerMap> {
  return computed(() =>
    listeners.reduce<SyntheticListenerMap>((acc, { eventName, handler }) => {
      acc[eventName] = (event: any) => {
        handler(event, id.value)
      }

      return acc
    }, {} as SyntheticListenerMap),
  )
}
