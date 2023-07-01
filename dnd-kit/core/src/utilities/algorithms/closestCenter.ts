import type { ClientRect, Coordinates } from '../../types'
import { distanceBetween } from '../coordinates'
import { sortCollisionsAsc } from './helpers'
import type { CollisionDescriptor, CollisionDetection } from './types'

/**
 * Возвращает координаты центра ClientRect.
 *
 * @param rect - Объект, содержащий размеры и координаты ClientRect.
 * @param left - Координата левой границы прямоугольника.
 * @param top - Координата верхней границы прямоугольника.
 *
 * @returns - Объект с координатами центра прямоугольника.
 */
function centerOfRectangle(rect: ClientRect, left = rect.left, top = rect.top): Coordinates {
  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5,
  }
}

/**
 * Возвращает ближайшие прямоугольники из массива прямоугольников к центру заданного прямоугольника..
 *
 * @param options - Объект с параметрами.
 * @param options.collisionRect - Объект, содержащий размеры и координаты прямоугольника.
 * @param options.droppableRects - Карта, содержащая размеры и координаты прямоугольников, в которые можно перетаскивать элементы.
 * @param options.droppableContainers - Массив объектов, содержащих информацию о контейнерах, в которые можно перетаскивать элементы.
 *
 * @returns - Отсортированный массив объектов, содержащих информацию о ближайшем контейнере и расстоянии до его центра.
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
