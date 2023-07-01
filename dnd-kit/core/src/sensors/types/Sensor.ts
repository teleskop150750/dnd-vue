/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DraggableNode } from '../../store'
import type { UniqueIdentifier } from '../../types'
import type { Activators } from './Activator'
import type { SensorProps } from './SensorProps'

type Teardown = () => void

export interface Sensor<T extends Object> {
  new (props: SensorProps<T>): SensorInstance
  activators: Activators<T>
  setup?: () => Teardown | undefined
}

export type Sensors = Array<Sensor<any>>

export interface SensorOptions {}

export interface SensorInstance {
  autoScrollEnabled: boolean
}

export type SensorActivatorFunction<T> = (
  event: Event | any,
  options: T,
  context: {
    active: DraggableNode
  },
) => boolean | undefined

export interface SensorDescriptor<T extends Object> {
  sensor: Sensor<T>
  options: T
}

export type SensorHandler = (event: any, active: UniqueIdentifier) => boolean
