import { getWindow } from '../execution-context/getWindow'
import { isWindow } from './isWindow'

/**
 * Это HTMLElement
 *
 * @param node Node | Window
 */
export function isHTMLElement(node: Node | Window): node is HTMLElement {
  if (isWindow(node)) {
    return false
  }

  return node instanceof getWindow(node).HTMLElement
}
