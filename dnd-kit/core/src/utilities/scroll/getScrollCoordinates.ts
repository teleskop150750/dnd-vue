import { isWindow } from '@nado/dnd-kit-utilities'

import type { Coordinates } from '../../types'

/**
 * Получить Scroll X coordinates
 *
 * @param element: Element | Window
 */
export function getScrollXCoordinate(element: Element | typeof window): number {
  if (isWindow(element)) {
    return element.scrollX
  }

  return element.scrollLeft
}

/**
 * Получить Scroll Y coordinates
 *
 * @param element: Element | Window
 */
export function getScrollYCoordinate(element: Element | typeof window): number {
  if (isWindow(element)) {
    return element.scrollY
  }

  return element.scrollTop
}

/**
 * Получить Scroll coordinates
 *
 * @param element: Element | Window
 */
export function getScrollCoordinates(element: Element | typeof window): Coordinates {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element),
  }
}
