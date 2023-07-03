import { getEventCoordinates } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'

/**
 * Рассчитывает относительное положение точки TransformOrigin на основе события (мыши, касания или клавиатуры) и прямоугольника.
 * @param event - Событие мыши, касания или клавиатуры.
 * @param rect - Объект ClientRect, представляющий прямоугольник.
 * @returns Строка, представляющая относительное положение точки TransformOrigin, например '50% 50%'.
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
