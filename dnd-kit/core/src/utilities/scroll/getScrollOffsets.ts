import { add } from '@nado/dnd-kit-utilities'

import type { Coordinates } from '../../types'
import { defaultCoordinates } from '../coordinates'
import { getScrollCoordinates, getScrollXCoordinate, getScrollYCoordinate } from './getScrollCoordinates'

/**
 * Возвращает смещение прокрутки для массива прокручиваемых предков.
 
 * @param {Element[]} scrollableAncestors - Массив прокручиваемых предков.
 * @returns {Coordinates} Объект с координатами x и y, представляющими смещение прокрутки для всех предков.
 */
export function getScrollOffsets(scrollableAncestors: Element[]): Coordinates {
  return scrollableAncestors.reduce<Coordinates>(
    (acc, node) => add(acc, getScrollCoordinates(node)),
    defaultCoordinates,
  )
}

/**
 * Возвращает смещение прокрутки по оси X для массива прокручиваемых предков.
 *
 * @param {Element[]} scrollableAncestors - Массив прокручиваемых предков.
 * @returns {number} Значение смещения прокрутки по оси X для всех предков.
 */
export function getScrollXOffset(scrollableAncestors: Element[]): number {
  return scrollableAncestors.reduce<number>((acc, node) => acc + getScrollXCoordinate(node), 0)
}

/**
 * Возвращает смещение прокрутки по оси Y для массива прокручиваемых предков.
 *
 * @param {Element[]} scrollableAncestors - Массив прокручиваемых предков.
 * @returns {number} Значение смещения прокрутки по оси Y для всех предков.
 */
export function getScrollYOffset(scrollableAncestors: Element[]): number {
  return scrollableAncestors.reduce<number>((acc, node) => acc + getScrollYCoordinate(node), 0)
}
