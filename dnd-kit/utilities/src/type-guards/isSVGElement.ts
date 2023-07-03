import { getWindow } from '../execution-context/getWindow'

/**
 * Проверяет, является ли переданный узел объектом SVGElement.
 *
 * @param {Node} node - Узел, который нужно проверить.
 * @returns {boolean} - Возвращает true, если узел является объектом SVGElement, иначе false.
 */
export function isSVGElement(node: Node): node is SVGElement {
  return node instanceof getWindow(node).SVGElement
}
