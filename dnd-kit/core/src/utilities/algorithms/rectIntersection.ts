import type { ClientRect } from '../../types'
import { sortCollisionsDesc } from './helpers'
import type { CollisionDescriptor, CollisionDetection } from './types'

/**
 * Возвращает коэффициент площади пересечения и остальной общей площади двух прямоугольников
 */
export function getIntersectionRatio(entry: ClientRect, target: ClientRect): number {
  const top = Math.max(target.top, entry.top)
  const left = Math.max(target.left, entry.left)
  const right = Math.min(target.left + target.width, entry.left + entry.width)
  const bottom = Math.min(target.top + target.height, entry.top + entry.height)
  const width = right - left
  const height = bottom - top

  if (left < right && top < bottom) {
    const targetArea = target.width * target.height
    const entryArea = entry.width * entry.height
    const intersectionArea = width * height
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea)

    return Number(intersectionRatio.toFixed(4))
  }

  // Прямоугольники не перекрываются, или площадь перекрытия равна нулю (перекрытие краев/углов)
  return 0
}

/**
 * Возвращает прямоугольники, которые имеют наибольшую площадь пересечения с заданным прямоугольником в массиве прямоугольников.
 */
export const rectIntersection: CollisionDetection = ({ collisionRect, droppableRects, droppableContainers }) => {
  const collisions: CollisionDescriptor[] = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const rect = droppableRects.get(id)

    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect)

      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio,
          },
        })
      }
    }
  }

  return collisions.sort(sortCollisionsDesc)
}
