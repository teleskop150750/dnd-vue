import { getWindow } from '@nado/dnd-kit-utilities'

/**
 * Это Fixed HTMLElement
 *
 * @param node HTMLElement
 * @param computedStyle Node ComputedStyle
 */
export function isFixed(
  node: HTMLElement,
  computedStyle: CSSStyleDeclaration = getWindow(node).getComputedStyle(node),
): boolean {
  return computedStyle.position === 'fixed'
}
