import { computedEager, type Coordinates, type Optional, subtract } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'
import { shallowRef, watch } from 'vue'

import { defaultCoordinates } from '../../utilities'

export function useScrollOffsetsDelta(scrollOffsets: ComputedRef<Coordinates>, dependencies: any[] = []) {
  const initialScrollOffsets = shallowRef<Optional<Coordinates>>(undefined)

  watch(
    dependencies,
    () => {
      initialScrollOffsets.value = undefined
    },
    { immediate: true },
  )

  watch(
    scrollOffsets,
    () => {
      const hasScrollOffsets = scrollOffsets.value !== defaultCoordinates

      if (hasScrollOffsets && !initialScrollOffsets.value) {
        initialScrollOffsets.value = scrollOffsets.value
      }

      if (!hasScrollOffsets && initialScrollOffsets.value) {
        initialScrollOffsets.value = undefined
      }
    },
    { immediate: true },
  )

  return computedEager(() =>
    initialScrollOffsets.value ? subtract(scrollOffsets.value, initialScrollOffsets.value) : defaultCoordinates,
  )
}
