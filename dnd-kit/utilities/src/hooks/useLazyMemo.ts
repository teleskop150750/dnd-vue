import { computed, type ComputedRef, ref } from 'vue'

import type { Optional } from '../types'

type Callback<T> = (prevValue: Optional<T>) => T

export function useLazyMemo<T>(callback: Callback<T>): ComputedRef {
  const prevValue = ref<T>()

  return computed(() => {
    const newValue = callback(prevValue.value)

    prevValue.value = newValue

    return newValue
  })
}
