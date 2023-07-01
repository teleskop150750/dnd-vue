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
 * Возвращает массив прокручиваемых родительских элементов для заданного элемента.
 *
 * @param node Элемент, для которого требуется найти прокручиваемых родителей.
 * @param limit Ограничение на количество прокручиваемых родителей.
 *
 * @returns - Массив прокручиваемых родительских элементов.
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
 * Возвращает первый прокручиваемый родительский элемент для заданного узла.
 *
 * @param node Узел, для которого требуется найти первого прокручиваемого родителя.
 *
 * @returns Первый прокручиваемый родительский элемент или undefined, если такой элемент не найден.
 */
export function getFirstScrollableAncestor(node: Optional<Node>): Optional<Element> {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1)

  return firstScrollableAncestor ?? undefined
}
