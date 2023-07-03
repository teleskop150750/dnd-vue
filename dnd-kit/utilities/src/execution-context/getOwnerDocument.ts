import { isDocument, isHTMLElement, isNode, isWindow } from '../type-guards'

/**
 * Возвращает документ-владелец для указанного объекта события.
 *
 * @param {Event['target']} target - Целевой объект события.
 * @returns {Document} Возвращает объект документа, который является владельцем целевого элемента, или глобальный объект `document`, если владелец не найден.
 */
export function getOwnerDocument(target: Event['target']): Document {
  if (!target) {
    return document
  }

  if (isWindow(target)) {
    return target.document
  }

  if (!isNode(target)) {
    return document
  }

  if (isDocument(target)) {
    return target
  }

  if (isHTMLElement(target)) {
    return target.ownerDocument
  }

  return document
}
