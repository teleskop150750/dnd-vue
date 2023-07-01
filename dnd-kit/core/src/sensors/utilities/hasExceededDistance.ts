import type { Coordinates, DistanceMeasurement } from '../../types'

/**
 * Проверяет, превысило ли расстояние между двумя точками заданное значение.
 * @param delta - Разница между двумя точками.
 * @param measurement - Значение, которое нужно превысить.
 * @example
 * hasExceededDistance({ x: 10, y: 10 }, 5) // true
 * hasExceededDistance({ x: 10, y: 10 }, { x: 5, y: 5 }) // true
 * hasExceededDistance({ x: 10, y: 10 }, { x: 5 }) // true
 * hasExceededDistance({ x: 10, y: 10 }, { y: 5 }) // true
 * hasExceededDistance({ x: 10, y: 10 }, { x: 15, y: 15 }) // false
 * hasExceededDistance({ x: 10, y: 10 }, { x: 15 }) // false
 * hasExceededDistance({ x: 10, y: 10 }, { y: 15 }) // false
 *
 * @returns Результат проверки.
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
