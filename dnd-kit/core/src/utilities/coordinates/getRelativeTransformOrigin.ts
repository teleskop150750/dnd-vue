import { getEventCoordinates } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'

/**
 * Получить TransformOrigin относительно Event coords
 *
 * @param event Event
 * @param rect ClientRect
 */
export function getRelativeTransformOrigin(event: MouseEvent | TouchEvent | KeyboardEvent, rect: ClientRect) {
  const eventCoordinates = getEventCoordinates(event)

  if (!eventCoordinates) {
    return '0 0'
  }

  const transformOrigin = {
    x: ((eventCoordinates.x - rect.left) / rect.width) * 100,
    y: ((eventCoordinates.y - rect.top) / rect.height) * 100,
  }

  return `${transformOrigin.x}% ${transformOrigin.y}%`
}
