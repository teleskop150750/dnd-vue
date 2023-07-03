/**
 * Проверяет, является ли переданный объект узлом Node.
 *
 * @param {object} node - Объект, который нужно проверить.
 * @returns {boolean} - Возвращает true, если объект является узлом Node, иначе false.
 */
export function isNode(node: object): node is Node {
  return 'nodeType' in node
}
