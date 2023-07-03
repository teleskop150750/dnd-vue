import { getWindow } from '../execution-context/getWindow'

/**
 * Проверяет, является ли переданный узел объектом Document.
 *
 * @param {Node} node - Узел, который нужно проверить.
 * @returns {boolean} - Возвращает true, если узел является объектом Document, иначе false.
 */
export function isDocument(node: Node): node is Document {
  const { Document } = getWindow(node)

  return node instanceof Document
}
