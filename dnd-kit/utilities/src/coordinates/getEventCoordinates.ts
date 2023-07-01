import { hasViewportRelativeCoordinates, isTouchEvent } from '../event'
import type { Optional } from '../types'
import type { Coordinates } from './types'

/**
 * Возвращает нормализованные координаты x и y для событий `mouse` и `touch`.
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
