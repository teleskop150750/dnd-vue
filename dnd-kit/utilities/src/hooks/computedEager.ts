import { readonly, type Ref, shallowRef, watchEffect, type WatchOptionsBase } from 'vue'

export function computedEager<T>(fn: () => T, options?: WatchOptionsBase): Readonly<Ref<T>> {
  const result = shallowRef()

  watchEffect(
    () => {
      result.value = fn()
    },
    {
      ...options,
      flush: options?.flush ?? 'sync',
    },
  )

  return readonly(result)
}
