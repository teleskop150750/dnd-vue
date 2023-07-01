import { isHTMLElement, type Optional } from '@nado/dnd-kit-utilities'

/**
 * Получить Measurable Node
 *
 * @remark
 * Ребенок если он 1 или Node
 *
 * @param node HTMLElement
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
