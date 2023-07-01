import { getWindow } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'
import { inverseTransform } from '../transform'

interface Options {
  ignoreTransform?: boolean
}

const defaultOptions: Options = { ignoreTransform: false }

/**
 * Возвращает ClientRect относительно области просмотра (viewport).
 */
export function getClientRect(element: Element, options: Options = defaultOptions): ClientRect {
  let rect: ClientRect = element.getBoundingClientRect()

  if (options.ignoreTransform) {
    const { transform, transformOrigin } = getWindow(element).getComputedStyle(element)

    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin)
    }
  }

  const { top, left, width, height, bottom, right } = rect

  return {
    top,
    left,
    width,
    height,
    bottom,
    right,
  }
}

/**
 * Возвращает ClientRect относительно области просмотра (viewport).
 *
 * @remarks
 * ClientRect, возвращаемый этим методом, не учитывает `transforms`, примененные к измеряемому элементу.
 */
export function getTransformAgnosticClientRect(element: Element): ClientRect {
  return getClientRect(element, { ignoreTransform: true })
}
