import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'
import { getClientRect } from '../rect/getRect'
import { getFirstScrollableAncestor } from './getScrollableAncestors'

/**
 * Прокручивает элемент в видимую область, если он не виден.
 *
 * @param {Optional<HTMLElement>} element - Элемент для прокрутки (может быть `null` или `undefined`).
 * @param {(node: HTMLElement) => ClientRect} [measure] - Функция измерения элемента, возвращает объект с размерами и позицией. Если не указана, будет использоваться функция `getClientRect`.
 */
export function scrollIntoViewIfNeeded(
  element: Optional<HTMLElement>,
  measure: (node: HTMLElement) => ClientRect = getClientRect,
) {
  if (!element) {
    return
  }

  const { top, left, bottom, right } = measure(element)
  const firstScrollableAncestor = getFirstScrollableAncestor(element)

  if (!firstScrollableAncestor) {
    return
  }

  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: 'center',
      inline: 'center',
    })
  }
}
