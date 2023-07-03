import type { Optional } from 'src/types'

import { isNode } from '../type-guards/isNode'
import { isWindow } from '../type-guards/isWindow'

/**
 * Возвращает глобальный объект window, связанный с объектом события или текущим окном по умолчанию.
 *
 * @param {Event['target'] | undefined} target - Целевой объект события или `undefined`.
 * @returns {typeof window} Возвращает глобальный объект window, связанный с объектом события, или текущий объект window по умолчанию, если связанный объект не найден.
 */
export function getWindow(target: Optional<Event['target']>): typeof window {
  if (!target) {
    return window
  }

  if (isWindow(target)) {
    return target
  }

  if (!isNode(target)) {
    return window
  }

  return target.ownerDocument?.defaultView ?? window
}
