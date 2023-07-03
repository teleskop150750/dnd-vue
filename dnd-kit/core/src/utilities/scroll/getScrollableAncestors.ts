import {
  getWindow,
  isDocument,
  isHTMLElement,
  isNil,
  isSVGElement,
  type Nillable,
  type Optional,
} from '@nado/dnd-kit-utilities'

import { isFixed } from './isFixed'
import { isScrollable } from './isScrollable'

/**
 * Возвращает массив всех прокручиваемых предков переданного элемента.
 *
 * @param {Optional<Node>} element - Элемент, для которого нужно найти прокручиваемых предков.
 * @param {number} [limit] - Опциональное ограничение на количество прокручиваемых предков.
 * @returns {Element[]} Массив прокручиваемых предков переданного элемента.
 */
export function getScrollableAncestors(element: Optional<Node>, limit?: number): Element[] {
  const scrollParents: Element[] = []

  function findScrollableAncestors(node: Nillable<Node>): Element[] {
    if (!isNil(limit) && scrollParents.length >= limit) {
      return scrollParents
    }

    if (!node) {
      return scrollParents
    }

    if (isDocument(node) && !isNil(node.scrollingElement) && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement)

      return scrollParents
    }

    if (!isHTMLElement(node) || isSVGElement(node)) {
      return scrollParents
    }

    if (scrollParents.includes(node)) {
      return scrollParents
    }

    const computedStyle = getWindow(element).getComputedStyle(node)

    if (node !== element && isScrollable(node, computedStyle)) {
      scrollParents.push(node)
    }

    if (isFixed(node, computedStyle)) {
      return scrollParents
    }

    return findScrollableAncestors(node.parentNode)
  }

  if (!element) {
    return scrollParents
  }

  return findScrollableAncestors(element)
}

/**
 * Возвращает первого прокручиваемого предка переданного элемента.
 *
 * @param {Optional<Node>} node - Элемент, для которого нужно найти первого прокручиваемого предка.
 * @returns {Optional<Element>} Первый прокручиваемый предок переданного элемента или undefined, если не найден.
 */
export function getFirstScrollableAncestor(node: Optional<Node>): Optional<Element> {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1)

  return firstScrollableAncestor ?? undefined
}
