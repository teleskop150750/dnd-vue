import { isFunction, type Optional } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any) => any

export function useInitialValue<T extends ComputedRef, U extends Optional<AnyFunction> = undefined>(
  value: Optional<T>,
  computeFn?: U,
) {
  return computed(() => {
    if (!value?.value) {
      return undefined
    }

    return isFunction(computeFn) ? computeFn(value.value) : value.value
  })
}
