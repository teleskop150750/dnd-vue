import type { Coordinates } from '../../types'

/**
 * Рассчитывает расстояние между двумя точками с координатами (p1 и p2).
 * @param p1 - Координаты первой точки.
 * @param p2 - Координаты второй точки.
 * @returns Расстояние между двумя точками.
 */

export function distanceBetween(p1: Coordinates, p2: Coordinates) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}
