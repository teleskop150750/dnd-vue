import { getWindow } from '../execution-context/getWindow'
import { isWindow } from './isWindow'

/**
 * Проверяет, является ли переданный узел объектом HTMLElement.
 *
 * @param {Node | Window} node - Узел или объект Window, который нужно проверить.
 * @returns {boolean} - Возвращает true, если узел является объектом HTMLElement, иначе false.
 */
export function isHTMLElement(node: Node | Window): node is HTMLElement {
  if (isWindow(node)) {
    return false
  }

  return node instanceof getWindow(node).HTMLElement
}
