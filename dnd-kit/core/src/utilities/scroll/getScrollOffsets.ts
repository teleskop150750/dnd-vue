import { add } from '@nado/dnd-kit-utilities'

import type { Coordinates } from '../../types'
import { defaultCoordinates } from '../coordinates'
import { getScrollCoordinates, getScrollXCoordinate, getScrollYCoordinate } from './getScrollCoordinates'

/**
 * Получить Scroll offset
 *
 * @param scrollableAncestors Предки Scrollable Element[]
 */
export function getScrollOffsets(scrollableAncestors: Element[]): Coordinates {
  return scrollableAncestors.reduce<Coordinates>(
    (acc, node) => add(acc, getScrollCoordinates(node)),
    defaultCoordinates,
  )
}

/**
 * Получить Scroll X offset
 *
 * @param scrollableAncestors Предки Scrollable Element[]
 */
export function getScrollXOffset(scrollableAncestors: Element[]): number {
  return scrollableAncestors.reduce<number>((acc, node) => acc + getScrollXCoordinate(node), 0)
}

/**
 * Получить Scroll Y offset
 *
 * @param scrollableAncestors Предки Scrollable Element[]
 */
export function getScrollYOffset(scrollableAncestors: Element[]): number {
  return scrollableAncestors.reduce<number>((acc, node) => acc + getScrollYCoordinate(node), 0)
}
