import type { Optional } from '@nado/dnd-kit-utilities'
import { computed, type ComputedRef } from 'vue'

import { getWindowClientRect } from '../../utilities'

export function useWindowRect(element: ComputedRef<Optional<typeof window>>) {
  return computed(() => (element.value ? getWindowClientRect(element.value) : undefined))
}
