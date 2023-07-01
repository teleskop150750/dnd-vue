import { shallowRef } from 'vue'

export function useEvent<T extends Function>(handler: T | undefined) {
  return shallowRef<T | undefined>(handler)
}
