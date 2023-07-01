import { ref } from 'vue'

import { isNil } from '../is'
import type { Optional } from '../types'

export function useInterval() {
  const intervalRef = ref<Optional<number>>(undefined)

  const set = (listener: Function, duration: number) => {
    intervalRef.value = setInterval(listener, duration)
  }

  const clear = () => {
    if (!isNil(intervalRef.value)) {
      clearInterval(intervalRef.value)
      intervalRef.value = undefined
    }
  }

  return [set, clear] as const
}
