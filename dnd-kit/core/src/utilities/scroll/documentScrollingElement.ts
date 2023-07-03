import { canUseDOM, type Optional } from '@nado/dnd-kit-utilities'

/**
 * Проверяет, является ли элемент элементом прокрутки документа.
 *
 * @param {Optional<Element>} element - Элемент, который нужно проверить.
 * @returns {boolean} Возвращает true, если элемент является элементом прокрутки документа, иначе false.
 */
export function isDocumentScrollingElement(element: Optional<Element>): boolean {
  if (!canUseDOM || !element) {
    return false
  }

  return element === document.scrollingElement
}
