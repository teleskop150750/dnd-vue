import { isWindow } from '@nado/dnd-kit-utilities'

import type { Coordinates } from '../../types'

/**
 * Получает горизонтальную прокрутку координаты X элемента или окна.
 *
 * @param {Element | typeof window} element - Элемент или объект window, для которого нужно получить координату прокрутки X.
 * @returns {number} Координата прокрутки X для элемента или окна.
 */
export function getScrollXCoordinate(element: Element | typeof window): number {
  if (isWindow(element)) {
    return element.scrollX
  }

  return element.scrollLeft
}

/**
 * Получает вертикальную прокрутку координаты Y элемента или окна.
 *
 * @param {Element | typeof window} element - Элемент или объект window, для которого нужно получить координату прокрутки Y.
 * @returns {number} Координата прокрутки Y для элемента или окна.
 */
export function getScrollYCoordinate(element: Element | typeof window): number {
  if (isWindow(element)) {
    return element.scrollY
  }

  return element.scrollTop
}

/**
 * Получает координаты прокрутки (x, y) для элемента или окна.
 *
 * @param {Element | typeof window} element - Элемент или объект window, для которого необходимо получить координаты прокрутки.
 * @returns {Coordinates} Объект с координатами прокрутки x и y.
 */

export function getScrollCoordinates(element: Element | typeof window): Coordinates {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element),
  }
}
