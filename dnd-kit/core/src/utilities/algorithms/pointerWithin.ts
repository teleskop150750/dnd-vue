import type { ClientRect, Coordinates } from '../../types'
import { distanceBetween } from '../coordinates'
import { cornersOfRectangle, sortCollisionsAsc } from './helpers'
import type { CollisionDescriptor, CollisionDetection } from './types'

/**
 *  * Определяет, находится ли точка внутри прямоугольника.
 *
 * @param {Coordinates} point - Координаты точки.
 * @param {ClientRect} rect - Прямоугольник, заданный объектом ClientRect.
 * @returns {boolean} Возвращает true, если точка находится внутри прямоугольника, иначе false.
 */
function isPointWithinRect(point: Coordinates, rect: ClientRect): boolean {
  const { top, left, bottom, right } = rect

  return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right
}

/**
 * Определяет столкновения между указателем и контейнерами.
 *
 * @typedef {Object} CollisionDetectionInput
 * @property {DroppableContainer[]} droppableContainers - Массив контейнеров для проверки столкновений.
 * @property {Map<string, ClientRect>} droppableRects - Карта, содержащая ClientRect каждого контейнера.
 * @property {Coordinates | null} pointerCoordinates - Координаты указателя.
 *
 * @typedef {Object} CollisionDescriptor
 * @property {string} id - Идентификатор контейнера, с которым произошло столкновение.
 * @property {Object} data - Дополнительные данные столкновения.
 * @property {DroppableContainer} data.droppableContainer - Контейнер, с которым произошло столкновение.
 * @property {number} data.value - Эффективное расстояние от указателя до контейнера.
 *
 * @param {CollisionDetectionInput} params - Объект с данными для проверки столкновений.
 * @returns {CollisionDescriptor[]} Массив объектов, описывающих столкновения.
 */
export const pointerWithin: CollisionDetection = ({ droppableContainers, droppableRects, pointerCoordinates }) => {
  if (!pointerCoordinates) {
    return []
  }

  const collisions: CollisionDescriptor[] = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const rect = droppableRects.get(id)

    if (!rect || !isPointWithinRect(pointerCoordinates, rect)) {
      // eslint-disable-next-line no-continue
      continue
    }

    /* Может быть несколько пересекающихся прямоугольников
     * с координатами указателя. Чтобы отсортировать их,
     * мы измеряем расстояние между указателем и углами
     * пересекающегося прямоугольника
     */
    const corners = cornersOfRectangle(rect)
    const distances = corners.reduce(
      (accumulator, corner) => accumulator + distanceBetween(pointerCoordinates, corner),
      0,
    )
    const effectiveDistance = Number((distances / 4).toFixed(4))

    collisions.push({
      id,
      data: {
        droppableContainer,
        value: effectiveDistance,
      },
    })
  }

  return collisions.sort(sortCollisionsAsc)
}
