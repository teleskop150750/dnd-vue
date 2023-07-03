import type { Coordinates, DistanceMeasurement } from '../../types'

/**
 * Определяет, превышено ли расстояние между двумя точками на основе указанных измерений.
 *
 * @param delta - Объект с координатами разницы между двумя точками.
 * @param measurement - Объект или число, определяющее измерение расстояния.
 * @returns Возвращает true, если расстояние превышено, иначе false.
 */
export function hasExceededDistance(delta: Coordinates, measurement: DistanceMeasurement): boolean {
  const dx = Math.abs(delta.x)
  const dy = Math.abs(delta.y)

  if (typeof measurement === 'number') {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement
  }

  if ('x' in measurement && 'y' in measurement) {
    return dx > measurement.x && dy > measurement.y
  }

  if ('x' in measurement) {
    return dx > measurement.x
  }

  if ('y' in measurement) {
    return dy > measurement.y
  }

  return false
}
