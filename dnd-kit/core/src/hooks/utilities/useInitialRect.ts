import type { Optional } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'

import type { ClientRect } from '../../types'
import { useInitialValue } from './useInitialValue'

export function useInitialRect(node: Optional<ComputedRef<HTMLElement>>, measure: (node: HTMLElement) => ClientRect) {
  return useInitialValue(node, measure)
}
