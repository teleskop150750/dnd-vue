import {
  canUseDOM,
  getOwnerDocument,
  isDocument,
  isHTMLElement,
  isNode,
  isWindow,
  type Optional,
} from '@nado/dnd-kit-utilities'

/**
 * Возвращает прокручиваемый элемент или undefined, если элемент непрокручиваемый.
 *
 * @param {Optional<EventTarget>} element - Элемент, который нужно проверить на прокручиваемость.
 * @returns {Optional<Window | HTMLElement>} Прокручиваемый элемент или undefined, если элемент непрокручиваемый.
 */
export function getScrollableElement(element: Optional<EventTarget>) {
  if (!canUseDOM || !element) {
    return undefined
  }

  if (isWindow(element)) {
    return element
  }

  if (!isNode(element)) {
    return undefined
  }

  if (isDocument(element) || element === getOwnerDocument(element).scrollingElement) {
    return window
  }

  if (isHTMLElement(element)) {
    return element
  }

  return undefined
}
