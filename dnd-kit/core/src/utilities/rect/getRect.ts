import { getWindow } from '@nado/dnd-kit-utilities'

import type { ClientRect } from '../../types'
import { inverseTransform } from '../transform'

interface Options {
  ignoreTransform?: boolean
}

const defaultOptions: Options = { ignoreTransform: false }

/**
 * Возвращает объект ClientRect с размерами и координатами элемента с учетом или без учета CSS-трансформации.
 *
 * @param {Element} element - Элемент, для которого вычисляются размеры и координаты.
 * @param {Options} [options=defaultOptions] - Объект с опциями для вычисления размеров и координат.
 * @param {boolean} [options.ignoreTransform=false] - Опция, указывающая игнорировать ли CSS-трансформации при вычислении размеров и координат.
 * @returns {ClientRect} Возвращает объект ClientRect с размерами и координатами элемента.
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
 * Возвращает объект ClientRect элемента, игнорируя его трансформации.
 *
 * @param {Element} element - Элемент, для которого требуется получить ClientRect.
 * @returns {ClientRect} Объект ClientRect с игнорированием трансформаций элемента.
 */
export function getTransformAgnosticClientRect(element: Element): ClientRect {
  return getClientRect(element, { ignoreTransform: true })
}
