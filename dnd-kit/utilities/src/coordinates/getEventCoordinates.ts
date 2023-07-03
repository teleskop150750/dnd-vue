import { hasViewportRelativeCoordinates, isTouchEvent } from '../event'
import type { Optional } from '../types'
import type { Coordinates } from './types'

/**
 * Возвращает координаты события в виде объекта с полями x и y, если они доступны.
 * Если координаты недоступны, возвращает undefined.
 *
 * @param {Event} event - Объект события, для которого нужно получить координаты.
 * @returns {Optional<Coordinates>} Объект с полями x и y или undefined, если координаты недоступны.
 */
export function getEventCoordinates(event: Event): Optional<Coordinates> {
  if (isTouchEvent(event)) {
    const firstTouch = event.touches && event.touches[0]

    if (firstTouch) {
      const { clientX: x, clientY: y } = firstTouch

      return {
        x,
        y,
      }
    }

    const firstChangedTouch = event.changedTouches && event.changedTouches[0]

    if (firstChangedTouch) {
      const { clientX: x, clientY: y } = firstChangedTouch

      return {
        x,
        y,
      }
    }
  }

  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }

  return undefined
}
