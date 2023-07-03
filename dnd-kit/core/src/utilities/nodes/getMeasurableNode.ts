import { isHTMLElement, type Optional } from '@nado/dnd-kit-utilities'

/**
 * Возвращает элемент, который можно измерить, основываясь на переданном узле. Если узел не существует, возвращает undefined.
 * Если у узла есть более одного дочернего элемента, возвращает сам узел. В противном случае возвращает первого
 * дочернего элемента, если это HTMLElement, или сам узел.
 *
 * @param {Optional<HTMLElement>} node - Узел, для которого нужно найти измеряемый элемент.
 * @returns {Optional<HTMLElement>} Измеряемый элемент или undefined, если узел не существует.
 */
export function getMeasurableNode(node: Optional<HTMLElement>): Optional<HTMLElement> {
  if (!node) {
    return undefined
  }

  if (node.children.length > 1) {
    return node
  }

  const firstChild = node.children[0] as Node

  return isHTMLElement(firstChild) ? firstChild : node
}
