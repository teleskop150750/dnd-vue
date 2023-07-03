import { getWindow } from '@nado/dnd-kit-utilities'

/**
 * Определяет, имеет ли элемент позиционирование `fixed`.
 *
 * @param {HTMLElement} node - HTML-элемент, который нужно проверить.
 * @param {CSSStyleDeclaration} [computedStyle] - объект стилей, вычисленных для элемента. Если не задано, будет получено из Window элемента.
 * @returns {boolean} Возвращает true, если позиционирование элемента `fixed`, иначе false.
 */
export function isFixed(
  node: HTMLElement,
  computedStyle: CSSStyleDeclaration = getWindow(node).getComputedStyle(node),
): boolean {
  return computedStyle.position === 'fixed'
}
