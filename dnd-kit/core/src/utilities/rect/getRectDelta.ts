import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect, Coordinates } from '../../types'
import { defaultCoordinates } from '../coordinates'

/**
 * Получить разнице между Rect: `top` и `left`
 *
 * @param rect1
 * @param rect2
 */
export function getRectDelta(rect1: Optional<ClientRect>, rect2: Optional<ClientRect>): Coordinates {
  return rect1 && rect2
    ? {
        x: rect1.left - rect2.left,
        y: rect1.top - rect2.top,
      }
    : defaultCoordinates
}
