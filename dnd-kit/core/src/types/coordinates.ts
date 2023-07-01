import type { Coordinates } from '@nado/dnd-kit-utilities'

export type DistanceMeasurement = number | Coordinates | Pick<Coordinates, 'x'> | Pick<Coordinates, 'y'>

export type Translate = Coordinates

export interface ScrollCoordinates {
  initial: Coordinates
  current: Coordinates
  delta: Coordinates
}

export { type Coordinates } from '@nado/dnd-kit-utilities'
