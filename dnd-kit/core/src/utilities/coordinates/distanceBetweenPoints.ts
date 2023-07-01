import type { Coordinates } from '../../types'

/**
 * Возвращает расстояние между двумя точками
 */
export function distanceBetween(p1: Coordinates, p2: Coordinates) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
