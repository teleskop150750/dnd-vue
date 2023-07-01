/**
 * Это Node
 *
 * @param node Object
 */
export function isNode(node: Object): node is Node {
  return 'nodeType' in node
}
