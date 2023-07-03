import type { Optional } from '../types'

const SELECTOR =
  'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]'

/**
 * Ищет первый фокусируемый элемент (в соответствии с SELECTOR) внутри переданного элемента или сам элемент.
 *
 * @param {HTMLElement} element - Элемент, в котором ищется фокусируемый элемент.
 * @returns {HTMLElement | undefined} - Возвращает первый найденный фокусируемый элемент или undefined, если такой элемент не найден.
 */
export function findFirstFocusableNode(element: HTMLElement): Optional<HTMLElement> {
  if (element.matches(SELECTOR)) {
    return element
  }

  return element.querySelector<HTMLElement>(SELECTOR) ?? undefined
}
