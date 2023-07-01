import type { Optional } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'
import { getClientRect } from '../rect/getRect'
import { getFirstScrollableAncestor } from './getScrollableAncestors'

/**
 * Прокручивает заданный элемент в видимую область, если он еще не виден в окне просмотра.
 *
 * @param element - Элемент, который нужно прокрутить в видимую область.
 * @param measure [measure=getClientRect] - Функция, которая возвращает ClientRect.
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
