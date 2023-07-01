import { isDocumentScrollingElement } from './documentScrollingElement'

interface ScrollPosition {
  isTop: boolean
  isLeft: boolean
  isBottom: boolean
  isRight: boolean
  maxScroll: {
    x: number
    y: number
  }
  minScroll: {
    x: number
    y: number
  }
}

/**
 * Получить Scroll Position
 *
 * @param scrollingContainer Element
 */
export function getScrollPosition(scrollingContainer: Element): ScrollPosition {
  const minScroll = {
    x: 0,
    y: 0,
  }

  const dimensions = isDocumentScrollingElement(scrollingContainer)
    ? {
        height: window.innerHeight,
        width: window.innerWidth,
      }
    : {
        height: scrollingContainer.clientHeight,
        width: scrollingContainer.clientWidth,
      }

  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height,
  }

  const isTop = scrollingContainer.scrollTop <= minScroll.y
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x

  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll,
  }
}
