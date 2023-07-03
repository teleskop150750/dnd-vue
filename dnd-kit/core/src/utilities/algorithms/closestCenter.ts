import type { ClientRect, Coordinates } from '../../types'
import { distanceBetween } from '../coordinates'
import { sortCollisionsAsc } from './helpers'
import type { CollisionDescriptor, CollisionDetection } from './types'

/**
 * Рассчитывает координаты центра прямоугольника на основе объекта ClientRect.
 *
 * @param {ClientRect} rect - Прямоугольник, для которого нужно рассчитать координаты центра.
 * @param {number} [left=rect.left] - Позиция слева от прямоугольника (необязательно, по умолчанию равно rect.left).
 * @param {number} [top=rect.top] - Позиция сверху от прямоугольника (необязательно, по умолчанию равно rect.top).
 * @returns {Coordinates} Координаты центра прямоугольника в виде объекта с свойствами `x` и `y`.
 */
function centerOfRectangle(rect: ClientRect, left = rect.left, top = rect.top): Coordinates {
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5,
  }
}

/**
 * Находит ближайший центр прямоугольника относительно заданного прямоугольника.
 *
 * @param {Object} params - Объект параметров
 * @param {Object} params.collisionRect - Прямоугольник, для которого вычисляется ближайший центр
 * @param {Map} params.droppableRects - Карта идентификаторов контейнеров и их прямоугольников
 * @param {Array} params.droppableContainers - Массив контейнеров, с которыми может произойти столкновение
 * @returns {Array} Отсортированный массив объектов, содержащих информацию о ближайшем контейнере и расстоянии до его центра
 */
export const closestCenter: CollisionDetection = ({ collisionRect, droppableRects, droppableContainers }) => {
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top)
  const collisions: CollisionDescriptor[] = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const rect = droppableRects.get(id)

    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect)

      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween,
        },
      })
    }
  }

  return collisions.sort(sortCollisionsAsc)
}
