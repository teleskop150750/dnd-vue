import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect, Coordinates } from '../../types'
import { defaultCoordinates } from '../coordinates'

/**
 * Вычисляет разницу между координатами двух Rects типа ClientRect.
 *
 * @param {Optional<ClientRect>} rect1 - Первый Rect для сравнения.
 * @param {Optional<ClientRect>} rect2 - Второй Rect для сравнения.
 * @returns {Coordinates} Объект с координатами x и y, представляющими разницу между Rects.
 */
export function getRectDelta(rect1: Optional<ClientRect>, rect2: Optional<ClientRect>): Coordinates {
  return rect1 && rect2
    ? {
        x: rect1.left - rect2.left,
        y: rect1.top - rect2.top,
      }
    : defaultCoordinates
}
