import type { ClientRect } from '../../types'

/**
 * Получить Window ClientRect
 *
 * @param element Window
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
