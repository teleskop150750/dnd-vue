import type { ClientRect } from '../../types'

/**
 * Получить Rect у ScrollElement
 *
 * @param element Element
 */
export function getScrollElementRect(element: Element): ClientRect {
  if (element === document.scrollingElement) {
    const { innerWidth, innerHeight } = window

    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight,
    }
  }

  const { top, left, right, bottom } = element.getBoundingClientRect()

  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight,
  }
}
