import { isNil } from '@nado/dnd-kit-utilities'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { SensorDescriptor, SensorOptions } from './types'

type Sensors = Array<ComputedRef<SensorDescriptor<any> | undefined | null>>

export function useSensors(...sensors: Sensors): ComputedRef<Array<SensorDescriptor<SensorOptions>>> {
  return computed(() =>
    [...sensors].map((item) => item.value).filter((sensor): sensor is SensorDescriptor<any> => !isNil(sensor)),
  )
}
