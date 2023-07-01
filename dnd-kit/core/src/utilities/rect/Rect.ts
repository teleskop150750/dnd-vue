import type { ClientRect } from '../../types/rect'
import { getScrollableAncestors, getScrollOffsets, getScrollXOffset, getScrollYOffset } from '../scroll'

const properties = [
  ['x', ['left', 'right'], getScrollXOffset],
  ['y', ['top', 'bottom'], getScrollYOffset],
] as const

export class Rect {
  public constructor(rect: ClientRect, element: Element) {
    const scrollableAncestors = getScrollableAncestors(element)
    const scrollOffsets = getScrollOffsets(scrollableAncestors)

    this.rect = { ...rect }
    this.width = rect.width
    this.height = rect.height

    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key of keys) {
        Object.defineProperty(this, key, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors)
            const scrollOffsetsDelta = scrollOffsets[axis] - currentOffsets

            return this.rect[key] + scrollOffsetsDelta
          },
          enumerable: true,
        })
      }
    }

    Object.defineProperty(this, 'rect', { enumerable: false })
  }

  private rect: ClientRect

  public width: number

  public height: number

  // Приведенные ниже свойства задаются вызовами `Object.defineProperty` в конструкторе
  // @ts-expect-error foo
  public top: number
  // @ts-expect-error foo
  public bottom: number
  // @ts-expect-error foo
  public right: number
  // @ts-expect-error foo
  public left: number
}
