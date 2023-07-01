const SELECTOR =
  'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]'

/**
 * Получить первый фокусируемый элемент
 *
 * @param element HTML Element
 */
export function findFirstFocusableNode(element: HTMLElement): HTMLElement | null {
  if (element.matches(SELECTOR)) {
    return element
  }

  return element.querySelector(SELECTOR)
}
