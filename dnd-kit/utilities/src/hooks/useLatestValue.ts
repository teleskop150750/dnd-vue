import { type ComputedRef, shallowRef, watch } from 'vue'

export function useLatestValue<T extends ComputedRef>(value: T, dependencies: unknown[] = [value]) {
  const valueRef = shallowRef(value.value)

  watch(
    dependencies,
    () => {
      if (valueRef.value !== value.value) {
        valueRef.value = value.value
      }
    },
    { immediate: true },
  )

  return valueRef
}
