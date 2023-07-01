import { canUseDOM, type Optional } from '@nado/dnd-kit-utilities'

/**
 * Проверяет, является ли элемент элементом прокрутки документа.
 *
 * @param element Элемент, для которого выполняется проверка.
 *
 * @returns {boolean} - Возвращает true, если элемент является элементом прокрутки документа, иначе возвращает false.
 */
export function isDocumentScrollingElement(element: Optional<Element>): boolean {
  if (!canUseDOM || !element) {
    return false
  }

  return element === document.scrollingElement
}
