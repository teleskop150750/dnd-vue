import { distanceBetween } from '../coordinates'
import { cornersOfRectangle, sortCollisionsAsc } from './helpers'
import type { CollisionDescriptor, CollisionDetection } from './types'

/**
 * Рассчитывает ближайшие углы заданных прямоугольников и возвращает массив дескрипторов столкновений, отсортированных по возрастанию расстояния.
 *
 * @param {Object} params - Входные параметры.
 * @param {Rectangle} params.collisionRect - Прямоугольник для проверки столкновений.
 * @param {Map<string, Rectangle>} params.droppableRects - Карта перемещаемых прямоугольников с их идентификаторами в качестве ключей.
 * @param {DroppableContainer[]} params.droppableContainers - Массив объектов контейнеров для перемещения.
 * @returns {CollisionDescriptor[]} Массив дескрипторов столкновений, отсортированных по возрастанию расстояния.
 */
export const closestCorners: CollisionDetection = ({ collisionRect, droppableRects, droppableContainers }) => {
  const corners = cornersOfRectangle(collisionRect)
  const collisions: CollisionDescriptor[] = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const rect = droppableRects.get(id)

    if (rect) {
      const rectCorners = cornersOfRectangle(rect)
      const distances = corners.reduce(
        (accumulator, corner, index) => accumulator + distanceBetween(rectCorners[index]!, corner),
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
  }

  return collisions.sort(sortCollisionsAsc)
}
