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
 * Получить Element или Window из Scroll Event
 *
 * @param element Scroll Event target
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
