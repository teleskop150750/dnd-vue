import type { Optional, Transform } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'

type Rect = Pick<ClientRect, 'width' | 'height'>

/**
 * Корректирует масштабирование трансформации на основе двух Rects.
 *
 * @param {Transform} transform - объект Transform с текущими значениями трансформации
 * @param {Optional<Rect>} rect1 - первый Rect (может быть не определен)
 * @param {Optional<Rect>} rect2 - второй Rect (может быть не определен)
 * @returns {Transform} - новый объект Transform с корректировкой масштабирования
 */
export function adjustScale(transform: Transform, rect1: Optional<Rect>, rect2: Optional<Rect>): Transform {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1,
  }
}
