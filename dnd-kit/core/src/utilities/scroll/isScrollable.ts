import { getWindow, isString } from '@nado/dnd-kit-utilities'

/**
 * Определяет, является ли элемент прокручиваемым.
 *
 * @param {HTMLElement} element - Элемент для проверки.
 * @param {CSSStyleDeclaration} [computedStyle] - Вычисленные стили элемента. Если не указаны, будут получены автоматически.
 * @returns {boolean} Возвращает `true`, если элемент прокручиваемый, иначе `false`.
 */
export function isScrollable(
  element: HTMLElement,
  computedStyle: CSSStyleDeclaration = getWindow(element).getComputedStyle(element),
): boolean {
  // eslint-disable-next-line prefer-named-capture-group
  const overflowRegex = /(auto|scroll|overlay)/
  const properties: Array<keyof CSSStyleDeclaration> = ['overflow', 'overflowX', 'overflowY']

  return properties.some((property) => {
    const value = computedStyle[property]

    return isString(value) ? overflowRegex.test(value) : false
  })
}
