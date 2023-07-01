import { getWindow, isString } from '@nado/dnd-kit-utilities'

/**
 * Проверяет, может ли элемент прокручиваться.
 *
 * @param element Элемент, для которого выполняется проверка.
 * @param computedStyle Вычисленные стили элемента.
 *
 * @returns - Возвращает true, если элемент может прокручиваться, иначе возвращает false.
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
