import type { ClientRect, Coordinates } from '../../types'
import { distanceBetween } from '../coordinates'
import { cornersOfRectangle, sortCollisionsAsc } from './helpers'
import type { CollisionDescriptor, CollisionDetection } from './types'

/**
 * Проверьте, содержится ли данная точка внутри ограничивающего прямоугольника
 */
function isPointWithinRect(point: Coordinates, rect: ClientRect): boolean {
  const { top, left, bottom, right } = rect

  return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right
}

/**
 * Возвращает прямоугольники, над которыми наведен указатель
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
