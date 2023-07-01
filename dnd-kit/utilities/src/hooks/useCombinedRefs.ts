/**
 * Комбинировать refs
 *
 * @param refs VUE REFS
 */
export function useCombinedRefs<T>(...refs: Array<(node: T) => void>): (node: T) => void {
  return (node: T) => {
    refs.forEach((ref) => ref(node))
  }
}
