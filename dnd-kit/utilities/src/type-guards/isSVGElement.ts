import { getWindow } from '../execution-context/getWindow'

/**
 * Это SVGElement
 *
 * @param node Object
 */
export function isSVGElement(node: Node): node is SVGElement {
  return node instanceof getWindow(node).SVGElement
}
