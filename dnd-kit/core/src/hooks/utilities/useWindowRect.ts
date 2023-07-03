import { computedEager, type Optional } from '@nado/dnd-kit-utilities'
import { type MaybeRefOrGetter, toValue } from 'vue'

import { getWindowClientRect } from '../../utilities'

export function useWindowRect(element: MaybeRefOrGetter<Optional<typeof window>>) {
  return computedEager(() => {
    const el = toValue(element)

    return el ? getWindowClientRect(el) : undefined
  })
}
