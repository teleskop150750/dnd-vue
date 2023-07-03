import type { ClientRect } from '../../types'

/**
 * Возвращает объект ClientRect для окна браузера.
 *
 * @param {typeof window} element - Объект окна браузера.
 * @returns {ClientRect} Объект ClientRect, представляющий размеры и положение окна браузера.
 */
export function getWindowClientRect(element: typeof window): ClientRect {
  const width = element.innerWidth
  const height = element.innerHeight

  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height,
  }
}
