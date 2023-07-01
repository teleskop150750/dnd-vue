import { isNode } from '../type-guards/isNode'
import { isWindow } from '../type-guards/isWindow'

/**
 * Получить Window из Node
 *
 * @param target Event Target
 */
export function getWindow(target: Event['target'] | undefined): typeof window {
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
