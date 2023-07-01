import type { Optional, Transform } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'

type Rect = Pick<ClientRect, 'width' | 'height'>

/**
 * Регулировать Scale
 * @param transform Transform
 * @param rect1 'width' | 'height'
 * @param rect2 'width' | 'height'
 */
export function adjustScale(transform: Transform, rect1: Optional<Rect>, rect2: Optional<Rect>): Transform {
  return {
    ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1,
  }
}
