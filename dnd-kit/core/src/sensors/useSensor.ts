import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { Sensor, SensorDescriptor, SensorOptions } from './types'

export function useSensor<T extends SensorOptions>(sensor: Sensor<T>, options?: T): ComputedRef<SensorDescriptor<T>> {
  return computed(() => ({
    sensor,
    options: options ?? ({} as T),
  }))
}
