import type { SyntheticEventName } from '../../types'
import type { SensorActivatorFunction } from './Sensor'

export interface Activator<T> {
  eventName: SyntheticEventName
  handler: SensorActivatorFunction<T>
}

export type Activators<T> = Array<Activator<T>>
